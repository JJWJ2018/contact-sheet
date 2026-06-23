# Print contact sheet — Assets 10 action-plugin

A10-port van de A6-sample "Print contact sheet". Selecteer assets → kies een layout
(1/2/6/12 per pagina) → **Open print view** opent een nieuw venster met de volledige
contact sheet → printen via de browser. Zelfde gedrag als A6, maar self-hosted en op de
`@woodwing/a10-client-sdk`.

Statische plugin (geen build-stap): `index.html` + `config.js` (+ `icon.png`).

## Bestanden
- `index.html` — de plugin-UI, SDK-koppeling en generatie van het printvenster.
- `config.js` — layouts, metadatavelden per layout, labels, afbeeldingsbron. **Pas dit aan.**
- `icon.png` — 20×20 icoon voor de plugin-knop (nog toe te voegen; zie hieronder).

## Hoe het werkt
1. De plugin bootstrapt met de A10-client en leest de huidige selectie
   (`client.getSelection()` → `[{ id, metadata, thumbnailUrl, previewUrl }]`).
2. De gebruiker kiest een layout. De default staat in `config.js` (`defaultHitsOnPage`).
3. **Open print view** bouwt een self-contained HTML-document (A4, paginabreuk per sheet)
   en opent dat met `window.open()`; het venster roept zelf `window.print()` aan.
4. Per layout worden de in `config.js` ingestelde metadatavelden getoond; `rating` wordt
   als sterren gerenderd. 1/2-per-pagina gebruiken `previewUrl` (groter), 6/12 de
   `thumbnailUrl` (sneller) — configureerbaar via `imageSource`.

## Hosten via GitHub + Vercel (zoals de location panel)
1. Nieuwe GitHub-repo, bv. `assets-contact-sheet`.
2. `index.html`, `config.js` (+ `icon.png`) in de root, push.
3. vercel.com → Add New… → Project → importeer de repo.
4. Framework preset: **Other** (geen build command, output = root). Deploy.
5. Je krijgt een HTTPS-URL, bv. `https://assets-contact-sheet.vercel.app/`. Vercel zet
   geen `X-Frame-Options`, dus Assets kan de pagina embedden.

## Configureren in de Management Console
Plug-ins → **Action plug-ins** → `+`:
- **Name:** `Print contact sheet`
- **URL:** je Vercel-URL
- **Icon:** upload `icon.png` (20×20)
- **Asset domains / permissions:** beperk tot image-domeinen indien gewenst.
- **Enabled when:** *Any filtered selection* (één of meer assets geselecteerd).
- **Enable** aanzetten → **Save**. Daarna rechten per usergroup instellen.

## Nog te verifiëren in Assets (de echte risico's)
1. **Thumbnails/previews in het printvenster.** `thumbnailUrl`/`previewUrl` zijn
   cookie-beveiligd (anoniem → 401). In het ingelogde panel laden ze (bewezen door de
   location panel). Het **nieuwe printvenster** is een aparte document-context op dezelfde
   browsersessie; de cookies van de Assets-origin horen meegestuurd te worden, dus de
   `<img>`-tags zouden moeten laden — **maar dit moet je live testen**. Laadt het venster
   leeg/met gebroken plaatjes, dan is dit de oorzaak en moeten we de afbeeldingen anders
   leveren (bv. via een self-hosted proxy/service of een publieke rendition).
2. **Popup.** `window.open` gebeurt op een user-click, dus normaal niet geblokkeerd. Bij
   blokkade toont de plugin een hint; zet popups dan toe.
3. **Action-plugin-ondersteuning** op jullie A10-versie (panel-plugins waren de
   hoofdfocus). Als action-plugins nog niet volledig werken, kan dezelfde code als
   panel-plugin draaien (knop in het zijpaneel) zonder wijziging aan de printlogica.
4. **Metadata-veldnamen** in `config.js` tegen jullie A10-schema (de A6-namen zijn de
   default). Ontbrekende velden worden netjes overgeslagen.

## SDK (Assets 10)
Gebruik **`@woodwing/a10-client-sdk`**, NIET het oude `assets-client-sdk` (A6 — handshake
loopt op A10 vast in een timeout).

```js
import { Assets10Client } from 'https://unpkg.com/@woodwing/a10-client-sdk@1.0.0/dist/index.mjs';
const client = await Assets10Client.bootstrap({ handshakeTimeoutMs: 6000 });
const sel = client.getSelection();           // [{ id, metadata, thumbnailUrl, previewUrl }]
client.onSelectionUpdate(assets => { ... });
```

## Icoon
Nog toe te voegen: een 20×20 `icon.png` (bv. een grid-/raster-icoon). Je kunt het
icoon van de location panel hergebruiken of een nieuw aanleveren.
