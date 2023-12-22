import { date, scroll, Notify } from "quasar";
import { i18n } from "src/boot/i18n";
import { router } from "src/router";
const { t, locale } = i18n.global;
const { setVerticalScrollPosition } = scroll;

export const PHONE_PREFIX = "+998";

export function getServerError({ response }, field = "errorCode") {
  if (!response) return "";
  return response?.data?.error?.[field] || "Server bo'sh xabar qaytardi";
}
export function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

export function trimBetween(val) {
  if (!val) return val;
  const res = val.toString().replace(/\s+/g, "");
  if (isNaN(+res)) return res;
  return res;
}

export function getDateNow(format = "DD.MM.YYYY") {
  return date.formatDate(Date.now(), format);
}
export function formatDate(strDate, format = "DD.MM.YYYY") {
  if (!strDate) return "";
  let newDate = null;
  try {
    newDate = new Date(strDate.replace(/\s/, "T").replace(/Z/, "") + "Z");
    if (newDate.toString() === "Invalid Date") {
      return date.formatDate(date.extractDate(strDate, "DD.MM.YYYY"), format);
    }
  } catch (e) {
    return date.formatDate(strDate, format);
  }

  return date.formatDate(newDate, format);
}

export function prettify(num) {
  if (!num) return num;
  const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;

  const res = num.toString().replace(regExp, "$1 ");
  return res;
}

export function deepCopy(data) {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}

export function formatDateToUTC(
  vDate,
  config = { format: "DD.MM.YYYY", endDay: false }
) {
  if (!vDate) return null;

  if (typeof vDate === "string") {
    vDate = new Date(
      date.formatDate(date.extractDate(vDate, config.format), "YYYY-MM-DD")
    );
  }

  if (config.endDay) vDate.setUTCHours(23, 59, 59, 999);
  else vDate.setUTCHours(0, 0, 0, 0);

  return vDate.toUTCString();
}

export async function downloadBlobFile(data, fileName) {
  if (!data) return;

  const blob = new Blob([data]);
  let link = document.createElement("a");
  link.style.visibility = "hidden";
  let url = window.URL.createObjectURL(blob);
  link.href = url;

  // append url to element and trigger click
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  });
}
export async function replaceQueryFilter(allFilters, query) {
  const filters = { ...query, ...allFilters };
  const mapSelectedFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters?.[key] !== null && filters?.[key] !== "") {
      mapSelectedFilters[key] = filters?.[key];
    }
  });

  await router.replace({ query: { ...mapSelectedFilters } });
  return allFilters;
}
