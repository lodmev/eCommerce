/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_CTP_PROJECT_KEY: string;
  readonly API_CTP_CLIENT_SECRET: string;
  readonly API_CTP_CLIENT_ID: string;
  readonly API_CTP_AUTH_URL: string;
  readonly API_CTP_API_URL: string;
  readonly API_CTP_SCOPES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
