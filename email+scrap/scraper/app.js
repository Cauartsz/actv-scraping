// IMPORT DE BIBLIOTÉCAS
const axios = require('axios');
const cheerio = require('cheerio');

// FUNÇÃO DE EXTRAIR LISTA DE BOTS DO SITE
async function extrairBotsDiscord() {
  const url = 'https://sinch.com/blog/discord-bots/';

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // LISTA DE BOTS [COMEÇA VAZIA]
    const listaDeBots = [];

    // SELECIONA ELEMENTOS DO BODY [H2 E H3 - ONDE ESTÁ O NOME DOS BOTS]
    $('h2, h3').each((i, el) => {
      const titulo = $(el).text().trim();
      const match = titulo.match(/^\d+\.\s+(.+)/);

      if (match) {
        const nome = match[1];
        const descricao = $(el).next('p').text().trim();
        listaDeBots.push({ nome, descricao });
      }
    });

    console.log('Bots encontrados:', listaDeBots);
    return listaDeBots;
  } catch (erro) {
    console.error('Erro ao extrair os dados:', erro.message);
    return [];
  }
}

// ENVIAR FUNÇÃO
module.exports = extrairBotsDiscord;
