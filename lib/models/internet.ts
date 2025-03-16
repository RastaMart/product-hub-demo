export interface InternetProduct {
  id: number;
  key: string;
  name: string;
  download_speed: number;
  upload_speed: number;
  technology: ("coax" | "Fiber G" | "Fiber P")[];
  snapshotId?: string;
  idealFor: string;
  promoBanner?: string;
  promoMonths?: number;
  banner?: {
    text: string;
    color: string;
  };
  // Many-to-many relationship property
  markets?: string[];
}
