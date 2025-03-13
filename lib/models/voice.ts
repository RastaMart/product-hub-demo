export interface VoiceProduct {
  key: string; // Now primary key
  name: string;
  type: "Landline" | "VoIP";
  features: string[];
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
  // Many-to-many relationship property
  markets?: string[];
}
