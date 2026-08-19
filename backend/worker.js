// Instalar: npm create cloudflare@latest she-runs-worker
// KV namespace: SHE_RUNS_SCORES
// Variável de ambiente secreta: SECRET_SALT (mesmo valor usado em game.html)

// Limitador de taxa simples baseado na própria KV: cada IP só pode fazer
// N chamadas por janela de tempo. Roda antes de qualquer outro trabalho —
// quem estoura o limite recebe 429 sem gastar leitura/escrita do placar.
async function rateLimited(env, ip, bucket, limit, windowSec) {
  const key = `rl:${bucket}:${ip}`;
  const raw = await env.SHE_RUNS_SCORES.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= limit) return true;
  await env.SHE_RUNS_SCORES.put(key, String(count + 1), { expirationTtl: windowSec });
  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      'Access-Control-Allow-Origin': 'https://ptautz.github.io',
      'Content-Type': 'application/json',
    };
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }});
    }

    if (url.pathname === '/scores/top10' && request.method === 'GET') {
      if (await rateLimited(env, ip, 'get', 20, 60)) {
        return new Response(JSON.stringify({ scores: [], ok: false, error: 'rate_limited' }), { status: 429, headers });
      }
      const raw = await env.SHE_RUNS_SCORES.get('leaderboard');
      const scores = raw ? JSON.parse(raw) : [];
      return new Response(JSON.stringify({ scores: scores.slice(0, 10) }), { headers });
    }

    if (url.pathname === '/scores' && request.method === 'POST') {
      if (await rateLimited(env, ip, 'post', 8, 60)) {
        return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429, headers });
      }
      const body = await request.json();
      const { name, score, character, token } = body;

      const MAX_SCORE = 25000;
      if (!name || typeof score !== 'number' || score > MAX_SCORE || score < 0) {
        return new Response(JSON.stringify({ ok: false }), { status: 400, headers });
      }

      const expected = await sha256(`${name}${score}${env.SECRET_SALT}`);
      if (token !== expected) {
        return new Response(JSON.stringify({ ok: true }), { headers }); // silencioso
      }

      const raw = await env.SHE_RUNS_SCORES.get('leaderboard');
      const scores = raw ? JSON.parse(raw) : [];
      scores.push({ name: name.slice(0, 3).toUpperCase(), score, character, date: new Date().toISOString().slice(0,10) });
      scores.sort((a, b) => b.score - a.score);
      await env.SHE_RUNS_SCORES.put('leaderboard', JSON.stringify(scores.slice(0, 100)));

      const rank = scores.findIndex(s => s.name === name.slice(0,3).toUpperCase() && s.score === score) + 1;
      return new Response(JSON.stringify({ ok: true, rank }), { headers });
    }

    return new Response('not found', { status: 404 });
  }
};

async function sha256(message) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
