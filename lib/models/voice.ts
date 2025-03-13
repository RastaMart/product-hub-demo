export interface VoiceProduct {
  id: string;
  name: string;
  type: "Landline" | "VoIP";
  features: string[];
  // marketIds removed, as it's now a many-to-many relationship
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
  // New property to represent the many-to-many relationship when needed in code
  markets?: string[];
}
