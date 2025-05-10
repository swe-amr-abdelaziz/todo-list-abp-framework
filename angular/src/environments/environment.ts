 import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44319/',
  redirectUri: baseUrl,
  clientId: 'TodoList_App',
  responseType: 'code',
  scope: 'offline_access TodoList',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'TodoList',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44319',
      rootNamespace: 'TodoList',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
