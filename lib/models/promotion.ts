import { UIElement } from "./ui-element";

export interface ProductAssociation {
  id: number;
  promotionId: number;
  productId: number;
  productType: "internet" | "tv" | "voice" | "equipment";
  uiElements: UIElement[];
}

export interface TriggerConfig {
  siteWide?: boolean;
  cmsBlock?: string;
  promoCode?: string;
  abandonedCartCode?: string;
}

export interface MarketAssociation {
  promotionId: string;
  marketId: string;
}

export interface Promotion {
  id: number;
  key: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  triggers?: TriggerConfig[];
  uiElements?: UIElement[];
  display_order: number;

  // Relations - these would be populated by your API when needed
  productAssociations?: ProductAssociation[];
  marketAssociations?: MarketAssociation[];
}
