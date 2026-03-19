/**
 * Testes unitários — validate_session_token
 * Squad: Plataforma
 */

const { validate_session_token } = require('../../src/auth/session');

describe('validate_session_token', () => {
  it('deve retornar false para token inexistente', async () => {
    const result = await validate_session_token('token-invalido');
    expect(result).toBe(false);
  });

  it('deve retornar true para sessão ativa dentro do prazo', async () => {
    // setup: criar sessão válida no Redis mock
    const result = await validate_session_token('token-valido-mock');
    expect(result).toBe(true);
  });

  // BUG #42: este teste falha — sessão expirada retorna true indevidamente
  it('deve retornar false para sessão expirada', async () => {
    const result = await validate_session_token('token-expirado-mock');
    expect(result).toBe(false); // FALHA: retorna true
  });
});
