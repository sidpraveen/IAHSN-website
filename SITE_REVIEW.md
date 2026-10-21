# IAHSN website review

Reviewed October 20, 2026. Scope: all seven local HTML pages, shared styles and scripts, directory data, local assets and links, and the running local site at desktop and phone widths. This is not a verification of a published production site.

## Findings and repairs

- The home page contained an older navbar while the other six pages had the revised navbar. This reversed the About Us position, restored the separate Find Care tab, omitted requested resource items, and showed the old Advocacy entries under Events. Restored the agreed menu consistently across all seven pages.
- At phone widths, the home page's menu was hidden by the shared stylesheet, but its old markup had no Menu button. Restored the mobile controls and verified nested menu navigation.
- Removed the nonfunctional Members item from the remaining pages to match the home page and the requested menu.
- Health A-Z had broken relative paths for the footer logo and both legal PDFs. Corrected them. HS Navigate's footer also now uses the same supplied white logo.
- The displayed phone number was 617-593-1883, but both phone links dialed a different number. The links now match the displayed number.
- All six home-page HS topic links led to Mindful Blocc. Five now link to relevant existing Health A-Z entries. The FAQ link clearly explains that its page is not ready.
- HS Action Plan now links to the existing Health A-Z explanation. It is not yet a downloadable action-plan worksheet.
- HS Navigate's Learn More was a noninteractive div. It now opens the existing program information page. Support Options and Build Your Care List also have relevant destinations.
- Hidden slideshow content could remain available to keyboard users. Inactive slides now have hidden visibility, inert state, and aria-hidden. Added a pause control and prevented automatic rotation while the carousel has focus, is hovered, or the browser page is hidden; reduced-motion users start paused.
- Donation, shop, webinar, social, survey, FAQ, newsletter, and article placeholders now explain their unavailable status instead of doing nothing or jumping to the top. This feedback does not implement those missing services.
- Added an accessible Health A-Z page heading and initialized its search count from its actual 110 topic cards.

## Donna's requested changes

| Request | Current status |
| --- | --- |
| Programs: HS Navigate, Voices of HS, HS Ask the Expert | Correct menu and destinations. Voices of HS and Ask the Expert still need content. |
| Resources: six requested entries | Present in order. Find Care & Support opens the directory choices. |
| Remove separate Find Care navigation tab | Removed across all pages. |
| Medical and mental health directory choices | Both buttons work with state, care-type, and search filters. Provider list is empty pending approved details. |
| About Us in fourth position | Correct across all pages. |
| Our Mission only as the page's opening heading | Implemented. Navbar still says About Us as requested. |
| Our People, Leadership & Team, SLAC | Correct nested menus and headings. |
| Tahirih moved to Leadership & Team as Secretary | Implemented. |
| Muhammad as SLAC Chair; remove Dena and Madison's titles | Implemented. Additional names still needed. |
| Partners & Sponsorships with seven named organizations | All seven are present. Council entries use text where logos/details are pending. |
| HS Patient Advocacy Council renamed and moved under About Us | Implemented. |
| Get Involved for volunteer information | Menu and contact link are present. Full volunteer information is still needed. |
| Charity Navigator at bottom of home page | Implemented. Candid remains text pending its logo. |
| Use supplied white IAHSN footer logo | Consistent across all seven pages after this review. |
| Events replaces Advocacy | Implemented with the three requested event entries. |
| Move Community Day information/photo to Events | Implemented; removed from About Us. |
| Virtual conference and The Purple Table | Entries and placeholder sections exist; full content/registration details are pending. |

## Still unfinished

The following are not production-ready, and should not be described as fully implemented:

- Provider listings and contact details from Donna.
- Newsletter signup service/form and destination.
- Donation destination, shop/download destination, and official social links.
- Actual HS survey, FAQ content, and full HS in the News articles.
- Webinar details, additional Mindful Blocc content, Voices of HS, and HS Ask the Expert content.
- Conference and Purple Table information; dates and registration links where applicable.
- Additional SLAC names, full volunteer details, and outstanding logos.
- HS Navigate applications: the existing page is a coming-soon overview, not a working application form.

No external service accounts, subscriptions, payments, or email sends were configured or performed.

## Verification

- Checked all seven pages in the local browser at 1280px and 390px widths.
- Confirmed all pages have the same seven top-level navigation items, working mobile controls, and no horizontal page overflow at 390px.
- Checked local assets, links, anchor targets, duplicate IDs, phone-link consistency, and menu consistency with scripts/check-site.py.
- Tested mobile About Us > Our People > Leadership & Team navigation.
- Tested Health A-Z search, no-result state, and clearing the search.
- Tested directory URL preselection, both care-choice buttons, and resetting filters.
- Tested slideshow controls, pause, inactive-slide accessibility state, mental health tabs, and the newsletter placeholder notice.

Run the structural regression check from the project folder with:

```sh
python3 scripts/check-site.py
```

All layout and content changes are local project edits. Publishing has not been performed as part of this review.
