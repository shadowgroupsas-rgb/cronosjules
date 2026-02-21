import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME || 'Cronos',
  company: process.env.COMPANY_NAME || 'Copower Energy Solutions',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
