# JCC Multi Parts Landing Page

Landing page estática da JCC Multi Parts, focada em cotação de peças para máquinas pesadas da linha amarela.

## Estrutura

- `index.html`: marcação semântica da página.
- `assets/css/styles.css`: identidade visual, layout responsivo e paleta extraída das logos.
- `assets/js/main.js`: animação leve de entrada e atualização automática do ano no rodapé.
- `assets/img/`: logos usadas na navegação e no hero.
- `tests/smoke-test.js`: teste simples sem dependências para validar seções, assets e CTA de WhatsApp.

## Layout do hero

O hero usa duas áreas no desktop: conteúdo textual à esquerda e logo em um painel próprio à direita. A logo não deve ficar como imagem absoluta sobre o texto, porque o arquivo possui fundo claro e pode se sobrepor ao conteúdo.

## Paleta base

- Azul principal: `#182430`
- Azul secundário: `#304861`
- Dourado principal: `#c9a04a`
- Dourado escuro: `#ae7321`
- Dourado claro: `#f0d178`
- Creme: `#f0e3d0`
- Neutro: `#d9d4ce`

## Como abrir

Abra o arquivo `index.html` no navegador. Como o projeto é estático, não há etapa de build.

Para servir localmente, também é possível usar:

```bash
python3 -m http.server 4173
```

## Testes

Execute:

```bash
npm test
```

O teste confere se as seções principais existem, se os assets referenciados estão disponíveis, se o hero mantém uma área de mídia dedicada e se o CTA principal do WhatsApp permanece configurado.
