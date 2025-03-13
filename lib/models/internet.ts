export interface InternetProduct {
  id: string;
  key: string;
  name: string;
  download_speed: number;
  upload_speed: number;
  technology: ("coax" | "Fiber G" | "Fiber P")[];
  snapshotId?: string;
  marketIds?: string[];
  idealFor: string;
  promoBanner?: string;
  promoMonths?: number;
  banner?: {
    text: string;
    color: string;
  };
}