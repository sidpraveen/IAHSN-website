export const states = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
  ["PR", "Puerto Rico"], ["VI", "U.S. Virgin Islands"], ["GU", "Guam"],
  ["AS", "American Samoa"], ["MP", "Northern Mariana Islands"]
];

export const islandsByTerritory = {
  VI: ["St. Thomas", "St. Croix", "St. John"],
  MP: ["Saipan", "Tinian", "Rota"]
};

export const careTypes = { medical: "Medical provider", "mental-health": "Mental health professional" };
const normalize = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function filterProviders(records, { state = "", island = "", type = "", query = "" } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const selectedIsland = islandsByTerritory[state]?.includes(island) ? island : "";
  return records.filter((provider) => {
    const searchable = normalize([provider.name, provider.organization, provider.specialty, provider.city, provider.island].join(" "));
    return (!state || provider.state === state) &&
      (!selectedIsland || provider.island === selectedIsland) &&
      (!type || provider.type === type) &&
      terms.every((term) => searchable.includes(term));
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function websiteUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
