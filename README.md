# opm-plataforma-ead

Plataforma EAD da UOL OPM — módulos de autenticação, avaliações, notificações e integração com sistemas acadêmicos das instituições parceiras.

## Estrutura do projeto

```
opm-plataforma-ead/
├── src/
│   ├── auth/
│   │   └── session.js          # Gerenciamento de sessão e tokens
│   ├── assessments/
│   │   └── assessment_router.js # Roteamento do módulo de avaliações
│   ├── notifications/
│   │   └── email_worker.js     # Worker de notificações por e-mail
│   └── certificates/
│       └── certificate_generator.js # Gerador de certificados
├── tests/
│   └── auth/
│       └── session.test.js
└── README.md
```

## Instituições parceiras

| Instituição | Código | Squad responsável |
|---|---|---|
| Sírio-Libanês | SL | Squad Plataforma |
| FAAP | FAAP | Squad Plataforma |
| SENAC SP | SENACSP | Squad Acadêmico |
| SENAC RJ | SENACRJ | Squad Acadêmico |
| Uninove | UNI | Squad Aquisição |
| FMU | FMU | Squad Acadêmico |
| IMPACTA | IMP | Squad Financeiro |

## Issues abertas

| # | Título | Prioridade | Squad |
|---|---|---|---|
| #42 | [BUG] Corrigir validação de token de sessão no módulo de provas | Critical | Plataforma |
| #38 | [BUG] Player de vídeo não renderiza no app mobile (iOS/Android) | High | Plataforma |
| #35 | [FEATURE] Exportação de notas em lote — CSV compatível Banner | Medium | Acadêmico |
| #33 | [BUG] Certificados gerados com ano incorreto no template | High | Acadêmico |
| #27 | [BUG] Notificações de fórum não disparadas via e-mail | High | Plataforma |

## Setup

```bash
npm install
npm run dev
```

## Variáveis de ambiente

```env
SESSION_TTL=7200          # Tempo de vida da sessão em segundos
SESSION_REDIS_URL=...     # URL do Redis para armazenamento de sessão
SENDGRID_API_KEY=...      # Chave da API do SendGrid
DB_URL=...                # URL do banco de dados
```
