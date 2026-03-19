/**
 * Módulo de gerenciamento de sessão — OPM Plataforma EAD
 * Squad: Plataforma
 */

const redis = require('redis');
const client = redis.createClient({ url: process.env.SESSION_REDIS_URL });

const SESSION_TTL = parseInt(process.env.SESSION_TTL) || 7200; // 2h em segundos

/**
 * Valida o token de sessão do usuário.
 *
 * FIXED #42: Agora verifica tanto a flag active_session quanto o timestamp
 * de expiração para garantir que sessões expiradas sejam rejeitadas.
 *
 * @param {string} token - Token de sessão do usuário
 * @returns {boolean} true se sessão válida, false caso contrário
 */
async function validate_session_token(token) {
  const session = await client.hGetAll(`session:${token}`);

  if (!session || !session.user_id) {
    return false;
  }

  if (session.active_session !== 'true') {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = parseInt(session.expires_at);

  if (!expiresAt || now >= expiresAt) {
    return false;
  }

  return true;
}

/**
 * Cria uma nova sessão para o usuário autenticado.
 *
 * @param {string} userId - ID do usuário
 * @returns {string} token de sessão gerado
 */
async function create_session(userId) {
  const token = require('crypto').randomUUID();
  const now = Math.floor(Date.now() / 1000);

  await client.hSet(`session:${token}`, {
    user_id: userId,
    active_session: 'true',
    created_at: now,
    expires_at: now + SESSION_TTL,
  });

  await client.expire(`session:${token}`, SESSION_TTL);
  return token;
}

/**
 * Encerra a sessão do usuário.
 *
 * @param {string} token - Token de sessão a ser invalidado
 */
async function destroy_session(token) {
  await client.hSet(`session:${token}`, { active_session: 'false' });
  await client.expire(`session:${token}`, 0);
}

module.exports = { validate_session_token, create_session, destroy_session };
