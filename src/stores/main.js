import { i18n } from "src/boot/i18n";
import { defineStore } from "pinia";
import { computed, ref } from "vue-demi";
import languages from "quasar/lang/index.json";
import { Quasar } from "quasar";
import { useI18n } from "vue-i18n";

export const useMainStore = defineStore("main", () => {
  const availableLangs = ["ru", "uz-Cyrl"];
  const appLanguages = languages.filter((lang) =>
    availableLangs.includes(lang.isoName)
  );

  const defaultLangOptions = [
    {
      value: "ru",
      label: "Русский",
      shortName: "Рус",
    },
    {
      value: "uz-Cyrl",
      label: "Ўзбекча",
      shortName: "Ўзб",
    },
  ];

  const langOptions = [];

  appLanguages.forEach((lang) => {
    const res = defaultLangOptions.find((l) => l.value === lang.isoName);
    if (res) {
      langOptions.push({
        nativeName: lang.nativeName,
        ...res,
      });
    }
  });
  const { locale } = useI18n();

  const availableLocales = computed(() => {
    return langOptions.filter((v) => v.value !== locale.value);
  });
  const currentLocale = computed(() => {
    return langOptions.find((v) => v.value === locale.value) || {};
  });

  async function setLanguage(val = null) {
    const navigatorLang = navigator.language.split("-")[0];
    let lang = val || localStorage.getItem("locale") || navigatorLang;
    lang = availableLangs.find((v) => v.startsWith(lang));

    !lang && (lang = "ru");
    /* @vite-ignore */
    const qLang = await import(/* @vite-ignore */ "quasar/lang/" + lang);
    Quasar.lang.set(qLang.default);
    i18n.global.locale.value = lang;
    localStorage.setItem("locale", lang);
  }

  const isDrawerOpen = ref(window.innerWidth > 800 ? true : false);

  return {
    setLanguage,
    availableLocales,
    currentLocale,
    isDrawerOpen,
    toggleDrawer() {
      isDrawerOpen.value = !isDrawerOpen.value;
    },
  };
});
