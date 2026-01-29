import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ru" | "kz";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    "nav.home": "Главная",
    "nav.umrah": "Умра",
    "nav.tours": "Туры",
    "nav.about": "О нас",
    "nav.contacts": "Контакты",
    "hero.bismillah": "БИСМИЛЛЯХИ РАХМАНИ РАХИМ",
    "hero.title": "Умра – путь к духовному обновлению",
    "hero.subtitle":
      "Умра – это малое паломничество, которое дарит мусульманам возможность приблизиться к Аллаху, очиститься от грехов и укрепить свою веру.",
    "hero.cta": "Выбрать тур",
    "about.title": "Духовное очищение и близость к Всевышнему",
    "about.subtitle": "О ПАЛОМНИЧЕСТВЕ",
    "about.text1":
      "Умра – это малое паломничество, которое каждый мусульманин может совершить в любое время года. В отличие от Хаджа, Умра не является обязательной, но её совершение имеет огромную награду и помогает очистить душу от грехов, укрепить веру и найти умиротворение.",
    "about.text2":
      "Паломники, совершающие Умру, направляются в священный город Мекка, чтобы выполнить ряд ритуалов, предписанных исламом. Это путешествие объединяет миллионы мусульман по всему миру, вдохновляя их верой и единством.",
    "about.text3":
      "Совершение Умры – это выражение преданности и смирения перед Аллахом. Она символизирует духовное очищение и готовность человека изменить свою жизнь, следуя праведному пути.",
    "tours.title": "Наши Туры",
    "tours.subtitle": "ПУТЕШЕСТВИЯ",
    "tours.details": "Подробнее",
    "tours.loading": "Загрузка туров...",
    "tours.error": "Произошла ошибка при загрузке данных.",
    "tours.no_tours": "В данный момент доступных туров нет.",
    "tours.show_more": "Барлық турларды көру (Показать все)",
    "tours.show_less": "Көбірек жасыру (Скрыть)",
    "footer.rights": "Все права защищены.",
    "footer.title": "Контакты",
    "footer.socials": "Мы в соцсетях",
    "form.title": "Оставить заявку",
    "form.name": "Ваше имя",
    "form.phone": "Телефон",
    "form.message": "Сообщение",
    "form.submit": "Отправить заявку",
    "form.sending": "Отправка...",
    "modal.book": "Орын брондау",
    "modal.price": "Құны",
    "modal.per_person": "* Баға бір адамға есептелген",
    "modal.included": "Турға не кіреді:",
    "modal.flight": "Авиабилеттер",
    "modal.visa": "Визалық қолдау",
    "modal.food": "Тамақтану",
    "modal.transfer": "Трансфер",
    "modal.ziyarat": "Зиярат",
    "modal.guide": "Тәжірибелі гид",
  },
  kz: {
    "nav.home": "Басты бет",
    "nav.umrah": "Умра",
    "nav.tours": "Турлар",
    "nav.about": "Біз туралы",
    "nav.contacts": "Байланыс",
    "hero.bismillah": "БИСМИЛЛЯХИ РАХМАНИ РАХИМ",
    "hero.title": "Умра – рухани тазару жолы",
    "hero.subtitle":
      "Умра – мұсылмандарға Аллаға жақындауға, күнәлардан тазаруға және иманын нығайтуға мүмкіндік беретін кіші қажылық.",
    "hero.cta": "Турды таңдау",
    "about.title": "Рухани тазару және Жаратушыға жақындау",
    "about.subtitle": "ҚАЖЫЛЫҚ ТУРАЛЫ",
    "about.text1":
      "Умра – бұл әрбір мұсылман жылдың кез келген уақытында жасай алатын кіші қажылық. Қажылықтан айырмашылығы, Умра міндетті емес, бірақ оны орындаудың сауабы орасан зор және ол жанды күнәлардан тазартуға, иманды күшейтуге және тыныштық табуға көмектеседі.",
    "about.text2":
      "Умра жасаушы қажылар Ислам дінінде белгіленген рәсімдерді орындау үшін қасиетті Мекке қаласына бет алады. Бұл сапар бүкіл әлемдегі миллиондаған мұсылмандарды біріктіріп, оларды сенім мен бірлікке шабыттандырады.",
    "about.text3":
      "Умра жасау – бұл Аллаға деген адалдық пен кішіпейілділіктің көрінісі. Ол рухани тазаруды және адамның дұрыс жолмен жүріп, өмірін өзгертуге дайындығын білдіреді.",
    "tours.title": "Біздің турлар",
    "tours.subtitle": "САЯХАТТАР",
    "tours.details": "Толығырақ",
    "tours.loading": "Турлар жүктелуде...",
    "tours.error": "Деректерді жүктеу кезінде қате пайда болды.",
    "tours.no_tours": "Қазіргі уақытта қолжетімді турлар жоқ.",
    "tours.show_more": "Барлық турларды көру",
    "tours.show_less": "Жасыру",
    "footer.rights": "Барлық құқықтар қорғалған.",
    "footer.title": "Байланыс",
    "footer.socials": "Біз әлеуметтік желілердеміз",
    "form.title": "Өтінім қалдыру",
    "form.name": "Сіздің атыңыз",
    "form.phone": "Телефон",
    "form.message": "Хабарлама",
    "form.submit": "Өтінім жіберу",
    "form.sending": "Жіберілуде...",
    "modal.book": "Орын брондау",
    "modal.price": "Бағасы",
    "modal.per_person": "* Баға бір адамға есептелген",
    "modal.included": "Турға кіретіні:",
    "modal.flight": "Авиабилеттер",
    "modal.visa": "Визалық қолдау",
    "modal.food": "Тамақтану",
    "modal.transfer": "Трансфер",
    "modal.ziyarat": "Зиярат",
    "modal.guide": "Тәжірибелі гид",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  const t = (key: string) => {
    return (
      translations[language][key as keyof (typeof translations)["ru"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
