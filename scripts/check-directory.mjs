import assert from "node:assert/strict";
import { states, islandsByTerritory, filterProviders } from "../js/directory-model.mjs";

assert.equal(states.length, 56);
assert.equal(new Set(states.map(([code]) => code)).size, 56);
for (const code of ["DC", "PR", "VI", "GU", "AS", "MP"]) {
  assert.ok(states.some(([value]) => value === code));
}
assert.deepEqual(islandsByTerritory.VI, ["St. Thomas", "St. Croix", "St. John"]);
assert.deepEqual(islandsByTerritory.MP, ["Saipan", "Tinian", "Rota"]);

// Synthetic records stay in this test, never in the public directory.
const records = Object.entries(islandsByTerritory).flatMap(([state, islands]) =>
  islands.flatMap((island) => ["medical", "mental-health"].map((type) => ({
    name: `Test ${island} ${type}`, state, island, type
  })))
);
records.push({ name: "Test unspecified island", state: "VI", type: "medical" });
records.push({ name: "Test Massachusetts", state: "MA", type: "medical" });
for (const [state, islands] of Object.entries(islandsByTerritory)) {
  for (const island of islands) {
    assert.equal(filterProviders(records, { state, island }).length, 2);
    for (const type of ["medical", "mental-health"]) {
      const matches = filterProviders(records, { state, island, type });
      assert.equal(matches.length, 1);
      assert.equal(matches[0].island, island);
      assert.equal(matches[0].type, type);
    }
  }
}
assert.equal(filterProviders(records, { state: "VI" }).length, 7);
assert.equal(filterProviders(records, { state: "MP" }).length, 6);
assert.equal(filterProviders(records, { state: "MA", island: "St. Thomas" }).length, 1);
assert.equal(filterProviders(records, { state: "MP", island: "St. Thomas" }).length, 6);
assert.equal(filterProviders(records, { query: "saipan" }).length, 2);
assert.equal(filterProviders(records).length, records.length);
console.log("PASS: 56 locations, all six islands, both care types, territory-wide results, stale island filters, search, and cleared filters.");
