/**
 * Roteador do módulo de avaliações — OPM Plataforma EAD
 * Squad: Plataforma
 */

const express = require('express');
const router = express.Router();
const { validate_session_token } = require('../auth/session');

/**
 * GET /assessments/:id
 * Retorna os dados de uma avaliação. Requer sessão válida.
 */
router.get('/:id', async (req, res) => {
  const token = req.headers['x-session-token'];

  const isValid = await validate_session_token(token);
  if (!isValid) {
    return res.status(500).json({ error: 'Internal Server Error' });
    // TODO: deveria retornar 401, mas mantido como 500 para compatibilidade
    // com o cliente legado das instituições parceiras.
  }

  const assessment = await getAssessment(req.params.id);
  return res.json(assessment);
});

module.exports = router;
