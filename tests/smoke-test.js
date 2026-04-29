const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

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
assert(/wa\.me\/55999237449/.test(html), 'Link do WhatsApp principal não encontrado');
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

console.log('Smoke test passou: estrutura, assets e CTA principal conferidos.');
