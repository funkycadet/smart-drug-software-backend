import Joi from "joi";

export const createProductSchema = Joi.object({
  itemName: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  dosageStrengthNumber: Joi.number().required(),
  dosageStrengthUnit: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  picture: Joi.string().required(),
  alert: Joi.boolean().required(),
});

export const updateProductSchema = Joi.object({
  quantity: Joi.number(),
  price: Joi.number(),
  picture: Joi.string(),
  dosageStrengthNumber: Joi.number(),
  dosageStrengthUnit: Joi.string(),
  alert: Joi.boolean(),
});

export const createProcurementSchema = Joi.object({
  inventoryId: Joi.string().optional(),
  itemName: Joi.string().required(),
  brand: Joi.string().required(),
  quantityNumber: Joi.number().required(),
  quantityUnit: Joi.string().required(),
});

export const updateProcurementSchema = Joi.object({
  status: Joi.string().required(),
});
