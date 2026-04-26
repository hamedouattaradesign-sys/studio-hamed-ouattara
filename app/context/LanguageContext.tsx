"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "EN" | "FR" | "ZH";

export type Translations = {
  // ─── Nav ──────────────────────────────────────────────────────────────────
  home:                string;
  works:               string;
  about:               string;
  press:               string;
  contact:             string;
  shop:                string;

  // ─── Home — hero ──────────────────────────────────────────────────────────
  heroEyebrow:         string;
  heroRole:            string;
  heroDesc:            string;
  discoverWorks:       string;
  collectionsLabel:    string;

  // ─── Home — works section ─────────────────────────────────────────────────
  portfolioLabel:      string;
  worksTitle:          string;
  worksSubtitle:       string;
  viewAllWorks:        string;
  acquire:             string;

  // ─── Home — exhibition banner ─────────────────────────────────────────────
  currentExhibition:   string;
  learnMore:           string;

  // ─── Home — about strip ───────────────────────────────────────────────────
  biographyLabel:      string;
  fullBio:             string;

  // ─── Home — press grid ────────────────────────────────────────────────────
  recognitionLabel:    string;
  pressAndInstitutions: string;

  // ─── Works page ───────────────────────────────────────────────────────────
  worksPageEyebrow:    string;
  worksPageCount:      string;
  bolibanaLabel:       string;
  bolibanaDesc:        string;
  furnitureLabel:      string;
  furnitureDesc:       string;
  canvasLabel:         string;
  canvasDesc:          string;
  enquiriesLabel:      string;
  enquiriesDesc:       string;
  contactStudio:       string;

  // ─── About page ───────────────────────────────────────────────────────────
  biographySectionLabel: string;
  biographyTitle:      string;
  permanentCollections: string;
  chronologyLabel:     string;
  timelineTitle:       string;
  atelierLabel:        string;
  studioTitle:         string;
  futureVisionLabel:   string;
  discoverVision:      string;

  // ─── Press page ───────────────────────────────────────────────────────────
  pressTitleMain:      string;
  pressTitleItalic:    string;
  pressPageDesc:       string;
  showingLabel:        string;
  records:             string;
  mediaResourcesLabel: string;
  pressKitMain:        string;
  pressKitItalic:      string;
  readMore:            string;

  // ─── Contact page ─────────────────────────────────────────────────────────
  contactTitleMain:    string;
  contactTitleItalic:  string;
  contactDesc:         string;
  responseTimeLabel:   string;
  responseTimeDesc:    string;
  formTitleMain:       string;
  formTitleItalic:     string;
  sendMessage:         string;
  whereToFindUs:       string;
  locationsTitle:      string;
};

const T: Record<Lang, Translations> = {
  EN: {
    // Nav
    home:                "Home",
    works:               "Selected Works",
    about:               "About",
    press:               "Press",
    contact:             "Contact",
    shop:                "Shop",
    // Hero
    heroEyebrow:         "Ouagadougou · Atlanta · World",
    heroRole:            "Multidisciplinary Artist & Designer · Burkina Faso",
    heroDesc:            "Working from Ouagadougou, Hamed Ouattara upcycles discarded oil drums into Afrofuturist sculptural furniture — forms that carry the geometric memory of Sudano-Sahelian architecture into the present. Each object is produced with a team of fifteen local artisans, bridging ancestral craft and contemporary art.",
    discoverWorks:       "Discover Works",
    collectionsLabel:    "Institutional Collections",
    // Works section
    portfolioLabel:      "Portfolio",
    worksTitle:          "Featured Works",
    worksSubtitle:       "Upcycled industrial objects as cultural form",
    viewAllWorks:        "View All Works ↗",
    acquire:             "Acquire",
    // Exhibition
    currentExhibition:   "Current Exhibition",
    learnMore:           "Learn more",
    // About strip
    biographyLabel:      "Biography",
    fullBio:             "Full Biography →",
    // Press grid
    recognitionLabel:    "Recognition",
    pressAndInstitutions: "Press & Institutions",
    // Works page
    worksPageEyebrow:    "Studio Hamed Ouattara · Works",
    worksPageCount:      "19 works across 3 collections",
    bolibanaLabel:       "Bolibana Collection",
    bolibanaDesc:        "Ouattara's most celebrated body of work — sculptural cabinets handcrafted from reclaimed oil drum sheets. Presented at Friedman Benda Gallery, New York, 2023.",
    furnitureLabel:      "Furniture & Sculptures",
    furnitureDesc:       "Functional sculptures for interior spaces — chairs, cabinets, and objects constructed from upcycled oil drums and reclaimed steel.",
    canvasLabel:         "Works on Canvas",
    canvasDesc:          "Large-format paintings exploring the intersection of Afrofuturism, urban memory, and the symbolic geometry of the Sahel.",
    enquiriesLabel:      "Enquiries",
    enquiriesDesc:       "For acquisition, institutional loans, or studio visits, please get in touch.",
    contactStudio:       "Contact the Studio",
    // About page
    biographySectionLabel: "The Artist",
    biographyTitle:      "The Artist & His Practice",
    permanentCollections: "Permanent Collections",
    chronologyLabel:     "Chronology",
    timelineTitle:       "Key Milestones",
    atelierLabel:        "The Atelier",
    studioTitle:         "Studio SHO — Ouagadougou",
    futureVisionLabel:   "Future Vision",
    discoverVision:      "Discover the Vision ↗",
    // Press page
    pressTitleMain:      "Press &",
    pressTitleItalic:    "Recognition",
    pressPageDesc:       "Publications, institutional acquisitions, exhibitions and awards — a record of international recognition spanning two decades of practice rooted in Ouagadougou, Burkina Faso.",
    showingLabel:        "Showing",
    records:             "records",
    mediaResourcesLabel: "Media Resources",
    pressKitMain:        "Press Kit &",
    pressKitItalic:      "Media Assets",
    readMore:            "Read more ↗",
    // Contact page
    contactTitleMain:    "Get in",
    contactTitleItalic:  "Touch",
    contactDesc:         "For acquisition inquiries, institutional collaborations, press requests, or any question about the work — the studio team is available from Ouagadougou and Atlanta.",
    responseTimeLabel:   "Response time",
    responseTimeDesc:    "We respond to all inquiries within 48 hours.",
    formTitleMain:       "Let's start a",
    formTitleItalic:     "conversation",
    sendMessage:         "Send Message",
    whereToFindUs:       "Where to find us",
    locationsTitle:      "Locations",
  },

  FR: {
    // Nav
    home:                "Accueil",
    works:               "Œuvres",
    about:               "À propos",
    press:               "Presse",
    contact:             "Contact",
    shop:                "Boutique",
    // Hero
    heroEyebrow:         "Ouagadougou · Atlanta · Monde",
    heroRole:            "Artiste Designer Pluridisciplinaire · Burkina Faso",
    heroDesc:            "Depuis Ouagadougou, Hamed Ouattara transforme des fûts de pétrole industriels en mobilier sculptural afrofuturiste — des formes qui portent la mémoire géométrique de l'architecture soudano-sahélienne dans le présent. Chaque objet est produit avec une équipe de quinze artisans locaux, alliant savoir-faire ancestral et art contemporain.",
    discoverWorks:       "Découvrir les œuvres",
    collectionsLabel:    "Collections Permanentes",
    // Works section
    portfolioLabel:      "Portfolio",
    worksTitle:          "Œuvres Sélectionnées",
    worksSubtitle:       "Objets industriels recyclés comme forme culturelle",
    viewAllWorks:        "Toutes les œuvres ↗",
    acquire:             "Acquérir",
    // Exhibition
    currentExhibition:   "Exposition en cours",
    learnMore:           "En savoir plus",
    // About strip
    biographyLabel:      "Biographie",
    fullBio:             "Biographie complète →",
    // Press grid
    recognitionLabel:    "Reconnaissance",
    pressAndInstitutions: "Presse & Institutions",
    // Works page
    worksPageEyebrow:    "Studio Hamed Ouattara · Œuvres",
    worksPageCount:      "19 œuvres · 3 collections",
    bolibanaLabel:       "Collection Bolibana",
    bolibanaDesc:        "Le corpus d'œuvres le plus célébré d'Ouattara — des armoires sculpturales façonnées à la main à partir de tôles de fûts récupérés. Présenté à la Friedman Benda Gallery, New York, 2023.",
    furnitureLabel:      "Mobilier & Sculptures",
    furnitureDesc:       "Sculptures fonctionnelles pour espaces intérieurs — chaises, armoires et objets construits à partir de fûts recyclés et d'acier récupéré.",
    canvasLabel:         "Œuvres sur Toile",
    canvasDesc:          "Peintures grand format explorant l'intersection entre l'afrofuturisme, la mémoire urbaine et la géométrie symbolique du Sahel.",
    enquiriesLabel:      "Renseignements",
    enquiriesDesc:       "Pour une acquisition, un prêt institutionnel ou une visite d'atelier, contactez-nous.",
    contactStudio:       "Contacter le Studio",
    // About page
    biographySectionLabel: "L'Artiste",
    biographyTitle:      "L'Artiste & Sa Pratique",
    permanentCollections: "Collections Permanentes",
    chronologyLabel:     "Chronologie",
    timelineTitle:       "Étapes Clés",
    atelierLabel:        "L'Atelier",
    studioTitle:         "Studio SHO — Ouagadougou",
    futureVisionLabel:   "Vision Future",
    discoverVision:      "Découvrir la vision ↗",
    // Press page
    pressTitleMain:      "Presse &",
    pressTitleItalic:    "Reconnaissance",
    pressPageDesc:       "Publications, acquisitions institutionnelles, expositions et distinctions — un bilan de reconnaissance internationale sur deux décennies de pratique enracinée à Ouagadougou, Burkina Faso.",
    showingLabel:        "Affichage",
    records:             "entrées",
    mediaResourcesLabel: "Ressources Médias",
    pressKitMain:        "Dossier de Presse &",
    pressKitItalic:      "Ressources Médias",
    readMore:            "Lire la suite ↗",
    // Contact page
    contactTitleMain:    "Nous",
    contactTitleItalic:  "Contacter",
    contactDesc:         "Pour les demandes d'acquisition, les collaborations institutionnelles, les demandes de presse ou toute question sur l'œuvre — l'équipe du studio est disponible depuis Ouagadougou et Atlanta.",
    responseTimeLabel:   "Délai de réponse",
    responseTimeDesc:    "Nous répondons à toutes les demandes sous 48 heures.",
    formTitleMain:       "Commençons une",
    formTitleItalic:     "conversation",
    sendMessage:         "Envoyer",
    whereToFindUs:       "Où nous trouver",
    locationsTitle:      "Adresses",
  },

  ZH: {
    // Nav
    home:                "首页",
    works:               "精选作品",
    about:               "关于",
    press:               "媒体",
    contact:             "联系",
    shop:                "商店",
    // Hero
    heroEyebrow:         "瓦加杜古 · 亚特兰大 · 世界",
    heroRole:            "多学科艺术家与设计师 · 布基纳法索",
    heroDesc:            "哈梅德·瓦塔拉在博博迪乌拉索工作，将废弃工业油桶转化为非洲未来主义雕塑家具——承载苏丹-萨赫勒建筑几何记忆的当代形式。每件作品由十五名当地工匠共同完成，融合祖传工艺与当代艺术。",
    discoverWorks:       "探索作品",
    collectionsLabel:    "永久收藏",
    // Works section
    portfolioLabel:      "作品集",
    worksTitle:          "精选作品",
    worksSubtitle:       "升级再造工业品作为文化形式",
    viewAllWorks:        "查看全部作品 ↗",
    acquire:             "购买",
    // Exhibition
    currentExhibition:   "当前展览",
    learnMore:           "了解更多",
    // About strip
    biographyLabel:      "艺术家简介",
    fullBio:             "完整简介 →",
    // Press grid
    recognitionLabel:    "荣誉认可",
    pressAndInstitutions: "媒体与机构",
    // Works page
    worksPageEyebrow:    "哈梅德·瓦塔拉工作室 · 作品",
    worksPageCount:      "19件作品 · 3个系列",
    bolibanaLabel:       "博利巴纳系列",
    bolibanaDesc:        "瓦塔拉最具代表性的系列——由回收油桶钢板手工制作的雕塑柜。2023年在纽约弗里德曼·本达画廊展出。",
    furnitureLabel:      "家具与雕塑",
    furnitureDesc:       "室内功能雕塑——由废弃油桶和回收钢材制成的椅子、柜子和物件。",
    canvasLabel:         "布面作品",
    canvasDesc:          "大幅绘画，探索非洲未来主义、城市记忆与萨赫勒象征几何的交汇。",
    enquiriesLabel:      "咨询",
    enquiriesDesc:       "关于收藏、机构借展或工作室参观，请与我们联系。",
    contactStudio:       "联系工作室",
    // About page
    biographySectionLabel: "艺术家",
    biographyTitle:      "艺术家与其实践",
    permanentCollections: "永久收藏",
    chronologyLabel:     "年表",
    timelineTitle:       "重要里程碑",
    atelierLabel:        "工作室",
    studioTitle:         "SHO工作室 — 瓦加杜古",
    futureVisionLabel:   "未来愿景",
    discoverVision:      "探索愿景 ↗",
    // Press page
    pressTitleMain:      "媒体与",
    pressTitleItalic:    "认可",
    pressPageDesc:       "出版物、机构收藏、展览与奖项——跨越二十年植根于布基纳法索瓦加杜古的国际认可记录。",
    showingLabel:        "显示",
    records:             "条记录",
    mediaResourcesLabel: "媒体资源",
    pressKitMain:        "新闻资料包与",
    pressKitItalic:      "媒体素材",
    readMore:            "阅读更多 ↗",
    // Contact page
    contactTitleMain:    "联系",
    contactTitleItalic:  "我们",
    contactDesc:         "关于收藏咨询、机构合作、媒体请求或任何关于作品的问题——工作室团队可从瓦加杜古和亚特兰大联系。",
    responseTimeLabel:   "回复时间",
    responseTimeDesc:    "我们在48小时内回复所有咨询。",
    formTitleMain:       "开启一段",
    formTitleItalic:     "对话",
    sendMessage:         "发送",
    whereToFindUs:       "如何找到我们",
    locationsTitle:      "地址",
  },
};

type LanguageContextType = {
  lang:    Lang;
  setLang: (l: Lang) => void;
  t:       Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang:    "EN",
  setLang: () => {},
  t:       T.EN,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
