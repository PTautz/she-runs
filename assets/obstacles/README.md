# Sprites de obstáculo (assinatura)

Cada pasta abaixo é uma personagem e recebe 2 arquivos PNG, fundo
**transparente**, quadrados (mesma largura e altura entre si):

| arquivo     | qual obstáculo é                                                  |
|-------------|---------------------------------------------------------------------|
| `bug.png`   | a "criatura" que aparece pulando no chão (o bicho/erro/alarme)     |
| `code.png`  | o item colecionável (ícone que dá pontos, não machuca)              |

```
ada/         → Ada Lovelace
grace/       → Grace Hopper
katherine/   → Katherine Johnson
margaret/    → Margaret Hamilton
```

O jogo carrega esses arquivos automaticamente (`game.html`,
`loadObstacleSprite`/`hasObstacleSprite`). Sem os arquivos, o obstáculo
continua aparecendo no desenho procedural de sempre — dá pra adicionar
uma personagem por vez.

Recomendado: 64×64px (ou 48×48px), consistente com o resto da arte já
integrada (mesmo estilo definido em `assets/characters/README.md`).
