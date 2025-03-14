// Change from:
export interface UIElement {
  id: number;
  key: string;
  element_type: "text" | "image";
  txt_text?: string;
  img_desktopImgUrl?: string;
  img_mobileImgUrl?: string;
  img_alt?: string;
}

// To:
export interface UIElementType {
  key: string;
  description?: string;
  type: string;
}
