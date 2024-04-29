export interface IInventory {
  id?: string;
  pharmacyId: string;
  drugId: string;
  category: string;
  quantity: number;
  price: number;
  alert: boolean;
}

export interface IDrug {
  id?: string;
  pharmacyId: string;
  name: string;
  brand: string;
  medical_condition: string
  dosageStrengthNumber: number;
  dosageStrengthUnit: string;
  contraindications: string;
  interactions: string;
  picture: string;
}

export interface IPrescription {
  id?: string;
  userId: string;
  pharmacyId: string;
  drugId: string;
  dosage: string;
  createdAt: Date;
  updatedAt: Date;
}
