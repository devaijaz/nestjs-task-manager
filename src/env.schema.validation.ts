import * as Joi from 'joi';

export const EnvSchemaValidation = Joi.object({
  JWT_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  DATABASE_TYPE: Joi.string().required(),
  PORT: Joi.number().port().required(),
  DATABASE_CONNECTION_URL: Joi.string().required(),
});
