import Joi from "joi";

export const addItemToCounterSchema = Joi.object({
  inventoryId: Joi.string().optional(),
  itemName: Joi.string().optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  dosageStrengthNumber: Joi.number().optional(),
  dosageStrengthUnit: Joi.string().optional(),
  quantity: Joi.number().optional(),
  price: Joi.number().optional(),
  picture: Joi.string().optional(),
  available: Joi.boolean().required(),
});

export const addItemToCounterByInventoryIDSchema = Joi.object({
  inventoryId: Joi.string().required(),
  available: Joi.boolean().required(),
});

export const updateItemOnCounterSchema = Joi.object({
  dosageStrengthNumber: Joi.number().optional(),
  dosageStrengthUnit: Joi.string().optional(),
  quantity: Joi.number().optional(),
  price: Joi.number().optional(),
  picture: Joi.string().optional(),
  available: Joi.boolean().optional(),
});

const paymentMethodEnum = ["BANK_TRANSFER", "CASH", "POS"];

const createOrderItemSchema = Joi.object({
  dispensaryCounterId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().integer().min(0).required(),
});

export const createOrderSchema = Joi.object({
  name: Joi.string().optional(),
  mobileNumber: Joi.string().optional(),
  email: Joi.string().optional(),
  address: Joi.string().optional(),
  zip: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  localGovernment: Joi.string().optional(),
  deliveryNote: Joi.string().optional(),
  deliveryDate: Joi.date().required(),
  subtotal: Joi.number().required(),
  discount: Joi.number().required(),
  VAT: Joi.number().required(),
  total: Joi.number().required(),
  paymentMethod: Joi.string()
    .valid(...paymentMethodEnum)
    .required(),
  orderItem: Joi.array().items(createOrderItemSchema).required(),
});

export const createOnlineOrderSchema = Joi.object({
  name: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  zip: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  localGovernment: Joi.string().required(),
  deliveryNote: Joi.string().optional(),
  deliveryDate: Joi.date().required(),
  subtotal: Joi.number().required(),
  discount: Joi.number().required(),
  VAT: Joi.number().required(),
  total: Joi.number().required(),
  paymentMethod: Joi.string()
    .valid(...paymentMethodEnum)
    .required(),
  orderItem: Joi.array().items(createOrderItemSchema).required(),
});

export const createPrescriptionSchema = Joi.object({
  clientName: Joi.string().required(),
  location: Joi.string().required(),
  picture: Joi.string().required(),
})
