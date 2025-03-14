export interface UIElement {
  key: string;
  type: "text" | "image";
  description?: string;
  txt_text?: string;
  img_desktopImgUrl?: string;
  img_mobileImgUrl?: string;
  img_alt?: string;
}

export interface ProductAssociation {
  relation_id: number;
  promotionKey: string;
  productKey: string;
  productType: "internet" | "tv" | "voice" | "equipment";
  ui_elements: UIElement[];
}

export interface TriggerConfig {
  siteWide?: boolean;
  cmsBlock?: string;
  promoCode?: string;
  abandonedCartCode?: string;
}

export interface MarketAssociation {
  promotionKey: string;
  marketKey: string;
}

export interface Promotion {
  key: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  triggers?: TriggerConfig[];
  ui_elements?: UIElement[];
  display_order: number;

  // Relations - these would be populated by your API when needed
  productAssociations?: ProductAssociation[];
  marketAssociations?: MarketAssociation[];
}
