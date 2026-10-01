/*
 * Lingue del sito. Ogni pagina definisce `PAGE_TEXT` con i suoi testi; qui
 * stanno quelli comuni (barra in alto, piè di pagina) e la logica.
 *
 * Ordine di scelta: lingua salvata dall'utente, poi quella del browser,
 * poi inglese. Le pagine HTML sono scritte in italiano, così senza
 * JavaScript si legge comunque tutto.
 */

const COMMON_TEXT = {
  it: { navSupport: "Assistenza", navPrivacy: "Privacy", navTerms: "Termini", platform: "Dampers per iOS e Android" },
  en: { navSupport: "Support", navPrivacy: "Privacy", navTerms: "Terms", platform: "Dampers for iOS and Android" },
  de: { navSupport: "Support", navPrivacy: "Datenschutz", navTerms: "Nutzungsbedingungen", platform: "Dampers für iOS und Android" },
  fr: { navSupport: "Assistance", navPrivacy: "Confidentialité", navTerms: "Conditions", platform: "Dampers pour iOS et Android" },
  es: { navSupport: "Soporte", navPrivacy: "Privacidad", navTerms: "Términos", platform: "Dampers para iOS y Android" },
  pt: { navSupport: "Apoio", navPrivacy: "Privacidade", navTerms: "Termos", platform: "Dampers para iOS e Android" }
};

const STORAGE_KEY = "dampers-language";

function readSaved() {
  try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
}

function save(language) {
  try { localStorage.setItem(STORAGE_KEY, language); } catch (e) { /* navigazione privata */ }
}

function detectLanguage() {
  const saved = readSaved();
  if (saved && PAGE_TEXT[saved]) return saved;
  const browser = (navigator.language || "en").toLowerCase().split("-")[0];
  return PAGE_TEXT[browser] ? browser : "en";
}

function setLanguage(language) {
  if (!PAGE_TEXT[language]) language = "en";
  const content = Object.assign({}, COMMON_TEXT[language], PAGE_TEXT[language]);

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = content[element.getAttribute("data-i18n")];
    if (value !== undefined) element.innerHTML = value;
  });

  document.documentElement.lang = language;
  if (content.pageTitle) document.title = content.pageTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description && content.description) description.setAttribute("content", content.description);

  document.getElementById("languageSelect").value = language;
  save(language);
}

setLanguage(detectLanguage());
document.getElementById("languageSelect").addEventListener("change", function () {
  setLanguage(this.value);
});
