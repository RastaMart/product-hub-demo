export interface UIElement {
  id: number;
  key: string;
  kind: "text" | "image";
  txt_text?: string;
  img_desktopImgUrl?: string;
  img_mobileImgUrl?: string;
  img_alt?: string;
}
