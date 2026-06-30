export interface State {
  id: string; // Slug-based id, e.g., "maharashtra"
  name: string;
  slug: string;
  code: string; // ISO 2-letter code, e.g., "MH"
  type: "state" | "ut";
  region: "North" | "South" | "East" | "West" | "Central" | "Northeast";
  latitude: number;
  longitude: number;
}

export interface District {
  id: string; // unique slug e.g. "pune-maharashtra"
  name: string;
  slug: string; // "pune"
  stateId: string; // References State.id
  stateCode: string; // e.g. "MH"
  latitude: number;
  longitude: number;
}

export interface City {
  id: string; // unique slug e.g. "mumbai"
  name: string;
  slug: string;
  districtId: string; // References District.id
  stateId: string; // References State.id
  stateCode: string; // e.g. "MH"
  isMajor: boolean;
  latitude: number;
  longitude: number;
}
