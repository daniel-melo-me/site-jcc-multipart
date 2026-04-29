const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const whatsappMessage = [
  'Olá! 👋 Obrigado pelo seu contato.',
  '',
  'Em breve retornaremos seu atendimento.',
  '',
  'Para agilizar, você já pode nos enviar algumas informações importantes:',
  '',
  'Modelo da máquina',
  'Marca',
  'Ano',
  'Código da peça (se tiver)',
  '',
  'Assim conseguimos te atender com mais rapidez. 🤝',
  '',
  'Agradecemos pela compreensão!',
].join('\n');
const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

[
  'inicio',
  'sobre',
  'maquinas',
  'marcas',
  'pecas',
  'processo',
  'cotacao',
].forEach((id) => {
  assert(html.includes(`id="${id}"`), `Seção #${id} não encontrada no index.html`);
});

assert(html.includes('assets/css/styles.css'), 'CSS principal não está vinculado');
assert(html.includes('assets/js/main.js'), 'JS principal não está vinculado');
assert(html.includes('rel="icon"'), 'Favicon não está vinculado');
assert(html.includes('assets/img/favicon.svg'), 'Arquivo de favicon não está referenciado');
assert(html.includes('class="hero-media"'), 'Hero não possui área de mídia dedicada');
assert(!html.includes('class="hero-mark"'), 'Hero ainda usa imagem absoluta sobreposta ao conteúdo');
assert(html.includes('#icon-whatsapp'), 'Ícone do WhatsApp não encontrado');
assert(html.includes('button--whatsapp header-cta'), 'Botão do menu não usa a variante verde do WhatsApp');
assert(html.includes('#icon-map-pin'), 'Ícone de endereço/mapa não encontrado');
assert(html.includes('class="map-frame"'), 'Mapa incorporado não encontrado');
assert(html.includes('google.com/maps'), 'Mapa do Google não está configurado');
assert(html.includes('Dancode Solutions LTDA'), 'Crédito da Dancode Solutions LTDA não encontrado no rodapé');
assert(/wa\.me\/55999237449/.test(html), 'Link do WhatsApp principal não encontrado');
const whatsappLinks = [...html.matchAll(/href="https:\/\/wa\.me\/55999237449\?text=([^"]+)"/g)];
assert(whatsappLinks.length === 4, 'Quantidade esperada de links do WhatsApp não encontrada');
whatsappLinks.forEach((match) => {
  assert(match[1] === encodedWhatsappMessage, 'Mensagem pré-preenchida do WhatsApp está diferente da regra atual');
});
assert(!html.includes('logo-jcc(2).jpeg'), 'HTML ainda referencia logo-jcc(2).jpeg');
assert(!html.includes('logo-jcc-sem-fundo(2).jpeg'), 'HTML ainda referencia logo-jcc-sem-fundo(2).jpeg');

const assetReferences = [...html.matchAll(/\b(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)]
  .map((match) => match[1])
  .filter((reference) => {
    return !reference.startsWith('http')
      && !reference.startsWith('mailto:')
      && !reference.startsWith('tel:')
      && !reference.startsWith('#');
  });

assetReferences.forEach((reference) => {
  const absolutePath = path.join(root, reference);
  assert(fs.existsSync(absolutePath), `Asset referenciado não existe: ${reference}`);
});

if (failures.length > 0) {
  console.error('Smoke test falhou:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Smoke test passou: estrutura, favicon, assets, ícones, mapa e CTAs do WhatsApp conferidos.');
