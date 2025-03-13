export interface Market {
  key: string; // Now primary key
  label: string;
  code: string;
  active: boolean;
  snapshotId?: string;
  // Many-to-many relationship properties
  internetProducts?: string[];
  tvProducts?: string[];
  voiceProducts?: string[];
}

// Market type to label mapping
