export type CategoryType = "Variety+" | "Family+" | "Locals+" | "Add-ons";
export type DeliveryType = "resi" | "smb-private" | "smb-public";
export type IPTVType = "non-iptv" | "iptv";

export interface Channel {
  id: string;
  name: string;
  channelNumber: number;
  isActive: boolean;
  icon: string;
  categories: CategoryType[];
  subCategory?: "HBO" | "Starz encore" | "Movieplex" | "cinemax";
  types: DeliveryType[];
  iptvTypes: IPTVType[];
}