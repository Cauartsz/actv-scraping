// email/enviarEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

async function enviarEmail(listaDeBots) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlBody = listaDeBots.map(bot => `
    <h3>${bot.nome}</h3>
    <p>${bot.descricao}</p>
  `).join('<hr>');

  try {
    const info = await transporter.sendMail({
      from: `"Scraper Bots" <${process.env.EMAIL_USER}>`,
      to: 'caua.candido1805@gmail.com',
      subject: 'Lista de Bots do Discord - Extraídos do site da Sinch',
      html: htmlBody,
    });

    console.log('✅ E-mail enviado com sucesso:', info.messageId);
  } catch (error) {
    console.error('❌ Erro ao enviar o e-mail:', error);
  }
}

module.exports = enviarEmail;
