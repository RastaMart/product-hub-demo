export interface Market {
  id: string;
  label: string;
  code: string;
  active: boolean;
  snapshotId?: string;
  productKeys?: string[];
  audienceValue?: string;
}

// Market type to label mapping
