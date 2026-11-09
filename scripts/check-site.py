"""Check local pages, destinations, and shared navigation without dependencies."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids = []
        self.references = []
        self.menu_links = []
        self.menu_depth = 0
        self.link = None
        self.telephones = []
        self.toggle = False
        self.in_navigation = False
        self.stray_menu_items = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "nav":
            self.in_navigation = True
        if tag == "li" and self.in_navigation and not self.menu_depth:
            self.stray_menu_items += 1
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "button" and "nav-menu-toggle" in attrs.get("class", ""):
            self.toggle = True
        if tag == "ul":
            if self.menu_depth or "nav-menu" in attrs.get("class", "").split():
                self.menu_depth += 1
        if tag == "a":
            self.link = [attrs.get("href", ""), "", self.menu_depth]
        for key in ("href", "src"):
            if key in attrs:
                self.references.append(attrs[key])

    def handle_data(self, data):
        if self.link is not None:
            self.link[1] += data

    def handle_endtag(self, tag):
        if tag == "nav":
            self.in_navigation = False
        if tag == "a" and self.link is not None:
            href, text, depth = self.link
            if depth:
                self.menu_links.append((href, " ".join(text.split()), depth))
            if href.startswith("tel:"):
                self.telephones.append((href, text))
            self.link = None
        if tag == "ul" and self.menu_depth:
            self.menu_depth -= 1


paths = sorted(ROOT.glob("*.html")) + sorted((ROOT / "Health A-Z").glob("*.html"))
pages = {path.resolve(): Page(path.read_text()) for path in paths}
errors = []
menus = []
expected = ["WHAT IS HS", "PROGRAMS", "RESOURCES", "ABOUT US", "COMMUNITY", "EVENTS"]

for path, page in pages.items():
    label = path.relative_to(ROOT)
    if page.stray_menu_items:
        errors.append(f"{label}: stray navigation items outside the main menu")
    if not page.toggle or "primary-menu" not in page.ids:
        errors.append(f"{label}: missing mobile navigation controls")
    duplicates = [key for key, count in Counter(page.ids).items() if count > 1]
    if duplicates:
        errors.append(f"{label}: duplicate IDs {duplicates}")
    top = [text for _, text, depth in page.menu_links if depth == 1]
    if top != expected:
        errors.append(f"{label}: unexpected top-level navigation {top}")
    normalized = []
    for href, text, depth in page.menu_links:
        url = urlsplit(href)
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        destination = "#" if href == "#" else str(target.relative_to(ROOT)) + "?" + url.query + "#" + url.fragment
        normalized.append((destination, text, depth))
    menus.append((label, normalized))
    for href, text in page.telephones:
        dialed = re.sub(r"\D", "", href)
        displayed = re.sub(r"\D", "", text)
        if dialed[-10:] != displayed[-10:]:
            errors.append(f"{label}: phone link does not match displayed number")
    for reference in page.references:
        url = urlsplit(reference)
        if reference == "#" or url.scheme or url.netloc:
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not target.exists():
            errors.append(f"{label}: missing local destination {reference}")
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{label}: missing anchor {reference}")

for label, menu in menus[1:]:
    if menu != menus[0][1]:
        errors.append(f"{label}: menu differs from {menus[0][0]}")

for path in (ROOT / "css").glob("*.css"):
    for reference in re.findall(r"url\([\"']?([^\)\"']+)", path.read_text()):
        if not urlsplit(reference).scheme and not reference.startswith("#"):
            if not (path.parent / unquote(reference)).exists():
                errors.append(f"{path.name}: missing CSS image {reference}")

about = (ROOT / "about.html").read_text()
events = (ROOT / "events.html").read_text()
if "<h1>Our Mission</h1>" not in about:
    errors.append("about.html: mission heading has regressed")
community_day = (ROOT / "community-day.html").read_text()
if "community-day-photo" in about or "community-day-photo" not in community_day:
    errors.append("Community Day content must be on its own event page, not About Us")
if 'href="community-day.html"' not in events:
    errors.append("Events must link to the Community Day page")

for filename in ["what-is-hs.html", "faq.html", "understand-hs.html", "hs-navigate.html",
                 "voices-of-hs.html", "ask-the-expert.html", "our-people.html",
                 "partners-sponsorships.html", "get-involved.html", "community-day.html",
                 "virtual-conference.html", "purple-table.html"]:
    source = (ROOT / filename).read_text()
    if source.count("<h1>") != 1:
        errors.append(f"{filename}: expected one main heading")

faq = (ROOT / "faq.html").read_text()
navigate = (ROOT / "hs-navigate.html").read_text()
if any(symbol in faq for symbol in ["\u274c", "\u274e"]):
    errors.append("FAQ must not include X emojis")
if faq.count('<details class="faq-item">') != 5:
    errors.append("HS FAQ must contain all five questions")
if navigate.count('<details class="faq-item">') != 6:
    errors.append("HS Navigate must contain all six program FAQs")
for week in range(1, 8):
    if f"<strong>Week {week}</strong>" not in navigate:
        errors.append(f"HS Navigate is missing week {week}")
if 'href="navigate-application.html"' not in navigate:
    errors.append("HS Navigate must link to registration information")
if errors:
    print("\n".join(errors))
    raise SystemExit(1)
print(f"PASS: {len(pages)} pages; consistent menus, mobile controls, local links, assets, anchors, IDs, phone links, and content placement.")
