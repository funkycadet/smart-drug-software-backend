import {
  registerPharmacySchema,
  registerSchema,
  loginSchema,
} from "./authSchema";
import {
  createProductSchema,
  updateProductSchema,
  createProcurementSchema,
  updateProcurementSchema,
} from "./managerSchema";
import {
  addItemToCounterSchema,
  addItemToCounterByInventoryIDSchema,
  updateItemOnCounterSchema,
  createOrderSchema,
  createOnlineOrderSchema,
  createPrescriptionSchema,
} from "./inboundsSchema";

import {
  createDefectReport,
  createSupplierReport,
  updateDefectReport,
  updateSupplierReport,
} from "./reportSchema";

export {
  registerPharmacySchema,
  registerSchema,
  loginSchema,
  createProductSchema,
  updateProductSchema,
  addItemToCounterSchema,
  addItemToCounterByInventoryIDSchema,
  updateItemOnCounterSchema,
  createOrderSchema,
  createOnlineOrderSchema,
  createPrescriptionSchema,
  createProcurementSchema,
  updateProcurementSchema,
  createDefectReport,
  createSupplierReport,
  updateDefectReport,
  updateSupplierReport,
};
