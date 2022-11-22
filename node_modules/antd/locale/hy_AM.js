var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// components/locale/hy_AM.tsx
var hy_AM_exports = {};
__export(hy_AM_exports, {
  default: () => hy_AM_default
});
module.exports = __toCommonJS(hy_AM_exports);
var datePickerLocale = {
  lang: {
    locale: "hy-am",
    placeholder: "Ընտրեք ամսաթիվը",
    rangePlaceholder: ["Մեկնարկի ամսաթիվ", "Ավարտի ամսաթիվը"],
    today: "Այսօր",
    now: "Հիմա",
    backToToday: "Վերադառնալ այսօր",
    ok: "Օկ",
    clear: "Մաքրել",
    month: "Ամիս",
    year: "Տարի",
    timeSelect: "ընտրեք ժամը",
    dateSelect: "ընտրեք ամսաթիվը",
    weekSelect: "Ընտրեք շաբաթը",
    monthSelect: "Ընտրեք ամիսը",
    yearSelect: "Ընտրեք տարին",
    decadeSelect: "Ընտրեք տասնամյակը",
    yearFormat: "YYYY",
    dateFormat: "DD/MM//YYYY",
    dayFormat: "DD",
    dateTimeFormat: "DD/MM//YYYY HH:mm:ss",
    monthBeforeYear: true,
    previousMonth: "Անցած ամիս (PageUp)",
    nextMonth: "Մյուս ամիս (PageDown)",
    previousYear: "Անցած տարի (Control + left)",
    nextYear: "Մյուս տարի (Control + right)",
    previousDecade: "Անցած տասնամյակ",
    nextDecade: "Մյուս տասնամյակ",
    previousCentury: "Անցած դար",
    nextCentury: "Մյուս դար"
  },
  timePickerLocale: {
    placeholder: "Ընտրեք ժամը"
  }
};
var localeValues = {
  locale: "hy-am",
  Pagination: {
    items_per_page: "/ էջ",
    jump_to: "Գնալ",
    jump_to_confirm: "հաստատել",
    page: "",
    prev_page: "Նախորդ Էջ",
    next_page: "Հաջորդ Էջ",
    prev_5: "Նախորդ 5 Էջերը",
    next_5: "Հաջորդ 5 Էջերը",
    prev_3: "Նախորդ 3 Էջերը",
    next_3: "Հաջորդ 3 Էջերը"
  },
  DatePicker: datePickerLocale,
  TimePicker: {
    placeholder: "Ընտրեք ժամը"
  },
  Calendar: datePickerLocale,
  global: {
    placeholder: "Ընտրեք"
  },
  Table: {
    filterTitle: "ֆիլտրի ընտրացանկ",
    filterConfirm: "ֆիլտրել",
    filterReset: "Զրոյացնել",
    selectAll: "Ընտրեք ընթացիկ էջը",
    selectInvert: "Փոխարկել ընթացիկ էջը",
    sortTitle: "Տեսակավորել",
    expand: "Ընդլայնեք տողը",
    collapse: "Կրճատել տողը"
  },
  Modal: {
    okText: "Օկ",
    cancelText: "Չեղարկել",
    justOkText: "Օկ"
  },
  Popconfirm: {
    okText: "Հաստատել",
    cancelText: "Մերժել"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Որոնեք այստեղ",
    itemUnit: "պարագան",
    itemsUnit: "պարագաները"
  },
  Upload: {
    uploading: "Ներբեռնում...",
    removeFile: "Հեռացնել ֆայլը",
    uploadError: "Ներբեռնման սխալ",
    previewFile: "Դիտել ֆայլը",
    downloadFile: "Ներբեռնել ֆայլը"
  },
  Empty: {
    description: "Տվյալներ չկան"
  },
  Icon: {
    icon: "պատկեր"
  },
  Text: {
    edit: "Խմբագրել",
    copy: "Պատճենել",
    copied: "Պատճենվել է",
    expand: "Տեսնել ավելին"
  },
  PageHeader: {
    back: "Հետ"
  }
};
var hy_AM_default = localeValues;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
