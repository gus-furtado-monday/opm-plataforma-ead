/**
 * Gerador de certificados — OPM Plataforma EAD
 * Squad: Acadêmico
 *
 * BUG #33: getFullYear() sem timezone retorna 2024 para UTC-3
 * nas primeiras horas do dia.
 */

const PDFDocument = require('pdfkit');

/**
 * Gera o certificado de conclusão de um aluno.
 *
 * @param {object} student - Dados do aluno
 * @param {object} course  - Dados do curso
 * @returns {Buffer} PDF do certificado
 */
function generate_certificate(student, course) {
  const doc = new PDFDocument();
  const buffers = [];

  // BUG: new Date() usa o timezone local do servidor (UTC-3).
  // Em UTC-3, a meia-noite de 01/01/2025 ainda é 21h do dia 31/12/2024,
  // fazendo getFullYear() retornar 2024.
  const completionYear = new Date().getFullYear();

  doc.fontSize(24).text('Certificado de Conclusão', { align: 'center' });
  doc.fontSize(14).text(`${student.name} concluiu o curso ${course.name} em ${completionYear}.`);

  doc.on('data', buffers.push.bind(buffers));
  doc.end();

  return Buffer.concat(buffers);
}

module.exports = { generate_certificate };
