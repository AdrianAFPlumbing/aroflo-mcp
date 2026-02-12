import pino from 'pino';

const destination = pino.destination({ fd: 2 });

export const logger = pino(
  {
    name: 'aroflo-mcp',
    level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'test' ? 'warn' : 'info'),
    redact: {
      paths: [
        'headers.Authorization',
        'headers.authorization',
        'headers.Authentication',
        'headers.authentication',
        'AROFLO_SECRET_KEY',
        'secretKey',
        '*.secretKey'
      ],
      censor: '[REDACTED]'
    }
  },
  destination
);
