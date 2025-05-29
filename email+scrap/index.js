// index.js
const extrairBotsDiscord = require('./scraper/app');
const enviarEmail = require('./email/app');

async function main() {
  const bots = await extrairBotsDiscord();
  if (bots.length > 0) {
    await enviarEmail(bots);
  } else {
    console.log('Nenhum bot encontrado para enviar.');
  }
}

main();
