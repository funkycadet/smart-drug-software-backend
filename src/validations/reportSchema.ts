import Joi from "joi";

export const createDefectReport = Joi.object({
  itemName: Joi.string().required(),
  title: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const updateDefectReport = Joi.object({
  itemName: Joi.string().required(),
  title: Joi.string().required(),
  quantity: Joi.string().required(),
});

export const createSupplierReport = Joi.object({
  supplierName: Joi.string().required(),
  supplierAddress: Joi.string().required(),
  supplierEmail: Joi.string().required(),
  supplierPhone: Joi.string().required(),
  repName: Joi.string().required(),
});

export const updateSupplierReport = Joi.object({
  supplierName: Joi.string().required(),
  supplierAddress: Joi.string().required(),
  supplierEmail: Joi.string().required(),
  supplierPhone: Joi.string().required(),
  repName: Joi.string().required(),
});
