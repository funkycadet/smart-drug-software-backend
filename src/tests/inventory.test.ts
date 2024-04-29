// import InventoryService from "src/modules/manager/inventory/inventory.service";
// import { prismaMock } from "../config/singleton";

// const mockProduct = {
//   id: 1,
//   inventoryId: "",
//   pharmacyId: "",
//   itemName: "Test",
//   category: "",
//   brand: "",
//   dosageStrengthNumber: 20,
//   dosageStrengthUnit: "mg",
//   quantity: 10,
//   price: 100,
//   picture: "test.picture",
//   alert: true,
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// const mockUpdatedProduct = {
//   id: 1,
//   inventoryId: "",
//   pharmacyId: "",
//   itemName: "Test",
//   category: "",
//   brand: "",
//   dosageStrengthNumber: 20,
//   dosageStrengthUnit: "mg",
//   quantity: 10,
//   price: 100,
//   picture: "test.picture",
//   alert: true,
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// const mockProducts = [
//   {
//     id: 1,
//     inventoryId: "",
//     pharmacyId: "",
//     itemName: "Test",
//     category: "",
//     brand: "",
//     dosageStrengthNumber: 20,
//     dosageStrengthUnit: "mg",
//     quantity: 10,
//     price: 100,
//     picture: "test.picture",
//     alert: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 1,
//     inventoryId: "",
//     pharmacyId: "",
//     itemName: "Test",
//     category: "",
//     brand: "",
//     dosageStrengthNumber: 20,
//     dosageStrengthUnit: "mg",
//     quantity: 10,
//     price: 100,
//     picture: "test.picture",
//     alert: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// // jest.mock("../database", () => ({
// //   inventory: {
// //     findMany: jest.fn().mockResolvedValue([]),
// //     findUnique: jest.fn(),
// //     findFirst: jest.fn(),
// //     create: jest.fn(),
// //     update: jest.fn(),
// //     delete: jest.fn(),
// //     deleteMany: jest.fn(),
// //   },
// // }));

// // describe("InventoryService", () => {
// //   let service: InventoryService;

// //   beforeEach(() => {
// //     service = new InventoryService();
// //   });

// //   it("should get all products", async () => {
// //     const mockData = [{ inventoryId: "1", name: "Product 1" }];
// //     // prisma.inventory.findMany.mockResolvedValue(mockData);
// //     prisma.inventory.findMany({ skip: 0, take: 10, where: undefined });

// //     const data = await service.getAllProducts(0, 10);
// //     expect(data).toEqual(mockData);
// //     expect(prisma.inventory.findMany).toHaveBeenCalledWith({
// //       skip: 0,
// //       take: 10,
// //       where: undefined,
// //     });
// //   });

// //   // it("should get product by inventory id", async () => {
// //   //   const mockData = { inventoryId: "1", name: "Product 1" };
// //   //   // prisma.inventory.findUnique(mockData);

// //   //   const data = await service.getProductByInventoryId("1");
// //   //   expect(data).toEqual(mockData);
// //   //   expect(prisma.inventory.findUnique).toHaveBeenCalledWith({
// //   //     where: { inventoryId: "1" },
// //   //   });
// //   // });

// //   // Add similar tests for getProduct, createProduct, updateProduct, deleteProduct, deleteManyProducts
// // });

// describe("InventoryService.getAllProducts", () => {
//   it("should retrieve products with pagination and optional filter", async () => {
//     const inventoryService = new InventoryService();

//     prismaMock.inventory.findMany.mockResolvedValue(mockProducts);
//     // prismaMock.inventory.findMany.mockResolvedValue({
//     //   skip: 0,
//     //   take: 10,
//     //   where: { name: "Test" },
//     // });

//     const products = await inventoryService.getAllProducts(0, 10, {
//       name: "Test",
//     });

//     expect(prismaMock.inventory.findMany).toHaveBeenCalledWith({
//       skip: 0,
//       take: 10,
//       where: { name: "Test" },
//     });
//     expect(products).toEqual(mockProducts);
//   });
// });

// describe("InventoryService.getProductByInventoryId", () => {
//   it("should retrieve a product by inventory ID", async () => {
//     const inventoryService = new InventoryService();
//     // const mockProduct = {
//     //   id: 1,
//     //   inventoryId: "",
//     //   pharmacyId: "",
//     //   itemName: "Test",
//     //   category: "",
//     //   brand: "",
//     //   dosageStrengthNumber: 20,
//     //   dosageStrengthUnit: "mg",
//     //   quantity: 10,
//     //   price: 100,
//     //   picture: "test.picture",
//     //   alert: true,
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     // };
//     prismaMock.inventory.findUnique.mockResolvedValue(mockProduct);

//     const product = await inventoryService.getProductByInventoryId("123");

//     expect(prismaMock.inventory.findUnique).toHaveBeenCalledWith({
//       where: { inventoryId: "123" },
//     });
//     expect(product).toEqual(mockProduct);
//   });
// });

// describe("InventoryService.getProduct", () => {
//   it("should retrieve the first product matching the filter", async () => {
//     const inventoryService = new InventoryService();
//     // const mockProduct = {
//     //   /* mock product data */
//     // };
//     prismaMock.inventory.findFirst.mockResolvedValue(mockProduct);

//     const product = await inventoryService.getProduct({ name: "Test" });

//     expect(prismaMock.inventory.findFirst).toHaveBeenCalledWith({
//       where: { name: "Test" },
//     });
//     expect(product).toEqual(mockProduct);
//   });
// });

// describe("InventoryService.createProduct", () => {
//   it("should create a new product", async () => {
//     const inventoryService = new InventoryService();
//     // const mockProduct = {
//     //   id: 1,
//     //   inventoryId: "",
//     //   pharmacyId: "",
//     //   itemName: "Test",
//     //   category: "",
//     //   brand: "",
//     //   dosageStrengthNumber: 20,
//     //   dosageStrengthUnit: "mg",
//     //   quantity: 10,
//     //   price: 100,
//     //   picture: "test.picture",
//     //   alert: true,
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     // };
//     prismaMock.inventory.create.mockResolvedValue(mockProduct);

//     const newProduct = await inventoryService.createProduct(mockProduct);

//     expect(prismaMock.inventory.create).toHaveBeenCalledWith({
//       data: mockProduct,
//     });
//     expect(newProduct).toEqual(mockProduct);
//   });
// });

// describe("InventoryService.updateProduct", () => {
//   it("should update a product", async () => {
//     const inventoryService = new InventoryService();
//     // const mockUpdatedProduct = {
//     //   /* mock updated product data */
//     // };
//     prismaMock.inventory.update.mockResolvedValue(mockUpdatedProduct);

//     const updatedProduct = await inventoryService.updateProduct(
//       "pharm123",
//       "inv123",
//       {
//         /* update data */
//       }
//     );

//     expect(prismaMock.inventory.update).toHaveBeenCalledWith({
//       where: {
//         pharmacyId: "pharm123",
//         inventoryId: "inv123",
//       },
//       data: {
//         /* update data */
//       },
//     });
//     expect(updatedProduct).toEqual(mockUpdatedProduct);
//   });
// });

// describe("InventoryService.deleteProduct", () => {
//   it("should delete a product by inventory ID", async () => {
//     const inventoryService = new InventoryService();
//     prismaMock.inventory.delete.mockResolvedValue(mockProduct);

//     await inventoryService.deleteProduct("123");

//     expect(prismaMock.inventory.delete).toHaveBeenCalledWith({
//       where: { inventoryId: "123" },
//     });
//   });
// });

// // describe("InventoryService.deleteManyProducts", () => {
// //   it("should delete products matching a filter", async () => {
// //     const inventoryService = new InventoryService();
// //     prismaMock.inventory.deleteMany.mockResolvedValue();

// //     await inventoryService.deleteManyProducts({ name: "Test" });

// //     expect(prismaMock.inventory.deleteMany).toHaveBeenCalledWith({
// //       where: { name: "Test" },
// //     });
// //   });
// // });
