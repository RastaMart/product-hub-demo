export interface TVProduct {
  id: string;
  name: string;
  type: "Stream" | "Cable" | "Satellite";
  channels: string[]; // References to Channel IDs
  features: string[];
  // marketIds removed, as it's now a many-to-many relationship
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
  // New property to represent the many-to-many relationship when needed in code
  markets?: string[];
}
