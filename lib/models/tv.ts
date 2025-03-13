export interface TVProduct {
  key: string; // Now primary key
  name: string;
  type: "Stream" | "Cable" | "Satellite";
  channels: string[]; // References to Channel IDs
  features: string[];
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
  // Many-to-many relationship property
  markets?: string[];
}
