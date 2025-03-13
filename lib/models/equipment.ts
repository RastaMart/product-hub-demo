export interface Equipment {
  id: string;
  name: string;
  type: "Router" | "Modem" | "TV Box" | "Phone";
  features: string[];
  compatibility: {
    internet?: string[]; // Internet product IDs
    tv?: string[]; // TV product IDs
    voice?: string[]; // Voice product IDs
  };
  marketIds?: string[];
  monthlyPrice: number;
  promoBanner?: string;
  promoMonths?: number;
}