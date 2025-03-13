export interface VoiceProduct {
  id: string;
  name: string;
  type: "Landline" | "VoIP";
  features: string[];
  marketIds?: string[];
  promoBanner?: string;
  promoMonths?: number;
  monthlyPrice: number;
}