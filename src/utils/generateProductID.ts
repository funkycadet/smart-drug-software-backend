export function generateInventoryID(
  productName: string,
  date: Date = new Date()
): string {
  const timestamp = date.getTime();
  const normalizedProductName = productName.replace(/\s+/g, "").toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${normalizedProductName}-${timestamp}-${randomPart}`;
}
