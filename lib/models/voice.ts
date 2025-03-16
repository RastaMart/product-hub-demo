export interface VoiceProduct {
  id: number;
  key: string;
  name: string;
  type: "Landline" | "VoIP";
  features: string[];
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
  // Many-to-many relationship property
  markets?: string[];
}
