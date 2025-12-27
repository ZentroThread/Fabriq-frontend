export interface AddItemPayload {
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  status: string;
  image?: File | string;
}

export interface Item {
  id: number;
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: {
    tenantId: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
  };
  status: string;
  tenantId: string;
  image?: File | string;
}

// Backend response structure (what API actually returns)
export interface BackendItem {
  id: number;
  tenantId: string;
  attireCode: string;
  attireName: string;
  attireDescription: string | null;
  attirePrice: number;
  attireStock: number;
  category: {
    tenantId: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
  };
  attireStatus: string;
  imageUrl?: string;
}

export interface AddCustomerPayload {
  custName: string;
  custMobileNumber: string;
  custLandLine: string;
  custWhatsappNumber: string;
  custEmail: string;
}

export interface BackendCustomerPayload {
  custCode: string;
  custName: string;
  custMobileNumber: string;
  custLandLine: string;
  custWhatsappNumber: string;
  custEmail: string;
  custAddress: string;
  custRegistrationDate: Date;
}
export interface AddCustomerResponse {
  success: boolean;
  message?: string;
  value?: BackendCustomerPayload;
}

export interface Customer {
  custCode?: string;
  custName: string;
  custMobileNumber: string;
  custLandLine?: string;
  custWhatsappNumber?: string;
  custEmail?: string;
  custAddress?: string;
}
export interface AddItemResponse {
  success: boolean;
  message: string;
  value: Item;
}
