/**
 * Worker de notificações por e-mail — OPM Plataforma EAD
 * Squad: Plataforma
 *
 * Consome eventos da fila SQS e dispara e-mails transacionais via SendGrid.
 * BUG #27: Eventos do tipo `forum_reply` não estão sendo processados.
 */

const AWS = require('aws-sdk');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sqs = new AWS.SQS({ region: 'us-east-1' });

const EVENT_HANDLERS = {
  welcome_email:      handleWelcomeEmail,
  password_reset:     handlePasswordReset,
  assessment_result:  handleAssessmentResult,
  // forum_reply está faltando aqui — BUG #27
};

async function processQueue() {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  const data = await sqs.receiveMessage(params).promise();
  if (!data.Messages) return;

  for (const message of data.Messages) {
    const event = JSON.parse(message.Body);
    const handler = EVENT_HANDLERS[event.type];

    if (handler) {
      await handler(event);
      await sqs.deleteMessage({ QueueUrl: params.QueueUrl, ReceiptHandle: message.ReceiptHandle }).promise();
    }
    // eventos sem handler são silenciosamente ignorados — queue acumula
  }
}

async function handleWelcomeEmail(event) { /* ... */ }
async function handlePasswordReset(event) { /* ... */ }
async function handleAssessmentResult(event) { /* ... */ }

module.exports = { processQueue };
