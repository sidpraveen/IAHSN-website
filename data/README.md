# Provider directory

The public directory intentionally starts empty. Only add provider details supplied or approved by IAHSN. Do not publish sample providers.

Donna can supply a spreadsheet with these columns:

| Field | Format |
| --- | --- |
| name | Required: provider's display name and credentials |
| state | Required: two-letter US state code, or DC |
| type | Required: medical or mental-health |
| organization | Optional: practice or organization |
| specialty | Optional: specialty or services |
| city | Optional: city |
| address | Optional: street address |
| phone | Optional: public contact number |
| website | Optional: full https:// URL |

Enter approved records as objects in the exported array in providers.mjs. Use one record per practice location/state and care type so each listing is shown under the appropriate state. Leave unavailable optional fields empty. The directory automatically groups cards by state and filters by state, type, name, organization, specialty, and city.

No form input is submitted to a server or stored. Links may preselect a filter, for example directory.html?type=medical&state=MA.
