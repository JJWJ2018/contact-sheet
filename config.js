// Configuratie voor de Print Contact Sheet action-plugin (Assets 10).
// Overgenomen uit de A6-sample (metadataSetsToDisplay + defaultHitsOnPage) en
// aangevuld met A10-specifieke opties. Pas de veldnamen aan op jullie schema.
window.CONTACT_SHEET_CONFIG = {

  // Standaard layout bij openen. Mogelijke waarden: 1, 2, 6 of 12.
  defaultHitsOnPage: 2,

  // Welke metadatavelden per layout worden getoond (zoals de A6-sample).
  // LET OP: dit zijn de A6-veldnamen. Verifieer tegen jullie A10-schema
  // (de plugin logt bij "Geen waarde" niets stuk; ontbrekende velden worden
  //  simpelweg overgeslagen). Zie README → "Nog te verifiëren".
  metadataSetsToDisplay: {
    onePerPage:    ["filename", "description", "tags", "rating", "title",
                    "subject", "assetCreated", "byline", "creator", "copyright"],
    twoPerPage:    ["filename", "rating", "title", "assetCreated"],
    sixPerPage:    ["filename", "rating"],
    twelvePerPage: ["filename"],
  },

  // Labels voor de velden in het printvenster. Onbekende velden krijgen de
  // veldnaam zelf als label.
  fieldLabels: {
    filename:     "Filename",
    description:  "Description",
    tags:         "Tags",
    rating:       "Rating",
    title:        "Title",
    subject:      "Subject",
    assetCreated: "Created",
    byline:       "Byline",
    creator:      "Creator",
    copyright:    "Copyright",
  },

  // Welke afbeeldings-URL per layout. "preview" is groter (mooier voor 1/2 per
  // pagina), "thumbnail" is sneller (prima voor 6/12). Valt terug op de ander
  // als de gekozen URL ontbreekt.
  imageSource: {
    onePerPage:    "preview",
    twoPerPage:    "preview",
    sixPerPage:    "thumbnail",
    twelvePerPage: "thumbnail",
  },

  // Velden die als sterren-rating gerenderd moeten worden i.p.v. als tekst.
  ratingFields: ["rating"],
};
