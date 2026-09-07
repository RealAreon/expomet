export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalDoc = {
  crumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  sourceNote: string;
  sections: LegalSection[];
};

export const privacyContent: Record<"en" | "uk", LegalDoc> = {
  uk: {
    crumb: "Політика конфіденційності",
    eyebrow: "Юридична інформація",
    title: "Політика конфіденційності",
    intro:
      "Компанія Експомет зобов’язується інформувати своїх користувачів про те, як вона використовує інформацію, що надходить на сайт https://expomet.ua/ (сайт). Використовуючи наш сайт або отримуючи будь-який продукт чи послугу через нього, ви даєте свою згоду на збирання та використання нами вашої інформації в порядку, передбаченому цією політикою конфіденційності. Якщо ви не погоджуєтесь з цією політикою, будь ласка, не використовуйте веб-сайт.",
    sourceNote:
      "Текст підготовлено на основі політики конфіденційності компанії «Експомет Плюс»: expomet.ua/privacy-policy. Ця сторінка також поширюється на сайт, яким ви користуєтеся зараз.",
    sections: [
      {
        title: "Зібрана нами інформація та її використання",
        paragraphs: [
          "Щоб якнайкраще надати вам продукти та послуги, веб-сайтом компанії збирає два типи інформації: інформація особистого та неособистого характеру.",
          "Особиста інформація: до особистої інформації належить інформація, що дозволяє нам детально дізнатися про те, ким ви є, і яка може бути використана для встановлення вашої особи, зв’язку з вами або для визначення вашого розташування. Навіть у разі відмови подати свою особисту інформацію ви матимете можливість доступу до більшої частини нашого сайту. Компанія «Експомет» використовує вашу особисту інформацію для надання послуг, здійснення своєї діяльності, а також для покращення досвіду користувачів на нашому веб-сайті.",
          "Інформація неособистого характеру: до інформації неособистого характеру належить інформація, що не ідентифікує певну особу незалежно від або в сукупності з іншою інформацією неособистого характеру. Компанія «Експомет» може збирати інформацію неособистого характеру за допомогою файлів cookie.",
        ],
      },
      {
        title: "Файли cookie",
        paragraphs: [
          "1. Сайт використовує файли cookie та аналогічні технології збору даних відстеження для ідентифікації користувачів. Ці технології допомагають нам забезпечувати безперебійний доступ до веб-сайту та використання послуг.",
          "2. Файл cookie – це невеликий файл, що складається з літер та цифр, який сайт зберігає на вашому комп’ютері або пристрої, коли ви відвідуєте веб-сайт. Ви можете погодитись з використанням файлів cookie або відмовитися від них при вході на сайт. Для отримання додаткової інформації про файли cookie рекомендуємо відвідати веб-сайт allaboutcookies.org.",
          "3. На веб-сайті використовуються категорії файлів cookie, наведені нижче. Їх опис допоможе вам зрозуміти, чи хочете ви обмінюватися даними з нашим Веб-сайтом та іншими онлайн-сервісами та яким чином. Повний перелік категорій і керування згодою доступні на сторінці «Файли cookie».",
        ],
      },
      {
        title: "Обмін особистою інформацією з третіми особами",
        paragraphs: [
          "Компанія «Експомет» НЕ передає вашу особисту інформацію третім особам у комерційних цілях і без вашої згоди, за винятком тих випадків, коли компанія «Експомет» має право надати вашу особисту інформацію цим третім особам, наприклад, окремо взятим компаніям-партнерам (узгодження з застосовуваними правовими нормами та правилами) або іншим перевіреним компаніям виключно для того, щоб надати їм можливість надати послугу компанії «Експомет». Діяльність цих сторін може бути безпосередньо пов’язана з діяльністю компанії «Експомет» (у цьому випадку інформація передається конфіденційно та відповідно до всіх зобов’язань щодо забезпечення безпеки особистої інформації).",
          "Забезпечення виконання закону: компанія «Експомет» має право розголошувати особисту інформацію в тому випадку, якщо ми вважаємо, керуючись чесними намірами, що необхідно для дотримання існуючих правових норм, або у відповідь на повістки чи судові ордери, які пред’явлені нам, або для того, щоб захистити або відстояти права, власність чи безпеку наших користувачів, інших осіб чи компанію. Правоохоронні органи або судова влада може вимагати від компанії «Експомет» подати офіційним представникам державної влади особисту інформацію користувачів. Ми також можемо розголошувати особисту інформацію щодо отримання судового ордера чи порядку або з метою сприяння у розслідуванні правоохоронних органів.",
        ],
      },
      {
        title: "Правила інформаційної безпеки",
        paragraphs: [
          "Компанія «Експомет» оптимізує необхідні, з комерційної точки зору, заходи щодо запобігання збору, зміні або знищенню третіми особами інформації, отриманої в розпорядження компанії «Експомет» з цього сайту. Ці заходи включають контроль мережевого потоку для ідентифікації несанкціонованих спроб завантажити або змінити інформацію, а також за певних обставин кодування конфіденційної інформації за допомогою Протоколу безпечних з’єднань Secure Socket Layers – SSL або інших аналогічних технологій.",
          "У компанії також передбачено контроль для запобігання будь-якій незаконній діяльності або діяльності, яка може завдати компанії «Експомет» юридичної відповідальності або заподіяти їй шкоди. Компанія «Експомет» бере на себе зобов’язання щодо безпеки свого веб-сайту. Хоча компанія «Експомет» вживає всіх необхідних, з комерційної точки зору, заходів щодо запобігання збору неуповноваженими та третіми особами особистої інформації користувачів, переданої компанії «Експомет» через даний сайт, незаконні перехоплення або заволодіння інформацією третіми особами все ж таки можливе.",
        ],
      },
    ],
  },
  en: {
    crumb: "Privacy Policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "Expomet undertakes to inform its users how it uses information received on https://expomet.ua/ (the website). By using our website or obtaining any product or service through it, you consent to our collection and use of your information as described in this privacy policy. If you do not agree with this policy, please do not use the website.",
    sourceNote:
      "This text is based on the privacy policy of Expomet Plus published at expomet.ua/privacy-policy. It also applies to the website you are using now.",
    sections: [
      {
        title: "Information we collect and how we use it",
        paragraphs: [
          "To provide products and services as well as possible, the company’s website collects two types of information: personal and non-personal.",
          "Personal information includes information that lets us know who you are and that may be used to identify you, contact you, or determine your location. Even if you refuse to submit personal information, you will still be able to access most of our website. Expomet uses your personal information to provide services, carry on its business, and improve the user experience on our website.",
          "Non-personal information is information that does not identify a specific person, either on its own or together with other non-personal information. Expomet may collect non-personal information using cookies.",
        ],
      },
      {
        title: "Cookies",
        paragraphs: [
          "1. The website uses cookies and similar tracking technologies to identify users. These technologies help us provide uninterrupted access to the website and its services.",
          "2. A cookie is a small file of letters and numbers that the site stores on your computer or device when you visit the website. You may agree to cookies or refuse them when you enter the site. For more information about cookies, we recommend allaboutcookies.org.",
          "3. The website uses the cookie categories described on the Cookie files page. Their descriptions help you understand whether and how you want to share data with our website and other online services. You can manage consent there at any time.",
        ],
      },
      {
        title: "Sharing personal information with third parties",
        paragraphs: [
          "Expomet does NOT transfer your personal information to third parties for commercial purposes and without your consent, except where Expomet is entitled to provide your personal information to such third parties — for example, selected partner companies (in accordance with applicable laws and rules) or other verified companies solely so they can provide a service to Expomet. The activities of these parties may be directly related to Expomet’s activities (in which case the information is transferred confidentially and in accordance with all obligations to keep personal information secure).",
          "Law enforcement: Expomet may disclose personal information if we believe in good faith that it is necessary to comply with applicable legal requirements, or in response to subpoenas or court orders served on us, or to protect or defend the rights, property or safety of our users, other persons or the company. Law-enforcement or judicial authorities may require Expomet to provide users’ personal information to official representatives of public authorities. We may also disclose personal information upon receipt of a court order or for the purpose of assisting a law-enforcement investigation.",
        ],
      },
      {
        title: "Information security rules",
        paragraphs: [
          "Expomet implements commercially reasonable measures to prevent third parties from collecting, altering or destroying information obtained by Expomet from this website. These measures include network-flow monitoring to identify unauthorized attempts to upload or change information and, in certain circumstances, encryption of confidential information using Secure Socket Layers (SSL) or similar technologies.",
          "The company also maintains controls to prevent any illegal activity or activity that could expose Expomet to legal liability or cause it harm. Expomet undertakes to keep its website secure. Although Expomet takes all commercially reasonable measures to prevent unauthorized third parties from collecting users’ personal information submitted to Expomet through this website, unlawful interception or acquisition of information by third parties is still possible.",
        ],
      },
    ],
  },
};

export const cookiesContent: Record<"en" | "uk", LegalDoc> = {
  uk: {
    crumb: "Файли cookie",
    eyebrow: "Юридична інформація",
    title: "Файли cookie",
    intro:
      "Сайт використовує файли cookie та аналогічні технології збору даних відстеження для ідентифікації користувачів. Ці технології допомагають нам забезпечувати безперебійний доступ до веб-сайту та використання послуг.",
    sourceNote:
      "Категорії та описи відповідають політиці компанії «Експомет Плюс» (expomet.ua/privacy-policy). Ви можете змінити свій вибір у будь-який момент.",
    sections: [
      {
        title: "Що таке файл cookie",
        paragraphs: [
          "Файл cookie – це невеликий файл, що складається з літер та цифр, який сайт зберігає на вашому комп’ютері або пристрої, коли ви відвідуєте веб-сайт. Ви можете погодитись з використанням файлів cookie або відмовитися від них при вході на сайт. Для отримання додаткової інформації про файли cookie рекомендуємо відвідати веб-сайт allaboutcookies.org.",
          "На веб-сайті використовуються категорії файлів cookie, наведені нижче. Їх опис допоможе вам зрозуміти, чи хочете ви обмінюватися даними з нашим Веб-сайтом та іншими онлайн-сервісами та яким чином.",
        ],
      },
      {
        title: "Обов’язкові файли cookie",
        paragraphs: [
          "Файли cookie цієї категорії необхідні для того, щоб ви могли пересуватися по різних розділах веб-сайту та використовувати певні функції. Без обов’язкових файлів cookie ви не зможете скористатися онлайновими сервісами, наданими на веб-сайті. Отже, ви не можете відмовитись від використання цієї категорії файлів cookie.",
          "Крім того, мова шифрування веб-сайту використовує сесійні файли cookie. Вони видаляються щоразу, коли ви закриваєте свій браузер. Ці файли cookie не зберігають жодної інформації про відвідувачів після закриття браузера.",
          "На цьому сайті обов’язковий файл expomet_consent зберігає ваш вибір щодо cookie протягом 12 місяців.",
        ],
      },
      {
        title: "Технічні файли cookie",
        paragraphs: [
          "Наші технічні файли cookie зберігають анонімну інформацію про те, як ви використовуєте Сайт та його функції. Наприклад, наші технічні файли cookie збирають інформацію про найчастіше відвідувані вами веб-сайти, огляд рекламних оголошень або оголошень, з якими ви працюєте на веб-сайті або інших веб-сайтах, на яких ми розміщуємо рекламні оголошення, а також інформацію про отримання повідомлень про помилки.",
        ],
      },
      {
        title: "Аналітичні файли cookie",
        paragraphs: [
          "На нашому веб-сайті використовується Google Analytics – аналітичний інтернет-сервіс, наданий Google Inc. (далі Google). Google Analytics використовує «файли cookie», які є текстовими файлами на вашому комп’ютері і допомагають нам аналізувати тенденції використання Веб-сайту користувачами. Інформація про використання Веб-сайту (зокрема вашу IP-адресу), збережена у файлі cookie, передається та зберігається Google на серверах у США.",
          "У разі підключення функції прихованої IP-адреси Google відсікає/анонімізує останній октет IP-адрес для країн-членів Європейського Союзу та інших сторін угоди про створення Європейської економічної зони. Повні IP-адреси, які потім скорочуються на серверах Google у США, ми надсилаємо лише у виняткових випадках. Google від нашого імені використовує отриману інформацію для оцінки характеру використання Веб-сайту, складає для нас звіти про дії користувачів на веб-сайті та надає інші послуги, пов’язані з аналізом дій на сайті та використанням інтернету. Google не прив’язує вашу IP-адресу до будь-яких інших даних, що зберігаються в Google.",
          "Веб-сайт може використовувати інші аналітичні файли cookie. Такі файли cookie використовуються для отримання інформації про використання веб-сайту користувачами. Інформація збирається в анонімному порядку та використовується для складання звітів про кількість відвідувачів веб-сайту, їх місцезнаходження, а також про відвідані ними сторінки. Аналітичні скрипти на цьому сайті завантажуються лише після вашої згоди.",
        ],
      },
      {
        title: "Функціональні файли cookie",
        paragraphs: [
          "Функціональні файли cookie використовуються для запам’ятовування ваших уподобань (наприклад, потрібної мови, країни або інших онлайн налаштувань) та збору анонімної інформації.",
          "Історія розрахунків калькулятора зберігається локально у вашому браузері (localStorage) і використовується лише на вашому пристрої.",
        ],
      },
      {
        title: "Адресні чи рекламні файли cookie",
        paragraphs: [
          "Сторонні рекламодавці, рекламні мережі, постачальники послуг обміну даними, аналітичні маркетингові системи та інші послуги можуть зберігати на пристрої незалежні адресні рекламні файли cookie. Незалежні адресні рекламні файли cookie збирають інформацію про відвідувані вами сторінки різних веб-сайтів та онлайн-сервісів, щоб показати вам відповідні рекламні оголошення на сайтах та в онлайн-сервісах третіх сторін. Рекламні мережі можуть надсилати інформацію рекламодавцям за допомогою своїх мереж.",
          "Інформація, отримана за допомогою таких незалежних рекламних файлів cookie, не містить даних, що дозволяють встановити вашу особу, але використовується для ідентифікації користувачів на різних веб-сайтах. Якщо ви хочете заборонити нам або третім сторонам використовувати файли cookie, ви можете змінити налаштування вашого браузера та відмовитись від них. Оскільки у різних браузерах використовуються різні функції відмовитися від використання файлів cookie, зайдіть у меню «Довідка» вашого інтернет-браузера і дізнайтесь більше. Якщо ви відмовляєтеся від використання нами файлів cookie, це може вплинути на роботу окремих функцій та послуг веб-сайту.",
        ],
      },
    ],
  },
  en: {
    crumb: "Cookie files",
    eyebrow: "Legal",
    title: "Cookie files",
    intro:
      "The website uses cookies and similar tracking technologies to identify users. These technologies help us provide uninterrupted access to the website and its services.",
    sourceNote:
      "Categories and descriptions follow the Expomet Plus policy at expomet.ua/privacy-policy. You can change your choice at any time.",
    sections: [
      {
        title: "What a cookie is",
        paragraphs: [
          "A cookie is a small file of letters and numbers that the site stores on your computer or device when you visit the website. You may agree to cookies or refuse them when you enter the site. For more information about cookies, we recommend allaboutcookies.org.",
          "The website uses the cookie categories below. Their descriptions help you understand whether and how you want to share data with our website and other online services.",
        ],
      },
      {
        title: "Necessary cookies",
        paragraphs: [
          "Cookies in this category are required so you can move between sections of the website and use certain features. Without necessary cookies you will not be able to use the online services provided on the website. You therefore cannot refuse this category of cookies.",
          "In addition, the website language encryption uses session cookies. They are deleted each time you close your browser. These cookies do not store any visitor information after the browser is closed.",
          "On this website the necessary cookie expomet_consent stores your cookie choices for 12 months.",
        ],
      },
      {
        title: "Technical cookies",
        paragraphs: [
          "Our technical cookies store anonymous information about how you use the Site and its features. For example, they collect information about the pages you visit most often, advertising you view or interact with on the website or other websites where we place ads, and information about error messages.",
        ],
      },
      {
        title: "Analytics cookies",
        paragraphs: [
          "Our website uses Google Analytics, an internet analytics service provided by Google Inc. (Google). Google Analytics uses cookies, which are text files on your computer, to help us analyse how users use the Website. Information about Website use (including your IP address) stored in the cookie is transmitted to and stored by Google on servers in the United States.",
          "If IP anonymisation is enabled, Google truncates/anonymises the last octet of IP addresses for EU member states and other parties to the EEA agreement. Full IP addresses, which are then shortened on Google servers in the US, are sent only in exceptional cases. Google uses the information received on our behalf to evaluate how the Website is used, compile reports for us on user activity, and provide other services related to website activity and internet use. Google does not associate your IP address with any other data held by Google.",
          "The website may use other analytics cookies. Such cookies are used to obtain information about how users use the website. Information is collected anonymously and used to compile reports on visitor numbers, location, and pages visited. Analytics scripts on this website load only after your consent.",
        ],
      },
      {
        title: "Functional cookies",
        paragraphs: [
          "Functional cookies are used to remember your preferences (for example language, country or other online settings) and to collect anonymous information.",
          "Calculator history is stored locally in your browser (localStorage) and is used only on your device.",
        ],
      },
      {
        title: "Targeted or advertising cookies",
        paragraphs: [
          "Third-party advertisers, advertising networks, data-exchange providers, analytics marketing systems and other services may store independent targeted advertising cookies on your device. Independent targeted advertising cookies collect information about pages you visit on various websites and online services in order to show you relevant ads on third-party sites and services. Advertising networks may send information to advertisers through their networks.",
          "Information obtained through such independent advertising cookies does not contain data that would identify you, but is used to recognise users across websites. If you want to prevent us or third parties from using cookies, you can change your browser settings and refuse them. Because browsers use different opt-out features, open your browser’s Help menu to learn more. If you refuse our use of cookies, some website features and services may be affected.",
        ],
      },
    ],
  },
};
