/**
 * Authoritative Style Compass scoring model.
 * Source: "Magnifier Style Compass — содержание и логика v0.1".
 *
 * Loaded only when a complete selection is reviewed.
 */
export const styleCompassModel = {
  "version": "0.1.0",
  "status": "editorial_prototype_not_validated",
  "date": "2026-09-22",
  "language": "en-GB",
  "style_order": [
    "WC",
    "AM",
    "OM",
    "JA",
    "AD",
    "PA",
    "EH",
    "MC",
    "CO",
    "ME",
    "MM",
    "EC"
  ],
  "weights": {
    "colour": 0.2,
    "form": 0.35,
    "texture": 0.3,
    "feeling": 0.15
  },
  "thresholds": {
    "min_top_score": 0.6,
    "close_gap": 0.1,
    "secondary_min_score": 0.65
  },
  "styles": [
    {
      "id": "WC",
      "name": "Warm Contemporary",
      "ru": "Тёплый современный",
      "signature": "Чистая композиция, комфортные округления, аккуратная отделка.",
      "boundary": "В отличие от Organic Modern: меньше необработанных поверхностей и природной нерегулярности.",
      "result_en": "You are drawn to a contemporary interior with comfortable proportions, tactile finishes and a sense of ease.",
      "features_ru": "Мягкий диван простой формы; ровная столярка; спокойный камень; направленный и рассеянный свет."
    },
    {
      "id": "AM",
      "name": "Architectural Modern",
      "ru": "Архитектурный modern",
      "signature": "Прямые линии, ясные объёмы, визуальный порядок, минимум декора.",
      "boundary": "Modern здесь — конкретный язык геометрии, а не синоним всего нового. Это рабочее название категории, не историческая классификация.",
      "result_en": "Your choices point towards clear geometry, deliberate contrasts and an uncluttered architectural space.",
      "features_ru": "Линейная мебель; встроенное хранение; выразительные плоскости; контролируемые стыки материалов."
    },
    {
      "id": "OM",
      "name": "Organic Modern",
      "ru": "Природный современный",
      "signature": "Свободные органические формы, выразительный натуральный материал, тактильность.",
      "boundary": "В отличие от Japandi: более скульптурный и материально выразительный; не обязательно минималистичный.",
      "result_en": "You are drawn to sculptural forms and natural surfaces that bring warmth and texture to a modern space.",
      "features_ru": "Свободные контуры; дерево с видимой фактурой; матовый камень; штукатурка."
    },
    {
      "id": "JA",
      "name": "Japandi",
      "ru": "Japandi",
      "signature": "Низкие спокойные формы, лёгкость, сдержанная палитра, ремесленные детали.",
      "boundary": "Не обозначает всю японскую или скандинавскую традицию; отдельная современная гибридная категория.",
      "result_en": "Your choices suggest a preference for quiet proportions, restrained detail and tactile natural materials.",
      "features_ru": "Низкая мебель; свободное пространство; матовое дерево; бумажный рассеянный свет."
    },
    {
      "id": "AD",
      "name": "Modern Art Deco",
      "ru": "Современный ар-деко",
      "signature": "Ритм, ступенчатая геометрия, симметрия, контраст матового и блестящего.",
      "boundary": "Не сводить к золоту, чёрному цвету или показной роскоши.",
      "result_en": "You are drawn to rhythmic geometry, rich material contrasts and a composed sense of occasion.",
      "features_ru": "Ритмичные фасады; сильный силуэт; рифлёное стекло; дозированный металлический акцент."
    },
    {
      "id": "PA",
      "name": "Contemporary Parisian",
      "ru": "Современный парижский",
      "signature": "Классические детали рядом с современной мебелью и искусством.",
      "boundary": "В v1 объединяет Parisian и Contemporary Parisian. Историческая архитектура не обязательное условие реализации.",
      "result_en": "Your choices bring together classical detail, contemporary silhouettes and a collected, personal character.",
      "features_ru": "Тонкий классический профиль; современный предмет; винтажный акцент; искусство."
    },
    {
      "id": "EH",
      "name": "English Heritage",
      "ru": "Английская классика с живым характером",
      "signature": "Классические профили, многослойность ткани и узора, патина, камерность.",
      "boundary": "В отличие от Modern Country: больше традиционных деталей и рисунка, меньше грубой сельской простоты.",
      "result_en": "You are drawn to familiar forms, layered textiles and interiors that feel collected over time.",
      "features_ru": "Классическое кресло; шерсть и узор; патинированное дерево; локальный свет."
    },
    {
      "id": "MC",
      "name": "Modern Country",
      "ru": "Современный загородный",
      "signature": "Простые добротные формы, ручная фактура, практичный уют.",
      "boundary": "Country — не один национальный стиль. Здесь задана конкретная современная трактовка без обязательной сельской локации.",
      "result_en": "Your choices suggest an easy, welcoming interior with honest materials and a relaxed everyday character.",
      "features_ru": "Простой деревянный стол; лён; керамика; открытая фактура; удобная мягкая мебель."
    },
    {
      "id": "CO",
      "name": "Relaxed Coastal",
      "ru": "Сдержанный прибрежный",
      "signature": "Воздух, мягкие формы, лёгкое плетение, спокойные материалы.",
      "boundary": "Не требует синего цвета, ракушек, морских полос или дома у моря.",
      "result_en": "You are drawn to an airy, relaxed interior with soft textures and a light, unhurried atmosphere.",
      "features_ru": "Лёгкая мягкая мебель; лён; плетение; светлая основа; свободные проходы."
    },
    {
      "id": "ME",
      "name": "Mediterranean",
      "ru": "Современный средиземноморский",
      "signature": "Арки и ниши, пластичные объёмы, минеральные поверхности, глина.",
      "boundary": "В отличие от Coastal: более массивная пластика и выраженное ремесленное качество. Не общий ярлык для всех жарких стран.",
      "result_en": "Your choices lean towards sculpted architectural forms, mineral textures and a relaxed, sun-warmed character.",
      "features_ru": "Пластичные ниши; известковая фактура; керамика; матовый камень; тёплое дерево."
    },
    {
      "id": "MM",
      "name": "Mid-century Modern",
      "ru": "Модернизм середины XX века в современной трактовке",
      "signature": "Облегчённые и сужающиеся опоры, выразительный функциональный силуэт.",
      "boundary": "Не любой интерьер с ретромебелью. Не привязывать к одному десятилетию во всех странах.",
      "result_en": "You are drawn to expressive, functional furniture, warm material combinations and a subtle sense of play.",
      "features_ru": "Мебель на тонких опорах; тёплое дерево; кожа или ткань; графичный светильник."
    },
    {
      "id": "EC",
      "name": "Collected Eclectic",
      "ru": "Продуманная эклектика",
      "signature": "Осмысленное сочетание эпох, предметов, рисунка и контрастов.",
      "boundary": "Не запасная категория для противоречивых ответов. Получает баллы только за положительный выбор сочетаний и выразительности.",
      "result_en": "You are drawn to a personal mix of periods, textures and objects, held together by thoughtful contrasts.",
      "features_ru": "Сочетание винтажного и современного; один выразительный узор; личные предметы; повторяющийся цвет или форма."
    }
  ],
  "options": [
    {
      "id": "C01",
      "category": "colour",
      "label": "Chalk & Oat",
      "ru": "Мел и овёс",
      "brief": "Светлая тёплая нейтральная палитра; без стерильного белого.",
      "scores": {
        "WC": 3,
        "AM": 2,
        "OM": 3,
        "JA": 3,
        "PA": 2,
        "MC": 3,
        "CO": 3,
        "ME": 2
      },
      "hex": [
        "#F1EDE5",
        "#D8CDBB",
        "#B9A78E",
        "#756858"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C02",
      "category": "colour",
      "label": "Stone & Ink",
      "ru": "Камень и чернила",
      "brief": "Светлая минеральная основа и тёмный графичный акцент.",
      "scores": {
        "WC": 2,
        "AM": 3,
        "OM": 1,
        "JA": 2,
        "AD": 3,
        "PA": 3,
        "EH": 1,
        "MM": 2,
        "EC": 1
      },
      "hex": [
        "#E7E4DD",
        "#B6B2AC",
        "#777773",
        "#292D30"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C03",
      "category": "colour",
      "label": "Olive & Oat",
      "ru": "Оливковый и овёс",
      "brief": "Приглушённый оливковый с тёплым светлым фоном.",
      "scores": {
        "WC": 2,
        "OM": 3,
        "JA": 2,
        "EH": 3,
        "MC": 3,
        "CO": 1,
        "ME": 2,
        "MM": 2,
        "EC": 1
      },
      "hex": [
        "#E9E1D2",
        "#C5B896",
        "#777B50",
        "#444B35"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C04",
      "category": "colour",
      "label": "Burgundy & Blush",
      "ru": "Бордовый и пудровый",
      "brief": "Глубокий винный, пыльно-розовый, сливочная основа. Marsala можно исследовать как более землистый вариант бордовой семьи.",
      "scores": {
        "WC": 2,
        "AD": 3,
        "PA": 3,
        "EH": 3,
        "MC": 1,
        "MM": 2,
        "EC": 3
      },
      "hex": [
        "#EEE0D4",
        "#C9A2A0",
        "#82454E",
        "#482B33"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C05",
      "category": "colour",
      "label": "Cocoa & Cream",
      "ru": "Какао и сливочный",
      "brief": "Шоколадный с карамельным и светлым тёплым фоном.",
      "scores": {
        "WC": 3,
        "AM": 2,
        "OM": 2,
        "JA": 2,
        "AD": 3,
        "PA": 2,
        "EH": 3,
        "MC": 2,
        "MM": 3,
        "EC": 2
      },
      "hex": [
        "#EEE4D6",
        "#C6A986",
        "#886344",
        "#42342C"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C06",
      "category": "colour",
      "label": "Clay & Sand",
      "ru": "Глина и песок",
      "brief": "Минеральные тёплые оттенки, от песочного до обожжённой глины.",
      "scores": {
        "WC": 1,
        "OM": 3,
        "JA": 1,
        "MC": 3,
        "CO": 2,
        "ME": 3,
        "MM": 2,
        "EC": 2
      },
      "hex": [
        "#EEE0C9",
        "#D0AD84",
        "#AD6D50",
        "#754B3B"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C07",
      "category": "colour",
      "label": "Sea Glass & Mist",
      "ru": "Морское стекло и туман",
      "brief": "Светлые прохладные зелёно-голубые тона без морской символики.",
      "scores": {
        "WC": 2,
        "AM": 1,
        "OM": 1,
        "JA": 2,
        "PA": 1,
        "MC": 1,
        "CO": 3,
        "ME": 2,
        "MM": 1,
        "EC": 1
      },
      "hex": [
        "#EEF0E9",
        "#C9D8D0",
        "#90B3AC",
        "#547D80"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C08",
      "category": "colour",
      "label": "Ink Blue & Linen",
      "ru": "Чернильно-синий и лён",
      "brief": "Глубокий синий в сочетании с молочным и льняным.",
      "scores": {
        "WC": 2,
        "AM": 2,
        "AD": 2,
        "PA": 3,
        "EH": 3,
        "MC": 2,
        "CO": 3,
        "ME": 1,
        "MM": 2,
        "EC": 2
      },
      "hex": [
        "#EEE9DC",
        "#C2B99E",
        "#657C8B",
        "#273D55"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C09",
      "category": "colour",
      "label": "Butter & Cornflower",
      "ru": "Сливочно-жёлтый и васильковый",
      "brief": "Мягкий жёлтый и голубой, сбалансированные нейтральным.",
      "scores": {
        "WC": 2,
        "PA": 2,
        "EH": 2,
        "MC": 2,
        "CO": 2,
        "ME": 1,
        "MM": 3,
        "EC": 3
      },
      "hex": [
        "#F3EDDE",
        "#E8D889",
        "#99ACD0",
        "#64799D"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C10",
      "category": "colour",
      "label": "Pistachio & Rose",
      "ru": "Фисташковый и розовый",
      "brief": "Приглушённые светлые зелёный и розовый без детской стилизации.",
      "scores": {
        "WC": 2,
        "OM": 1,
        "JA": 1,
        "AD": 1,
        "PA": 3,
        "EH": 1,
        "MC": 1,
        "CO": 1,
        "ME": 1,
        "MM": 2,
        "EC": 3
      },
      "hex": [
        "#EEE9DB",
        "#C7CEA7",
        "#D8B5AD",
        "#8B9171"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C11",
      "category": "colour",
      "label": "Petrol & Brass",
      "ru": "Петрольный и латунный",
      "brief": "Глубокий сине-зелёный; приглушённый охристо-металлический акцент.",
      "scores": {
        "WC": 2,
        "AM": 2,
        "AD": 3,
        "PA": 2,
        "EH": 2,
        "MM": 3,
        "EC": 3
      },
      "hex": [
        "#E6DAC4",
        "#54716C",
        "#213F44",
        "#AF8A50"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "C12",
      "category": "colour",
      "label": "Cobalt & Vermilion",
      "ru": "Кобальтовый и киноварь",
      "brief": "Ясные выразительные акценты на спокойной основе; альтернатива только нейтральным вариантам.",
      "scores": {
        "AM": 3,
        "AD": 1,
        "PA": 1,
        "MM": 3,
        "EC": 3
      },
      "hex": [
        "#ECE6D9",
        "#284C9A",
        "#C4533E",
        "#D0AC57"
      ],
      "asset_status": "to_produce"
    },
    {
      "id": "F01",
      "category": "form",
      "label": "Clean Lines",
      "ru": "Чистые линии",
      "brief": "Прямоугольные объёмы, чёткий контур, ровная плоскость; без фактур и декора.",
      "scores": {
        "WC": 2,
        "AM": 3,
        "JA": 2,
        "AD": 1,
        "PA": 1,
        "CO": 1,
        "MM": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F02",
      "category": "form",
      "label": "Soft & Tailored",
      "ru": "Мягко очерченные формы",
      "brief": "Аккуратные округлённые углы, мягкая мебель с ясным силуэтом; не бесформенные облака.",
      "scores": {
        "WC": 3,
        "OM": 2,
        "AD": 1,
        "PA": 2,
        "EH": 1,
        "MC": 2,
        "CO": 3,
        "ME": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F03",
      "category": "form",
      "label": "Organic Sculpture",
      "ru": "Органическая скульптура",
      "brief": "Асимметричные плавные контуры, подобные гальке или природному срезу.",
      "scores": {
        "WC": 2,
        "OM": 3,
        "JA": 1,
        "CO": 1,
        "ME": 2,
        "MM": 1,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F04",
      "category": "form",
      "label": "Low & Quiet",
      "ru": "Низкие и спокойные",
      "brief": "Низкий профиль, простые тонкие соединения, много воздуха вокруг формы.",
      "scores": {
        "WC": 1,
        "AM": 2,
        "OM": 2,
        "JA": 3,
        "CO": 1,
        "MM": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F05",
      "category": "form",
      "label": "Rhythm & Symmetry",
      "ru": "Ритм и симметрия",
      "brief": "Ступенчатые контуры, повторяемые вертикали, геометрические дуги, собранная симметрия.",
      "scores": {
        "WC": 1,
        "AM": 2,
        "AD": 3,
        "PA": 2,
        "EH": 1,
        "EC": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F06",
      "category": "form",
      "label": "Classic Meets New",
      "ru": "Классика рядом с новым",
      "brief": "Пара нейтральных силуэтов: классический профиль рядом с лаконичным современным предметом.",
      "scores": {
        "WC": 1,
        "AD": 1,
        "PA": 3,
        "EH": 2,
        "MC": 1,
        "EC": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F07",
      "category": "form",
      "label": "Traditional Detail",
      "ru": "Традиционные детали",
      "brief": "Точёная опора, выраженный профиль, классический подлокотник; одинаковый масштаб предметов.",
      "scores": {
        "PA": 2,
        "EH": 3,
        "MC": 2,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F08",
      "category": "form",
      "label": "Honest & Sturdy",
      "ru": "Простые и добротные",
      "brief": "Устойчивая простая конструкция, читаемые соединения, широкая опора без орнамента.",
      "scores": {
        "OM": 2,
        "JA": 1,
        "EH": 1,
        "MC": 3,
        "CO": 2,
        "ME": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F09",
      "category": "form",
      "label": "Arches & Niches",
      "ru": "Арки и ниши",
      "brief": "Пластичные архитектурные проёмы и встроенные объёмы с мягким переходом.",
      "scores": {
        "WC": 1,
        "OM": 2,
        "AD": 1,
        "PA": 1,
        "CO": 2,
        "ME": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "F10",
      "category": "form",
      "label": "Light & Tapered",
      "ru": "Лёгкие и сужающиеся",
      "brief": "Тонкие сужающиеся опоры, приподнятый корпус, функциональный графичный силуэт.",
      "scores": {
        "WC": 1,
        "AM": 2,
        "JA": 2,
        "CO": 1,
        "MM": 3,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T01",
      "category": "texture",
      "label": "Linen & Open Weave",
      "ru": "Лён и открытое плетение",
      "brief": "Крупный план сухой ткани и лёгкого плетения: видимый рельеф, матовость.",
      "scores": {
        "WC": 2,
        "OM": 2,
        "JA": 2,
        "MC": 2,
        "CO": 3,
        "ME": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T02",
      "category": "texture",
      "label": "Fine Grain & Paper",
      "ru": "Тонкое дерево и бумага",
      "brief": "Ровное матовое дерево и полупрозрачная волокнистая бумага.",
      "scores": {
        "WC": 1,
        "AM": 1,
        "OM": 2,
        "JA": 3,
        "CO": 1,
        "MM": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T03",
      "category": "texture",
      "label": "Raw Stone & Plaster",
      "ru": "Камень и штукатурка",
      "brief": "Пористая минеральная фактура и неровная ручная штукатурка; без декора комнаты.",
      "scores": {
        "WC": 1,
        "AM": 1,
        "OM": 3,
        "JA": 2,
        "MC": 2,
        "CO": 2,
        "ME": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T04",
      "category": "texture",
      "label": "Smooth & Precise",
      "ru": "Гладко и точно",
      "brief": "Матовая ровная поверхность, стекло и шлифованный металл; акцент на обработке.",
      "scores": {
        "WC": 2,
        "AM": 3,
        "AD": 2,
        "PA": 1,
        "MM": 2,
        "EC": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T05",
      "category": "texture",
      "label": "Velvet & Fluted Glass",
      "ru": "Бархат и рифлёное стекло",
      "brief": "Мягкий ворс рядом с регулярным стеклянным рельефом и небольшим металлическим акцентом.",
      "scores": {
        "WC": 1,
        "AD": 3,
        "PA": 2,
        "EH": 2,
        "MM": 1,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T06",
      "category": "texture",
      "label": "Patina & Fine Detail",
      "ru": "Патина и тонкая отделка",
      "brief": "Состаренное дерево, мягкий металлический блеск, тонкая ткань; без пышной формы.",
      "scores": {
        "AD": 1,
        "PA": 3,
        "EH": 3,
        "MC": 1,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T07",
      "category": "texture",
      "label": "Rustic Grain & Clay",
      "ru": "Дерево с фактурой и глина",
      "brief": "Нерегулярный древесный рисунок и матовая ручная керамика.",
      "scores": {
        "OM": 3,
        "JA": 2,
        "EH": 1,
        "MC": 3,
        "CO": 2,
        "ME": 3,
        "MM": 1,
        "EC": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T08",
      "category": "texture",
      "label": "Wood & Supple Leather",
      "ru": "Дерево и мягкая кожа",
      "brief": "Гладко обработанное дерево и пластичная кожа с естественным мелким зерном.",
      "scores": {
        "WC": 2,
        "AM": 2,
        "OM": 1,
        "AD": 1,
        "EH": 2,
        "MC": 1,
        "MM": 3,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T09",
      "category": "texture",
      "label": "Soft Wool & Honed Stone",
      "ru": "Мягкая шерсть и матовый камень",
      "brief": "Тонкая шерстяная фактура рядом с ровным матовым камнем; спокойный тактильный контраст.",
      "scores": {
        "WC": 3,
        "AM": 2,
        "OM": 2,
        "JA": 2,
        "PA": 2,
        "EH": 1,
        "CO": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "T10",
      "category": "texture",
      "label": "Layered Pattern",
      "ru": "Многослойный рисунок",
      "brief": "Сочетание двух текстильных рисунков: графика и органический мотив. Это поверхность вместе с рисунком, не только физическая текстура.",
      "scores": {
        "AD": 1,
        "PA": 2,
        "EH": 3,
        "MC": 2,
        "MM": 2,
        "EC": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H01",
      "category": "feeling",
      "label": "Morning Light",
      "ru": "Светлое утро",
      "brief": "Open & uplifting. Лёгкость, простор, мягкий дневной свет; без моря или конкретного стиля мебели.",
      "scores": {
        "WC": 3,
        "AM": 1,
        "OM": 2,
        "JA": 2,
        "PA": 2,
        "MC": 2,
        "CO": 3,
        "ME": 2,
        "MM": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H02",
      "category": "feeling",
      "label": "Quiet Retreat",
      "ru": "Тихое убежище",
      "brief": "Still & uncluttered. Минимум визуальных раздражителей, ровный свет, ощущение паузы.",
      "scores": {
        "WC": 2,
        "AM": 2,
        "OM": 2,
        "JA": 3,
        "CO": 2,
        "ME": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H03",
      "category": "feeling",
      "label": "Grounded Nature",
      "ru": "Близость к природе",
      "brief": "Rooted & tactile. Ощущение естественности, тени листвы, телесная тактильность.",
      "scores": {
        "WC": 1,
        "OM": 3,
        "JA": 2,
        "MC": 2,
        "CO": 1,
        "ME": 2,
        "MM": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H04",
      "category": "feeling",
      "label": "Evening Glow",
      "ru": "Тёплый вечер",
      "brief": "Intimate & enveloping. Локальный тёплый свет, камерность, мягкий переход света и тени.",
      "scores": {
        "WC": 2,
        "OM": 1,
        "AD": 3,
        "PA": 2,
        "EH": 3,
        "MC": 1,
        "MM": 2,
        "EC": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H05",
      "category": "feeling",
      "label": "Refined Gathering",
      "ru": "Элегантная встреча",
      "brief": "Poised & sociable. Собранная, праздничная, но не чрезмерно формальная атмосфера.",
      "scores": {
        "WC": 2,
        "AM": 1,
        "AD": 3,
        "PA": 3,
        "EH": 2,
        "MM": 1,
        "EC": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H06",
      "category": "feeling",
      "label": "Lived-in Comfort",
      "ru": "Обжитой уют",
      "brief": "Familiar & welcoming. Непринуждённость, удобство, приглашение устроиться надолго.",
      "scores": {
        "WC": 2,
        "OM": 1,
        "PA": 1,
        "EH": 3,
        "MC": 3,
        "CO": 2,
        "ME": 1,
        "MM": 2,
        "EC": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H07",
      "category": "feeling",
      "label": "Sunlit Escape",
      "ru": "Солнечная передышка",
      "brief": "Relaxed & unhurried. Расслабленность, мягкие тени, ощущение свободного времени; без туристической символики.",
      "scores": {
        "WC": 1,
        "OM": 2,
        "JA": 1,
        "MC": 2,
        "CO": 3,
        "ME": 3,
        "MM": 1
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H08",
      "category": "feeling",
      "label": "Creative Energy",
      "ru": "Творческая энергия",
      "brief": "Playful & unexpected. Подвижный ритм и неожиданные сочетания; без обязательного яркого цвета.",
      "scores": {
        "WC": 1,
        "AM": 1,
        "AD": 2,
        "PA": 2,
        "MM": 3,
        "EC": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H09",
      "category": "feeling",
      "label": "Clear Focus",
      "ru": "Ясность и порядок",
      "brief": "Ordered & precise. Понятная структура, простор для внимания, отсутствие лишнего.",
      "scores": {
        "WC": 2,
        "AM": 3,
        "OM": 1,
        "JA": 3,
        "AD": 1,
        "MM": 2
      },
      "hex": [],
      "asset_status": "to_produce"
    },
    {
      "id": "H10",
      "category": "feeling",
      "label": "Collected Stories",
      "ru": "Предметы с историей",
      "brief": "Personal & nostalgic. Обжитость, узнаваемые следы времени, личный характер без постановочной роскоши.",
      "scores": {
        "AD": 1,
        "PA": 3,
        "EH": 3,
        "MC": 2,
        "MM": 3,
        "EC": 3
      },
      "hex": [],
      "asset_status": "to_produce"
    }
  ]
} as const;
