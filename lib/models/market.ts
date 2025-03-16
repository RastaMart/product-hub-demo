export interface Market {
  id: number;
  key: string;
  label: string;
  csgCode: string;
  active: boolean;
  // Many-to-many relationship properties
  internetProducts?: string[];
  tvProducts?: string[];
  voiceProducts?: string[];
}

// Market type to label mapping
