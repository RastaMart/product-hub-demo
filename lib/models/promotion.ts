export interface UIElement {
  key: string;
  type: 'text' | 'image';
  description?: string;
  value?: string;
  img_desktopImgUrl?: string;
  img_mobileImgUrl?: string;
  img_alt?: string;
}

export interface ProductAssociation {
  productKey: string;
  productType: string;
  ui_elements: UIElement[];
}

export interface TriggerConfig {
  siteWide?: boolean;
  cmsBlock?: boolean;
  promoCode?: string;
}

export interface Promotion {
  key: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  triggers?: TriggerConfig[];
  products?: ProductAssociation[];
  markets?: string[];
  ui_elements?: UIElement[];
  display_order: number;
}