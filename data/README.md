# Provider directory

The public directory intentionally starts empty. Only add provider details supplied or approved by IAHSN. Do not publish sample providers.

Donna can supply a spreadsheet with these columns:

| Field | Format |
| --- | --- |
| name | Required: provider's display name and credentials |
| state | Required: two-letter US state code, DC, or territory code PR, VI, GU, AS, MP |
| island | For VI: St. Thomas, St. Croix, or St. John. For MP: Saipan, Tinian, or Rota. Include when known so island filtering can find the listing. |
| type | Required: medical or mental-health |
| organization | Optional: practice or organization |
| specialty | Optional: specialty or services |
| city | Optional: city |
| address | Optional: street address |
| phone | Optional: public contact number |
| website | Optional: full https:// URL |

Enter approved records as objects in the exported array in providers.mjs. Use one record per practice location and care type so each listing is shown under the appropriate state or territory. Leave unavailable optional fields empty. The directory automatically groups cards by state or territory and filters by location, island, type, name, organization, specialty, and city. Listings without an island remain visible under All islands but do not match a specific island filter.

No form input is submitted to a server or stored. Links may preselect a filter, for example directory.html?type=medical&state=MA or directory.html?state=VI&island=St.%20Thomas.
