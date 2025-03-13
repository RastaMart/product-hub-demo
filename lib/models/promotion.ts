export interface UIElement {
  key: string;
  txt_text: string;
  img_desktopImgUrl?: string;
  img_mobileImgUrl?: string;
  img_alt?: string;
}

export interface ProductPackage {
  productKey: string;
  ui_elements: UIElement[];
}

export interface PromoType {
  siteWide: boolean;
  abandonedCartCode?: string;
  cmsBlock: boolean;
  promoCode?: string;
}

export interface Promotion {
  id: string;
  key: string;
  name: string;
  startDate: Date;
  endDate: Date;
  triggers: PromoType[];
  products: ProductPackage[];
  markets: string[]; // Market IDs
  ui_elements: UIElement[];
}