import type { StyleCompassCategory } from "@/features/style-compass/domain/types";

/**
 * Lightweight UI catalogue. Scoring stays in a separate lazy-loaded module.
 */
export const STYLE_COMPASS_VERSION = "0.1.0" as const;

export const styleCompassCategories = [
  {
    "id": "colour",
    "label": "Colour",
    "question": "Which colour palette would you enjoy living with?",
    "hint": "Choose the combination, not just one favourite colour.",
    "tone": "sand",
    "shape": "square",
    "options": [
      {
        "id": "C01",
        "category": "colour",
        "label": "Chalk & Oat",
        "brief": "Светлая тёплая нейтральная палитра; без стерильного белого.",
        "hex": [
          "#F1EDE5",
          "#D8CDBB",
          "#B9A78E",
          "#756858"
        ],
        "media": null
      },
      {
        "id": "C02",
        "category": "colour",
        "label": "Stone & Ink",
        "brief": "Светлая минеральная основа и тёмный графичный акцент.",
        "hex": [
          "#E7E4DD",
          "#B6B2AC",
          "#777773",
          "#292D30"
        ],
        "media": null
      },
      {
        "id": "C03",
        "category": "colour",
        "label": "Olive & Oat",
        "brief": "Приглушённый оливковый с тёплым светлым фоном.",
        "hex": [
          "#E9E1D2",
          "#C5B896",
          "#777B50",
          "#444B35"
        ],
        "media": null
      },
      {
        "id": "C04",
        "category": "colour",
        "label": "Burgundy & Blush",
        "brief": "Глубокий винный, пыльно-розовый, сливочная основа. Marsala можно исследовать как более землистый вариант бордовой семьи.",
        "hex": [
          "#EEE0D4",
          "#C9A2A0",
          "#82454E",
          "#482B33"
        ],
        "media": null
      },
      {
        "id": "C05",
        "category": "colour",
        "label": "Cocoa & Cream",
        "brief": "Шоколадный с карамельным и светлым тёплым фоном.",
        "hex": [
          "#EEE4D6",
          "#C6A986",
          "#886344",
          "#42342C"
        ],
        "media": null
      },
      {
        "id": "C06",
        "category": "colour",
        "label": "Clay & Sand",
        "brief": "Минеральные тёплые оттенки, от песочного до обожжённой глины.",
        "hex": [
          "#EEE0C9",
          "#D0AD84",
          "#AD6D50",
          "#754B3B"
        ],
        "media": null
      },
      {
        "id": "C07",
        "category": "colour",
        "label": "Sea Glass & Mist",
        "brief": "Светлые прохладные зелёно-голубые тона без морской символики.",
        "hex": [
          "#EEF0E9",
          "#C9D8D0",
          "#90B3AC",
          "#547D80"
        ],
        "media": null
      },
      {
        "id": "C08",
        "category": "colour",
        "label": "Ink Blue & Linen",
        "brief": "Глубокий синий в сочетании с молочным и льняным.",
        "hex": [
          "#EEE9DC",
          "#C2B99E",
          "#657C8B",
          "#273D55"
        ],
        "media": null
      },
      {
        "id": "C09",
        "category": "colour",
        "label": "Butter & Cornflower",
        "brief": "Мягкий жёлтый и голубой, сбалансированные нейтральным.",
        "hex": [
          "#F3EDDE",
          "#E8D889",
          "#99ACD0",
          "#64799D"
        ],
        "media": null
      },
      {
        "id": "C10",
        "category": "colour",
        "label": "Pistachio & Rose",
        "brief": "Приглушённые светлые зелёный и розовый без детской стилизации.",
        "hex": [
          "#EEE9DB",
          "#C7CEA7",
          "#D8B5AD",
          "#8B9171"
        ],
        "media": null
      },
      {
        "id": "C11",
        "category": "colour",
        "label": "Petrol & Brass",
        "brief": "Глубокий сине-зелёный; приглушённый охристо-металлический акцент.",
        "hex": [
          "#E6DAC4",
          "#54716C",
          "#213F44",
          "#AF8A50"
        ],
        "media": null
      },
      {
        "id": "C12",
        "category": "colour",
        "label": "Cobalt & Vermilion",
        "brief": "Ясные выразительные акценты на спокойной основе; альтернатива только нейтральным вариантам.",
        "hex": [
          "#ECE6D9",
          "#284C9A",
          "#C4533E",
          "#D0AC57"
        ],
        "media": null
      }
    ]
  },
  {
    "id": "form",
    "label": "Form",
    "question": "Which shapes feel most natural to you?",
    "hint": null,
    "tone": "stone",
    "shape": "arch",
    "options": [
      {
        "id": "F01",
        "category": "form",
        "label": "Clean Lines",
        "brief": "Прямоугольные объёмы, чёткий контур, ровная плоскость; без фактур и декора.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F01.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F02",
        "category": "form",
        "label": "Soft & Tailored",
        "brief": "Аккуратные округлённые углы, мягкая мебель с ясным силуэтом; не бесформенные облака.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F02.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F03",
        "category": "form",
        "label": "Organic Sculpture",
        "brief": "Асимметричные плавные контуры, подобные гальке или природному срезу.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F03.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F04",
        "category": "form",
        "label": "Low & Quiet",
        "brief": "Низкий профиль, простые тонкие соединения, много воздуха вокруг формы.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F04.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F05",
        "category": "form",
        "label": "Rhythm & Symmetry",
        "brief": "Ступенчатые контуры, повторяемые вертикали, геометрические дуги, собранная симметрия.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F05.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F06",
        "category": "form",
        "label": "Classic Meets New",
        "brief": "Пара нейтральных силуэтов: классический профиль рядом с лаконичным современным предметом.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F06.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F07",
        "category": "form",
        "label": "Traditional Detail",
        "brief": "Точёная опора, выраженный профиль, классический подлокотник; одинаковый масштаб предметов.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F07.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F08",
        "category": "form",
        "label": "Honest & Sturdy",
        "brief": "Устойчивая простая конструкция, читаемые соединения, широкая опора без орнамента.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F08.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F09",
        "category": "form",
        "label": "Arches & Niches",
        "brief": "Пластичные архитектурные проёмы и встроенные объёмы с мягким переходом.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F09.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "F10",
        "category": "form",
        "label": "Light & Tapered",
        "brief": "Тонкие сужающиеся опоры, приподнятый корпус, функциональный графичный силуэт.",
        "hex": [],
        "media": {
          "src": "/style-compass/form/F10.avif",
          "status": "to_produce"
        }
      }
    ]
  },
  {
    "id": "texture",
    "label": "Texture",
    "question": "Which surfaces would you like to see and touch around you?",
    "hint": null,
    "tone": "ink",
    "shape": "square",
    "options": [
      {
        "id": "T01",
        "category": "texture",
        "label": "Linen & Open Weave",
        "brief": "Крупный план сухой ткани и лёгкого плетения: видимый рельеф, матовость.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T01.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T02",
        "category": "texture",
        "label": "Fine Grain & Paper",
        "brief": "Ровное матовое дерево и полупрозрачная волокнистая бумага.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T02.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T03",
        "category": "texture",
        "label": "Raw Stone & Plaster",
        "brief": "Пористая минеральная фактура и неровная ручная штукатурка; без декора комнаты.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T03.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T04",
        "category": "texture",
        "label": "Smooth & Precise",
        "brief": "Матовая ровная поверхность, стекло и шлифованный металл; акцент на обработке.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T04.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T05",
        "category": "texture",
        "label": "Velvet & Fluted Glass",
        "brief": "Мягкий ворс рядом с регулярным стеклянным рельефом и небольшим металлическим акцентом.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T05.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T06",
        "category": "texture",
        "label": "Patina & Fine Detail",
        "brief": "Состаренное дерево, мягкий металлический блеск, тонкая ткань; без пышной формы.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T06.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T07",
        "category": "texture",
        "label": "Rustic Grain & Clay",
        "brief": "Нерегулярный древесный рисунок и матовая ручная керамика.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T07.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T08",
        "category": "texture",
        "label": "Wood & Supple Leather",
        "brief": "Гладко обработанное дерево и пластичная кожа с естественным мелким зерном.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T08.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T09",
        "category": "texture",
        "label": "Soft Wool & Honed Stone",
        "brief": "Тонкая шерстяная фактура рядом с ровным матовым камнем; спокойный тактильный контраст.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T09.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "T10",
        "category": "texture",
        "label": "Layered Pattern",
        "brief": "Сочетание двух текстильных рисунков: графика и органический мотив. Это поверхность вместе с рисунком, не только физическая текстура.",
        "hex": [],
        "media": {
          "src": "/style-compass/texture/T10.avif",
          "status": "to_produce"
        }
      }
    ]
  },
  {
    "id": "feeling",
    "label": "Feeling",
    "question": "How would you like your space to feel?",
    "hint": null,
    "tone": "sage",
    "shape": "rounded",
    "options": [
      {
        "id": "H01",
        "category": "feeling",
        "label": "Morning Light",
        "brief": "Open & uplifting. Лёгкость, простор, мягкий дневной свет; без моря или конкретного стиля мебели.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H01.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H02",
        "category": "feeling",
        "label": "Quiet Retreat",
        "brief": "Still & uncluttered. Минимум визуальных раздражителей, ровный свет, ощущение паузы.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H02.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H03",
        "category": "feeling",
        "label": "Grounded Nature",
        "brief": "Rooted & tactile. Ощущение естественности, тени листвы, телесная тактильность.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H03.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H04",
        "category": "feeling",
        "label": "Evening Glow",
        "brief": "Intimate & enveloping. Локальный тёплый свет, камерность, мягкий переход света и тени.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H04.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H05",
        "category": "feeling",
        "label": "Refined Gathering",
        "brief": "Poised & sociable. Собранная, праздничная, но не чрезмерно формальная атмосфера.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H05.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H06",
        "category": "feeling",
        "label": "Lived-in Comfort",
        "brief": "Familiar & welcoming. Непринуждённость, удобство, приглашение устроиться надолго.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H06.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H07",
        "category": "feeling",
        "label": "Sunlit Escape",
        "brief": "Relaxed & unhurried. Расслабленность, мягкие тени, ощущение свободного времени; без туристической символики.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H07.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H08",
        "category": "feeling",
        "label": "Creative Energy",
        "brief": "Playful & unexpected. Подвижный ритм и неожиданные сочетания; без обязательного яркого цвета.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H08.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H09",
        "category": "feeling",
        "label": "Clear Focus",
        "brief": "Ordered & precise. Понятная структура, простор для внимания, отсутствие лишнего.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H09.avif",
          "status": "to_produce"
        }
      },
      {
        "id": "H10",
        "category": "feeling",
        "label": "Collected Stories",
        "brief": "Personal & nostalgic. Обжитость, узнаваемые следы времени, личный характер без постановочной роскоши.",
        "hex": [],
        "media": {
          "src": "/style-compass/feeling/H10.avif",
          "status": "to_produce"
        }
      }
    ]
  }
] as const satisfies readonly StyleCompassCategory[];
