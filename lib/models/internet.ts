export interface InternetProduct {
  id: string;
  key: string;
  name: string;
  download_speed: number;
  upload_speed: number;
  technology: ("coax" | "Fiber G" | "Fiber P")[];
  snapshotId?: string;
  // marketIds removed, as it's now a many-to-many relationship
  idealFor: string;
  promoBanner?: string;
  promoMonths?: number;
  banner?: {
    text: string;
    color: string;
  };
  // New property to represent the many-to-many relationship when needed in code
  markets?: string[];
}
