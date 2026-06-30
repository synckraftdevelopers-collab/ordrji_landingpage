import { State, District, City } from "./types";
import { states } from "./states";
import { districts } from "./districts";
import { cities } from "./cities";

export * from "./types";
export { states, districts, cities };

export interface SearchResult {
  type: "state" | "district" | "city";
  name: string;
  slug: string;
  subtext: string;
  stateCode: string;
  item: State | District | City;
}

/**
 * Find a state by its slug.
 */
export function findStateBySlug(slug: string): State | undefined {
  return states.find((s) => s.slug === slug);
}

/**
 * Find a district by its slug.
 */
export function findDistrictBySlug(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

/**
 * Find a city by its slug.
 */
export function findCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Get all districts belonging to a specific state (by state slug/id).
 */
export function getDistrictsByState(stateId: string): District[] {
  return districts.filter((d) => d.stateId === stateId);
}

/**
 * Get all cities belonging to a specific state (by state slug/id).
 */
export function getCitiesByState(stateId: string): City[] {
  return cities.filter((c) => c.stateId === stateId);
}

/**
 * Get all cities belonging to a specific district (by district id).
 */
export function getCitiesByDistrict(districtId: string): City[] {
  return cities.filter((c) => c.districtId === districtId);
}

/**
 * Performs a fast, case-insensitive query across States, Districts, and Cities.
 * Returns up to N matched results sorted for relevance.
 */
export function searchLocations(query: string, limit = 10): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResult[] = [];

  // 1. Search Cities (Major cities matching query)
  for (const city of cities) {
    if (city.name.toLowerCase().includes(cleanQuery)) {
      const parentState = states.find((s) => s.id === city.stateId);
      const stateName = parentState ? parentState.name : city.stateCode;
      results.push({
        type: "city",
        name: city.name,
        slug: city.slug,
        subtext: `City in ${stateName}`,
        stateCode: city.stateCode,
        item: city,
      });
    }
  }

  // 2. Search Districts
  for (const dist of districts) {
    if (dist.name.toLowerCase().includes(cleanQuery)) {
      // Avoid duplicate names if a city matches the district name (e.g. Pune City vs Pune District)
      const parentState = states.find((s) => s.id === dist.stateId);
      const stateName = parentState ? parentState.name : dist.stateCode;
      results.push({
        type: "district",
        name: dist.name,
        slug: dist.slug,
        subtext: `District in ${stateName}`,
        stateCode: dist.stateCode,
        item: dist,
      });
    }
  }

  // 3. Search States & Union Territories
  for (const state of states) {
    if (state.name.toLowerCase().includes(cleanQuery) || state.code.toLowerCase() === cleanQuery) {
      results.push({
        type: "state",
        name: state.name,
        slug: state.slug,
        subtext: state.type === "ut" ? "Union Territory" : "State",
        stateCode: state.code,
        item: state,
      });
    }
  }

  // Rank matches:
  // - Starts with query matches first
  // - Exact matches highest priority
  // - Then contains match
  const score = (name: string) => {
    const lname = name.toLowerCase();
    if (lname === cleanQuery) return 3;
    if (lname.startsWith(cleanQuery)) return 2;
    return 1;
  };

  return results
    .sort((a, b) => {
      const scoreA = score(a.name);
      const scoreB = score(b.name);
      if (scoreA !== scoreB) return scoreB - scoreA; // Descending score
      return a.name.localeCompare(b.name); // Alphabetical fallback
    })
    .slice(0, limit);
}
