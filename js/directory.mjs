import { providers } from "../data/providers.mjs";
import { states, careTypes, filterProviders, websiteUrl } from "./directory-model.mjs";

const form = document.querySelector("#directory-filters");
const stateInput = document.querySelector("#provider-state");
const typeInput = document.querySelector("#provider-type");
const searchInput = document.querySelector("#provider-search");
const results = document.querySelector("#directory-results");
const status = document.querySelector("#directory-status");
const empty = document.querySelector("#directory-empty");
const emptyTitle = document.querySelector("#directory-empty-title");
const emptyCopy = document.querySelector("#directory-empty-copy");

for (const [code, name] of states) stateInput.add(new Option(name, code));
const initial = new URLSearchParams(location.search);
stateInput.value = states.some(([code]) => code === initial.get("state")) ? initial.get("state") : "";
typeInput.value = Object.hasOwn(careTypes, initial.get("type")) ? initial.get("type") : "";

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function providerCard(provider) {
  const card = element("article", "provider-card");
  card.append(element("p", "provider-type", careTypes[provider.type]));
  card.append(element("h3", "", provider.name));
  if (provider.organization) card.append(element("p", "provider-organization", provider.organization));
  if (provider.specialty) card.append(element("p", "provider-specialty", provider.specialty));
  const stateName = states.find(([code]) => code === provider.state)?.[1];
  card.append(element("p", "provider-location", [provider.city, stateName].filter(Boolean).join(", ")));
  if (provider.address) card.append(element("p", "provider-address", provider.address));
  const actions = element("div", "provider-actions");
  if (provider.phone) {
    const phone = element("a", "", provider.phone);
    phone.href = "tel:" + provider.phone.replace(/[^+\d]/g, "");
    phone.setAttribute("aria-label", "Call " + provider.name + " at " + provider.phone);
    actions.append(phone);
  }
  const url = websiteUrl(provider.website);
  if (url) {
    const website = element("a", "", "Visit website");
    website.href = url;
    website.setAttribute("aria-label", "Visit website for " + provider.name);
    actions.append(website);
  }
  card.append(actions);
  return card;
}

function render() {
  const matches = filterProviders(providers, { state: stateInput.value, type: typeInput.value, query: searchInput.value });
  const stateName = states.find(([code]) => code === stateInput.value)?.[1];
  status.textContent = providers.length
    ? matches.length + (matches.length === 1 ? " provider" : " providers") + (stateName ? " in " + stateName : " across all states")
    : "Directory in progress" + (stateName ? " · " + stateName : "");
  results.replaceChildren();
  empty.hidden = matches.length > 0;
  if (!matches.length) {
    emptyTitle.textContent = providers.length ? "No providers match your filters" : "Provider listings are coming soon";
    emptyCopy.textContent = providers.length
      ? "Try another state, choose all care types, or clear your search. A missing listing does not mean care is unavailable in your area."
      : (stateName ? "Listings for " + stateName + " will appear here as they become available." : "We are preparing this directory. Medical and mental health provider listings will appear here as they become available.");
  }
  for (const [code, name] of states) {
    const group = matches.filter((provider) => provider.state === code);
    if (!group.length) continue;
    const section = element("section", "provider-state-group");
    const heading = element("h2", "", name);
    heading.id = "state-" + code;
    section.setAttribute("aria-labelledby", heading.id);
    const grid = element("div", "provider-grid");
    grid.append(...group.map(providerCard));
    section.append(heading, grid);
    results.append(section);
  }
}

form.addEventListener("submit", (event) => event.preventDefault());
form.addEventListener("input", render);
form.addEventListener("change", render);
form.addEventListener("reset", () => {
  stateInput.value = "";
  typeInput.value = "";
  searchInput.value = "";
  render();
});
form.hidden = false;
render();
