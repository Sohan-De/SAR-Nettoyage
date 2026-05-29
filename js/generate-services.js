const fs = require('fs');
const path = require('path');
const { ICON, trustRowHtml, footerContactHtml } = require('./icon-snippets');

const services = [
  {
    slug: 'nettoyage-interieur',
    navLabel: 'Nettoyage Intérieur',
    title: 'Nettoyage Murs Intérieurs',
    badge: 'Service Premium',
    lead: 'Nettoyage en profondeur des salons, chambres et couloirs pour retrouver l\'éclat d\'origine de la peinture — sans décoloration ni trace.',
    cardNote: 'Appartements, maisons & résidences en Occitanie',
    img: 'intimg.jpg',
    alt: 'Nettoyage de murs intérieurs professionnel',
    metaDesc: 'Nettoyage professionnel de murs intérieurs à Béziers et Occitanie. Élimination des taches, traces de doigts, graisse et jaunissement sans abîmer la peinture.',
    metaKeywords: 'nettoyage mur intérieur, enlever tache mur, nettoyage peinture, nettoyage maison beziers',
    longText: 'Nos techniciens SAR Nettoyage traitent taches de graisse, traces de doigts, salissures et jaunissement sur peinture mate, satinée ou lessivable. Méthode douce, produits écologiques certifiés.',
    tags: ['Salons & chambres', 'Couloirs', 'Cuisines', 'Plâtre & peinture', 'Sans odeur', 'Séchage rapide'],
    benefits: [
      { title: 'Sans décoloration', text: 'Produits pH neutre adaptés à chaque type de peinture.' },
      { title: 'Résultat visible', text: 'Murs nettoyés et uniformes dès la première intervention.' },
      { title: 'Protection mobilier', text: 'Bâches et ruban de masquage pour protéger sols et meubles.' },
      { title: 'Devis gratuit', text: 'Estimation transparente sous 15 minutes, sans engagement.' },
    ],
    steps: [
      { title: 'Diagnostic', text: 'Analyse des surfaces, type de peinture et niveau de salissure.' },
      { title: 'Traitement', text: 'Application professionnelle avec équipement adapté.' },
      { title: 'Contrôle qualité', text: 'Vérification finale et conseils d\'entretien personnalisés.' },
    ],
  },
  {
    slug: 'nettoyage-exterieur',
    navLabel: 'Nettoyage de Toitures',
    title: 'Nettoyage & Démoussage de Toiture Béziers',
    badge: 'Service N°1 - Toiture',
    lead: 'SAR Nettoyage est votre spécialiste du nettoyage de toiture et démoussage de toiture à Béziers et dans tout l\'Hérault. Nous éliminons mousses, algues et lichens pour redonner éclat et étanchéité à vos tuiles.',
    cardNote: 'Démoussage doux & finition maîtrisée',
    img: 'img.jpg',
    alt: 'Nettoyage de toiture à Béziers',
    metaDesc: 'Démoussage et nettoyage de toiture à Béziers. Élimination des mousses, lichens et algues sur tuiles, ardoises et toits plats. Devis gratuit sous 15 min.',
    metaKeywords: 'nettoyage toiture beziers, demoussage toiture beziers, demoussage toiture herault, anti mousse toiture, nettoyage toit tuile',
    longText:
      'Une toiture encrassée ou recouverte de mousse accélère la porosité et le vieillissement des tuiles. À Béziers et sous le climat humide de l\'Occitanie, la mousse de toit, les algues vertes et les lichens s\'installent rapidement. <br><br>' +
      'Chez SAR Nettoyage, nous réalisons d\'abord un diagnostic gratuit de l\'état de vos tuiles. Ensuite, nous appliquons une méthode de démoussage de toiture adaptée et sécurisée. Nous utilisons des traitements anti-mousse professionnels biodégradables qui pénètrent le support en profondeur pour éliminer les racines des végétaux sans abîmer les joints de dilatation ni fragiliser les tuiles. <br><br>' +
      'Nos équipes de couvreurs-nettoyeurs protègent soigneusement le chantier (bâches sur la végétation, récupération des résidus de mousse). Le rinçage s\'effectue à basse pression (soft wash) ou moyenne pression contrôlée pour respecter les matériaux. Nous recommandons toujours un traitement hydrofuge de toiture complémentaire pour imperméabiliser la surface et empêcher la réapparition des mousses. <br><br>' +
      'Confiez votre entretien de toiture à une entreprise locale de confiance. Contactez-nous pour un devis gratuit de nettoyage de toiture à Béziers et dans un rayon de 30 km.',
    tags: [
      'Démoussage toiture',
      'Traitement anti-mousse',
      'Tuiles & ardoises',
      'Toit plat',
      'Algues & lichens',
      'Nettoyage de toit',
      'Béziers & Occitanie',
      'Prévention infiltration',
    ],
    benefits: [
      { title: 'Démoussage en douceur', text: 'Méthode adaptée pour préserver les matériaux et les joints.' },
      { title: 'Résultat durable', text: 'Nettoyage complet + options de protection pour limiter la repousse.' },
      { title: 'Sécurité du chantier', text: 'Protection des abords, accès sécurisé et nettoyage des résidus.' },
      { title: 'Devis gratuit', text: 'Estimation claire après diagnostic, sans engagement.' },
    ],
    steps: [
      { title: 'Diagnostic toiture', text: 'Évaluation du revêtement, des zones encrassées et des points sensibles (joints, gouttières, accès).' },
      { title: 'Sécurisation & préparation', text: 'Mise en place des protections, accès sécurisés et protection des évacuations.' },
      { title: 'Démoussage & nettoyage', text: 'Brossage contrôlé et nettoyage adapté pour retirer algues, mousses et résidus.' },
      { title: 'Finition & conseils', text: 'Rinçage maîtrisé, inspection visuelle et recommandations d\'entretien (option hydrofuge).' },
    ],
  },
  {
    slug: 'traitement-hydrofuge-toiture',
    navLabel: 'Hydrofuge Toiture',
    title: 'Traitement Hydrofuge de Toiture Béziers',
    badge: 'Protection Toiture 10 ans',
    lead: 'Protégez durablement vos tuiles avec un traitement hydrofuge de toiture professionnel à Béziers et en Occitanie. L\'hydrofuge crée une barrière imperméable autonettoyante contre l\'eau de pluie et les mousses.',
    cardNote: 'Option de protection après nettoyage',
    img: 'img5.webp',
    alt: 'Traitement hydrofuge toiture (anti-mousse) à Béziers',
    metaDesc: 'Application de traitement hydrofuge de toiture à Béziers et dans l\'Hérault. Imperméabilisation et protection durable contre l\'humidité, les mousses et la pluie.',
    metaKeywords: 'traitement hydrofuge toiture, hydrofuge toiture beziers, imperméabilisation toiture, anti mousse toiture, protection tuiles 34',
    longText:
      'Le nettoyage et le démoussage éliminent la saleté, mais l\'application d\'un traitement hydrofuge de toiture garantit la longévité de votre toit. Le produit hydrofuge pénètre les pores des tuiles (tuiles en terre cuite, béton, ardoises) et forme un film protecteur imperméabilisant. L\'eau de pluie glisse sur la surface en emportant les poussières, empêchant l\'humidité de s\'installer et réduisant drastiquement le retour des mousses et lichens. <br><br>' +
      'SAR Nettoyage vous propose deux types d\'hydrofuges : l\'hydrofuge incolore (qui préserve l\'aspect d\'origine) et l\'hydrofuge coloré (idéal pour rénover et recolorer des tuiles ternies). Notre équipe à Béziers applique le traitement de façon homogène par pulvérisation après un nettoyage complet. <br><br>' +
      'En choisissant notre hydrofuge de toiture dans l\'Hérault, vous évitez les infiltrations d\'eau et les fissures causées par le gel en hiver. La toiture reste respirante tout en étant totalement étanche. <br><br>' +
      'Demandez votre diagnostic et devis gratuit pour imperméabiliser votre toiture à Béziers et ses environs.',
    tags: [
      'Hydrofuge toiture',
      'Anti-mousse',
      'Repousse eau',
      'Toitures tuiles & ardoises',
      'Toit plat',
      'Protection préventive',
      'Béziers',
      'Occitanie',
    ],
    benefits: [
      { title: 'Repousse réduite', text: 'Moins de conditions d\'humidité de surface, donc moins de repousse.' },
      { title: 'Protection longue durée', text: 'Effet hydrofuge adapté à votre toiture après nettoyage.' },
      { title: 'Rendu homogène', text: 'Application contrôlée pour une protection régulière.' },
      { title: 'Conseil au diagnostic', text: 'Choix de la solution selon exposition et encrassement.' },
    ],
    steps: [
      { title: 'Diagnostic & préparation', text: 'Contrôle de l\'état, vérification des zones sensibles et nettoyage préalable si nécessaire.' },
      { title: 'Application hydrofuge', text: 'Mise en place des protections and application du traitement sur les surfaces ciblées.' },
      { title: 'Séchage & contrôle', text: 'Inspection finale, temps de séchage et conseils d\'entretien.' },
    ],
  },
  {
    slug: 'nettoyage-gouttieres',
    navLabel: 'Nettoyage Gouttières',
    title: 'Nettoyage & Débouchage de Gouttières Béziers',
    badge: 'Prévention Infiltrations',
    lead: 'Évitez les infiltrations d\'eau et protégez vos façades. SAR Nettoyage réalise le nettoyage de gouttières et le débouchage des descentes pluviales à Béziers et dans l\'Hérault.',
    cardNote: 'Prévention dégâts des eaux',
    img: 'img6.jpg',
    alt: 'Nettoyage de gouttières à Béziers',
    metaDesc: 'Nettoyage et débouchage de gouttières à Béziers. Évitez les infiltrations d\'eau sous toiture et protégez vos façades. Intervention rapide et devis gratuit.',
    metaKeywords: 'nettoyage gouttieres beziers, debouchage gouttiere herault, entretien gouttieres, anti infiltration toiture',
    longText:
      'Les feuilles mortes, aiguilles de pin, mousses de toiture et résidus de tuiles s\'accumulent inévitablement dans les gouttières. Lors de fortes pluies à Béziers, une gouttière bouchée déborde, provoquant des infiltrations sous le toit et des traces d\'humidité inesthétiques sur vos façades. <br><br>' +
      'SAR Nettoyage intervient en toute sécurité pour le nettoyage complet de vos gouttières en zinc, PVC ou alu. Notre protocole comprend le retrait manuel des débris, le nettoyage haute pression doux de l\'intérieur de la gouttière et le débouchage des descentes pluviales. <br><br>' +
      'Nous effectuons également un contrôle d\'écoulement de l\'eau pour s\'assurer du bon fonctionnement de votre système de collecte des eaux de pluie. Un entretien régulier des gouttières (au moins une fois par an) prévient les dégâts des eaux coûteux. <br><br>' +
      'Contactez-nous pour un nettoyage de gouttières rapide et au meilleur prix à Béziers.',
    tags: [
      'Gouttières zinc & PVC',
      'Descentes pluviales',
      'Dégorgement de feuilles',
      'Anti-infiltration',
      'Prévention toiture',
      'Béziers & Occitanie',
    ],
    benefits: [
      { title: 'Moins d\'infiltrations', text: 'Évacuation d\'eau rétablie pour protéger toiture et murs.' },
      { title: 'Toiture plus saine', text: 'Réduction de l\'humidité stagnante sous les matériaux.' },
      { title: 'Chantier sécurisé', text: 'Protections et nettoyage des résidus pour un rendu propre.' },
      { title: 'Devis gratuit', text: 'Estimation claire selon configuration des gouttières et accessibilité.' },
    ],
    steps: [
      { title: 'Diagnostic & accès', text: 'Repérage des points de blocage et vérification de l\'accès.' },
      { title: 'Nettoyage des gouttières', text: 'Retrait des résidus, nettoyage et brossage contrôlé.' },
      { title: 'Dégagement & contrôle écoulement', text: 'Vérification du flux et ajustements si besoin.' },
    ],
  },
  {
    slug: 'anti-moisissure',
    navLabel: 'Traitement Anti-Moisissure',
    title: 'Traitement Anti-Moisissure',
    badge: 'Santé & Hygiène',
    lead: 'Désinfection et traitement durable des zones à moisissures dans salles de bain, cuisines et pièces humides pour des murs sains et stérilisés.',
    cardNote: 'Traitement fongicide professionnel',
    img: 'img2.jpg',
    alt: 'Traitement anti-moisissure sur murs',
    metaDesc: 'Traitement anti-moisissure professionnel des murs à Béziers. Élimination des spores, désinfection et prévention de l\'humidité en cuisine et salle de bain.',
    metaKeywords: 'traitement anti moisissure beziers, eliminer moisissure mur, humidité maison, traitement fongicide occitanie',
    longText: 'La moisissure noire ou verte n\'est pas qu\'esthétique : elle affecte la qualité de l\'air. Nous éliminons les spores en profondeur et appliquons un traitement préventif longue durée.',
    tags: ['Salle de bain', 'Cuisine', 'Cave humide', 'Joints silicone', 'Plafonds', 'Prévention'],
    benefits: [
      { title: 'Élimination spores', text: 'Produit fongicide professionnel, pas de simple masquage.' },
      { title: 'Sécurité famille', text: 'Formules non toxiques après séchage, adaptées aux foyers.' },
      { title: 'Prévention', text: 'Traitement anti-récidive sur zones à risque.' },
      { title: 'Conseil source', text: 'Identification des causes d\'humidité si possible.' },
    ],
    steps: [
      { title: 'Diagnostic humidité', text: 'Repérage des zones touchées et évaluation des surfaces.' },
      { title: 'Traitement fongicide', text: 'Application en profondeur sur murs et plafonds concernés.' },
      { title: 'Protection', text: 'Couche préventive et recommandations ventilation.' },
    ],
  },
  {
    slug: 'fin-de-bail',
    navLabel: 'Nettoyage Fin de Bail',
    title: 'Nettoyage Fin de Bail',
    badge: 'Locataires & Propriétaires',
    lead: 'Idéal pour les locataires en fin de bail ou les propriétaires qui préparent un logement à la location. Remise en état rapide des murs.',
    cardNote: 'Conforme état des lieux',
    img: 'img3.jpg',
    alt: 'Nettoyage fin de bail murs',
    metaDesc: 'Nettoyage de murs fin de bail à Béziers. Remise en état rapide et conforme pour récupérer votre caution d\'état des lieux. Devis gratuit.',
    metaKeywords: 'nettoyage fin de bail beziers, nettoyage etat des lieux, lavage mur caution, nettoyage appartement beziers',
    longText: 'Évitez les retenues sur caution : nous nettoyons traces, taches et salissures sur tous les murs du logement pour un rendu impeccable à l\'état des lieux.',
    tags: ['Appartement', 'Studio', 'Maison', 'Taches murales', 'Cuisine & SdB', 'Intervention rapide'],
    benefits: [
      { title: 'Gain de temps', text: 'Intervention efficace avant date d\'état des lieux.' },
      { title: 'Tout le logement', text: 'Pièce par pièce ou forfait complet selon besoin.' },
      { title: 'Tarif clair', text: 'Devis détaillé adapté à la surface et l\'état.' },
      { title: 'Satisfaction', text: 'Garantie : nous revenons si le résultat ne convient pas.' },
    ],
    steps: [
      { title: 'Visite / Devis', text: 'Évaluation rapide par téléphone ou sur place.' },
      { title: 'Nettoyage complet', text: 'Traitement de toutes les pièces concernées.' },
      { title: 'Livraison', text: 'Murs prêts pour l\'état des lieux de sortie.' },
    ],
  },
  {
    slug: 'bureaux-locaux',
    navLabel: 'Bureaux & Locaux',
    title: 'Bureaux & Locaux Professionnels',
    badge: 'Entreprises & Commerces',
    lead: 'Un environnement de travail impeccable et professionnel. Nettoyage des traces et salissures dans bureaux, halls d\'accueil et locaux commerciaux.',
    cardNote: 'Intervention hors heures possible',
    img: 'img7.png',
    alt: 'Nettoyage murs bureaux et locaux',
    metaDesc: 'Nettoyage professionnel de locaux commerciaux et bureaux à Béziers et Occitanie. Entretien des cloisons et murs pour des espaces de travail impeccables.',
    metaKeywords: 'nettoyage bureaux beziers, nettoyage locaux professionnels, entretien cloisons entreprise, nettoyage commerce herault',
    longText: 'L\'image de votre entreprise passe aussi par la propreté de vos locaux. Nous intervenons discrètement et efficacement sur cloisons, peintures et surfaces murales.',
    tags: ['Open space', 'Salles de réunion', 'Accueil', 'Commerces', 'Cabinets', 'Copropriétés'],
    benefits: [
      { title: 'Image pro', text: 'Locaux impeccables pour clients et collaborateurs.' },
      { title: 'Flexibilité', text: 'Créneaux soir ou week-end sur demande.' },
      { title: 'Sans interruption', text: 'Zones traitées par secteurs si besoin.' },
      { title: 'Contrat possible', text: 'Entretien régulier pour entreprises en Occitanie.' },
    ],
    steps: [
      { title: 'Audit rapide', text: 'Repérage des surfaces et planning d\'intervention.' },
      { title: 'Nettoyage ciblé', text: 'Traitement murs, cloisons et zones visibles.' },
      { title: 'Suivi', text: 'Rapport et proposition d\'entretien périodique.' },
    ],
  },
];

const { cities: zoneLinks, ZONE_NAV_LABEL } = require('./zones-data');

function buildPage(s) {
  const p = '../';
  const serviceNav = services.map(x =>
    `<li><a href="${x.slug}.html"${x.slug === s.slug ? ' class="active"' : ''}>${x.navLabel}</a></li>`
  ).join('\n                            ');

  const serviceGrid = services.map(x =>
    `<a href="${x.slug}.html" class="svc-service-link${x.slug === s.slug ? ' active' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                            <strong>${x.navLabel}</strong>
                        </a>`
  ).join('\n                    ');

  const benefits = s.benefits.map(b =>
    `<div class="svc-benefit-card"><div class="svc-benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><h3>${b.title}</h3><p>${b.text}</p></div>`
  ).join('\n                    ');

  const steps = s.steps.map((st, i) =>
    `<div class="svc-step"><div class="svc-step-num">${i + 1}</div><h3>${st.title}</h3><p>${st.text}</p></div>`
  ).join('\n                    ');

  const tags = s.tags.map(t => `<li>${t}</li>`).join('\n                        ');

  const footerServices = services.map(x =>
    `<li><a href="${x.slug}.html">${x.navLabel}</a></li>`
  ).join('\n                ');

  const zoneDropdown = zoneLinks.map(z =>
    `<li><a href="${p}zones/${z.slug}.html">${z.name}</a></li>`
  ).join('\n                            ');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${s.metaDesc}">
    <meta name="keywords" content="${s.metaKeywords}">
    <meta name="author" content="SAR Nettoyage">
    <title>${s.title} | SAR Nettoyage</title>
    <link rel="canonical" href="https://support.apexwallcare.com/services/${s.slug}.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${p}css/style.css">
    <link rel="stylesheet" href="${p}css/service-page.css">
    <script src="${p}js/color.js"></script>
</head>
<body class="service-page-body" data-service="${s.slug}">

    <header class="main-header" id="header">
        <div class="container nav-container">
            <a href="${p}index.html#home" class="logo">
                <span class="logo-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="sparkle-svg"><path d="M12 3v16M8 5h8M3 12h18M5 8v8M19 8v8"/></svg></span>
                <span class="logo-text">SAR <span class="highlight">Nettoyage</span></span>
            </a>
            <button class="menu-toggle" id="menu-toggle" aria-label="Ouvrir ou fermer le menu de navigation"><span class="hamburger"></span></button>
            <nav class="nav-menu" id="nav-menu">
                <ul class="nav-list">
                    <li><a href="${p}index.html#home" class="nav-link">Accueil</a></li>
                    <li class="nav-item-dropdown">
                        <a href="${p}index.html#services" class="nav-link active dropdown-toggle">Services <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            ${serviceNav}
                        </ul>
                    </li>
                    <li><a href="${p}realisation.html" class="nav-link">Réalisations</a></li>
                    <li class="nav-item-dropdown">
                        <a href="${p}index.html#area" class="nav-link dropdown-toggle">${ZONE_NAV_LABEL} <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            ${zoneDropdown}
                        </ul>
                    </li>
                    <li><a href="${p}blog.html" class="nav-link">Blog</a></li>
                    <li><a href="${p}contact.html" class="nav-link">Contact</a></li>
                    <li class="nav-cta"><a href="${p}contact.html" class="btn btn-primary btn-sm">Devis Gratuit</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="svc-hero">
            <div class="container svc-hero-grid">
                <div class="svc-hero-content">
                    <span class="svc-hero-badge">${ICON.sparkles} ${s.badge}</span>
                    <h1><span class="highlight-svc">${s.title}</span></h1>
                    <p class="svc-hero-lead">${s.lead}</p>
                    <div class="svc-hero-actions">
                        <a href="${p}contact.html" class="btn btn-primary btn-icon"><span>Devis Gratuit</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="tel:+33664334035" class="btn btn-secondary btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>Appeler</span></a>
                    </div>
                    <div class="svc-hero-trust">${trustRowHtml()}
                    </div>
                </div>
                <div class="svc-hero-visual">
                    <div class="svc-hero-card">
                        <img src="${p}image/${s.img}" alt="${s.alt}" class="svc-hero-img" loading="lazy">
                        <div class="svc-hero-card-body">
                            <h3>SAR Nettoyage</h3>
                            <p>${s.cardNote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="svc-stats">
            <div class="container svc-stats-grid">
                <div class="svc-stat"><strong>15 min</strong><span>Délai de réponse</span></div>
                <div class="svc-stat"><strong>12+</strong><span>Ans d'expérience</span></div>
                <div class="svc-stat"><strong>100%</strong><span>Écologique</span></div>
                <div class="svc-stat"><strong>Devis</strong><span>Gratuit &amp; sans engagement</span></div>
            </div>
        </section>

        <section class="svc-page">
            <div class="container">
                <div class="svc-section-header scroll-reveal">
                    <span class="section-subtitle">Avantages</span>
                    <h2 class="section-title">Pourquoi Choisir Ce Service ?</h2>
                </div>
                <div class="svc-benefits-grid scroll-reveal">${benefits}</div>
            </div>
        </section>

        <section class="svc-page bg-light">
            <div class="container svc-two-col scroll-reveal">
                <div>
                    <span class="section-subtitle">En Détail</span>
                    <h2 class="section-title">Notre Expertise ${s.navLabel}</h2>
                    <p class="svc-intro-text">${s.longText}</p>
                    <a href="${p}realisation.html" class="btn btn-primary btn-icon"><span>Voir Nos Réalisations</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </div>
                <div>
                    <span class="section-subtitle">Applications</span>
                    <h2 class="section-title">Surfaces &amp; Situations</h2>
                    <p class="svc-intro-text">Nous intervenons partout en Occitanie. <a href="${p}contact.html">Contactez-nous</a> pour vérifier la disponibilité dans votre secteur.</p>
                    <ul class="svc-tags-list">${tags}</ul>
                </div>
            </div>
        </section>

        <section class="svc-page">
            <div class="container">
                <div class="svc-section-header scroll-reveal">
                    <span class="section-subtitle">Notre Méthode</span>
                    <h2 class="section-title">Comment Ça Marche ?</h2>
                </div>
                <div class="svc-steps scroll-reveal">${steps}</div>
            </div>
        </section>

        <section class="svc-page bg-light">
            <div class="container">
                <div class="svc-section-header scroll-reveal">
                    <span class="section-subtitle">Nos Engagements</span>
                    <h2 class="section-title">La Qualité SAR Nettoyage</h2>
                </div>
                <div class="svc-why-grid scroll-reveal">
                    <div class="svc-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><h3>Produits Sûrs</h3><p>Non toxiques, respectueux des surfaces et adaptés aux foyers.</p></div>
                    <div class="svc-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><h3>Rapidité</h3><p>Devis sous 15 minutes et intervention planifiée rapidement.</p></div>
                    <div class="svc-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><h3>Garantie 100%</h3><p>Pas satisfait ? Nous revenons gratuitement corriger le résultat.</p></div>
                </div>
            </div>
        </section>

        <section class="svc-page">
            <div class="container">
                <div class="svc-section-header scroll-reveal">
                    <span class="section-subtitle">Catalogue</span>
                    <h2 class="section-title">Nos Autres Services</h2>
                </div>
                <div class="svc-services-grid scroll-reveal">${serviceGrid}</div>
            </div>
        </section>

        <section class="svc-cta">
            <div class="container">
                <div class="svc-cta-card scroll-reveal">
                    <div>
                        <h2>Besoin de ${s.navLabel.toLowerCase()} ?</h2>
                        <p>Obtenez votre devis gratuit personnalisé. Notre équipe vous rappelle en moins de 15 minutes.</p>
                    </div>
                    <a href="${p}contact.html" class="btn btn-secondary btn-icon"><span>Demander un Devis</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="${p}index.html#home" class="logo"><span class="logo-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="sparkle-svg"><path d="M12 3v16M8 5h8M3 12h18M5 8v8M19 8v8"/></svg></span><span class="logo-text">SAR <span class="highlight">Nettoyage</span></span></a>
                <p class="footer-desc">Experts en nettoyage de toiture, démoussage, traitement hydrofuge et nettoyage de façade. Service écologique et sécurisé à Béziers et dans l'Hérault.</p>
            </div>
            <div class="footer-links"><h4>Liens Rapides</h4><ul>
                <li><a href="${p}index.html#home">Accueil</a></li>
                <li><a href="${p}index.html#services">Nos Services</a></li>
                <li><a href="${p}realisation.html">Nos Réalisations</a></li>
                <li><a href="${p}blog.html">Notre Blog</a></li>
                <li><a href="${p}contact.html">Contact</a></li>
            </ul></div>
            <div class="footer-links"><h4>Services</h4><ul>${footerServices}</ul></div>
            <div class="footer-contact"><h4>Nous Contacter</h4><p>SAR Nettoyage<br>Occitanie, France</p>
                ${footerContactHtml()}
            </div>
        </div>
        <div class="footer-bottom"><div class="container footer-bottom-flex">
            <p>&copy; 2026 SAR Nettoyage. Tous droits réservés.</p>
            <div class="footer-bottom-links"><a href="${p}confidentialite.html">Politique de Confidentialité</a><a href="${p}conditions.html">Conditions Générales</a></div>
        </div></div>
    </footer>

    <div class="floating-actions">
        <a href="tel:+33664334035" class="floating-btn call-float-btn" aria-label="Appeler"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
        <a href="https://wa.me/33664334035" target="_blank" rel="noopener" class="floating-btn whatsapp-float-btn" aria-label="WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
    </div>
    <script src="${p}js/script.js"></script>
</body>
</html>`;
}

const dir = path.join(__dirname, '..', 'services');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
services.forEach(s => {
  fs.writeFileSync(path.join(dir, s.slug + '.html'), buildPage(s), 'utf8');
  console.log('Created', s.slug + '.html');
});
