export const languageController = async () => {
  const PRICES = {
    yearly: {
      full: 39.99,
      week: 0.48,
    },

    weekly: {
      week: 6.99,
    },
  };

  const VALID_LANGS = ["en", "de", "es", "fr", "ja", "pt"];

  let queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const paramsLang = urlParams.get("lang");
  const systemLang = navigator.language.split("-")[0];

  let lang = VALID_LANGS.includes(systemLang) ? systemLang : "en";

  if (paramsLang && VALID_LANGS.includes(paramsLang)) {
    lang = paramsLang;
  }

  document.documentElement.classList.add(`lang-${lang}`);

  const nodesToTranslate = document.querySelectorAll("[data-lang]");

  const translateNode = (node, translateString, PRICES) => {
    if (node.hasAttribute("data-price")) {
      const [priceType, priceValue] = node.dataset.price.split("-");
      const price = PRICES[priceType][priceValue];
      node.innerHTML = translateString.replace("{{price}}", `$ ${price}`);
    } else {
      node.innerHTML = translateString;
    }
  };

  try {
    const response = await fetch(`../lang/${lang}.json`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const data = await response.json();

    nodesToTranslate.forEach((node) => {
      translateNode(node, data[node.dataset.lang], PRICES);
    });
  } catch (error) {
    const response = await fetch(`../lang/en.json`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const data = await response.json();
    nodesToTranslate.forEach((node) => {
      translateNode(node, data[node.dataset.lang], PRICES);
    });
  }
};
