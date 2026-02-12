import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv({ quiet: true });

const envSchema = z.object({
  AROFLO_API_BASE_URL: z.string().url().default('https://api.aroflo.com/'),
  AROFLO_SECRET_KEY: z.string().min(1),
  AROFLO_UENCODED: z.string().min(1),
  AROFLO_PENCODED: z.string().min(1),
  AROFLO_ORG_ENCODED: z.string().min(1),
  AROFLO_ACCEPT: z.string().default('text/json'),
  AROFLO_HOST_IP: z
    .string()
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      return trimmed && trimmed.length > 0 ? trimmed : undefined;
    }),
  AROFLO_TIMEOUT_MS: z.coerce.number().int().positive().default(65_000),
  AROFLO_MAX_RETRIES: z.coerce.number().int().min(0).max(10).default(2),
  MCP_TRANSPORT: z.enum(['stdio', 'http']).default('stdio'),
  MCP_HTTP_HOST: z.string().default('127.0.0.1'),
  MCP_HTTP_PORT: z.coerce.number().int().positive().max(65535).default(3000),
  MCP_HTTP_PATH: z.string().default('/mcp')
});

export type AppEnv = z.infer<typeof envSchema>;

export function loadEnv(env: NodeJS.ProcessEnv = process.env): AppEnv {
  return envSchema.parse(env);
}
