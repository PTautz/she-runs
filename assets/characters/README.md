# Sprites das personagens

Cada pasta abaixo corresponde a uma personagem e deve conter 6 arquivos PNG,
todos com **fundo transparente**, no mesmo tamanho entre si (recomendado
32×48px ou 48×64px — múltiplo de 16 ajuda a manter os pixels "quadrados"):

| arquivo        | quando aparece                                  |
|----------------|--------------------------------------------------|
| `idle.png`     | parada (reservado para uso futuro)               |
| `run_01.png`   | corrida — quadro 1                               |
| `run_02.png`   | corrida — quadro 2                               |
| `run_03.png`   | corrida — quadro 3                               |
| `jump.png`     | no ar (pulando)                                  |
| `crouch.png`   | agachada                                         |

```
ada/         → Ada Lovelace
grace/       → Grace Hopper
katherine/   → Katherine Johnson
margaret/    → Margaret Hamilton
```

O jogo carrega esses arquivos automaticamente pelo nome (`game.html`,
`SPRITE_FOLDER`/`loadCharacterSprites`). Enquanto os arquivos não existirem
(ou falharem ao carregar) para uma personagem, ela continua sendo desenhada
pelo sistema procedural antigo — dá para adicionar uma personagem por vez,
sem quebrar as outras.

A resolução real do PNG não importa para o jogo: cada sprite é sempre
desenhado no tamanho de jogo da personagem (`HERO_W`×`HERO_H`), com
`imageSmoothingEnabled = false` para manter a arte nítida, sem borrão.
