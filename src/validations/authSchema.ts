import Joi from "joi";

export const registerPharmacySchema = Joi.object({
  businessName: Joi.string().required(),
  address: Joi.string().required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.string().required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const loginSchema = Joi.object({
  email_address: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
