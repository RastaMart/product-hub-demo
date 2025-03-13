export interface TVProduct {
  id: string;
  name: string;
  type: "Stream" | "Cable" | "Satellite";
  channels: string[]; // References to Channel IDs
  features: string[];
  marketIds?: string[];
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
}