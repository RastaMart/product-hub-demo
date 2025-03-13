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
const marketTypeLabels: Record<string, string> = {
  "ohio-fiber-equal-speed": "Ohio Fiber Equal Speed",
  "florida-fiber": "Florida Fiber",
  "fragile-fiber-sc": "South Carolina Fiber",
  "fiber-competitive": "Competitive Fiber",
  "prime-fiber-wv": "West Virginia Prime Fiber",
  "fragile-fiber-md-de": "Maryland/Delaware Fiber",
  "fiber": "Standard Fiber",
  "fragile-fiber-equal-speed-md": "Maryland Equal Speed Fiber",
  "fiber-equal-speed": "Equal Speed Fiber",
  "fragile-fiber-equal-speed-ct": "Connecticut Equal Speed Fiber",
  "florida-fiber-equal-speed": "Florida Equal Speed Fiber",
  "fiber-competitive-equal-speed": "Competitive Equal Speed Fiber",
  "ohio": "Ohio",
  "prime-wv": "West Virginia Prime",
  "fragile-md-de": "Maryland/Delaware",
  "default": "Standard",
  "fragile-limited-md": "Maryland Limited",
  "limited": "Limited",
  "fragile-ct": "Connecticut",
  "florida-coax": "Florida Coax",
  "fragile-wpa": "Western PA",
  "fragile-sc": "South Carolina",
  "competitive": "Competitive"
};
