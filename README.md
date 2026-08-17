# Elas escreveram o código

Linha do tempo interativa em pixel art sobre mulheres na computação, de Ada Lovelace em 1843 às pesquisadoras premiadas em 2026.

**Página no ar:** `https://PTautz.github.io/she-runs/`

## O que é

Uma página estática, sem dependências de build, sem framework. Cinco épocas navegáveis, 28 verbetes, retratos gerados em pixel art por código e fundo estrelado animado em canvas.

- **HTML, CSS e JavaScript puro.** Um único arquivo `index.html`.
- **Retratos são desenhados por código** a partir de grades de caracteres 12×13, não são fotografias. Isso evita problemas de licença de imagem e mantém o peso da página baixo.
- **Cada verbete tem link para a fonte primária.** ACM, NASA, Britannica, Japan Prize Foundation, Comissão Europeia, Internet Hall of Fame e afins.

## Nota de método

Os anos exibidos são **do feito**, não de nascimento. Isso foi uma decisão deliberada: numa linha do tempo, a data que importa é quando a coisa aconteceu, e datas de nascimento são uma fonte comum de erro em compilações desse tipo.

Os dados de 2025 e 2026 foram verificados em fontes primárias em agosto de 2026. Os registros históricos vêm de arquivos institucionais (NASA History Office, Computer History Museum, ACM).

O último verbete, "O placar atual", registra que o Turing Award segue com 3 mulheres entre mais de 70 laureados desde 1966. Isso está na página de propósito. Uma linha do tempo que só sobe seria mais bonita e menos verdadeira.

## Rodando localmente

Nenhuma instalação necessária. Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```

E acesse `http://localhost:8000`.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub chamado `she-runs` (público).
2. Suba os arquivos:

```bash
git init
git add .
git commit -m "Linha do tempo: mulheres na computação, 1843-2026"
git branch -M main
git remote add origin https://github.com/PTautz/she-runs.git
git push -u origin main
```

3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`. Salve.
6. Aguarde de um a dois minutos. A página aparece em `https://PTautz.github.io/she-runs/`.

O arquivo `.nojekyll` já está incluído para o GitHub servir os arquivos direto, sem processar com Jekyll.

## Correções

Encontrou um erro de data, atribuição ou contexto? Abra uma issue. Compilações históricas erram, e esta certamente tem pontos a melhorar.

## Licença

Código sob licença MIT. Os textos biográficos são de minha autoria, redigidos a partir das fontes linkadas em cada verbete.
