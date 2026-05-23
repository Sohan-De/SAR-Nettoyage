const fs = require('fs');
const path = require('path');

const services = [
  {
    slug: 'nettoyage-interieur',
    navLabel: 'Nettoyage Intérieur',
    title: 'Nettoyage Murs Intérieurs',
    badge: 'Service Premium',
    lead: 'Nettoyage en profondeur des salons, chambres et couloirs pour retrouver l\'éclat d\'origine de la peinture — sans décoloration ni trace.',
    cardNote: 'Appartements, maisons & résidences en Occitanie',
    img: 'img3.jpg',
    alt: 'Nettoyage de murs intérieurs professionnel',
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
    navLabel: 'Nettoyage Extérieur',
    title: 'Nettoyage Murs Extérieurs',
    badge: 'Façades & Bardages',
    lead: 'Nettoyage haute pression doux et soft wash pour éliminer salissures atmosphériques, pollen et boue sur briques, enduit et bardages.',
    cardNote: 'Soft wash & haute pression régulée',
    img: 'service_exterior.png',
    alt: 'Nettoyage de façade extérieure',
    longText: 'Le climat méditerranéen encrasse rapidement les façades. Nous restaurons l\'aspect d\'origine de vos murs extérieurs sans abîmer les joints ni les revêtements.',
    tags: ['Briques', 'Enduit', 'Bardage', 'Terrasses', 'Pollen & poussière', 'Algues vertes'],
    benefits: [
      { title: 'Soft wash', text: 'Pression maîtrisée pour préserver les matériaux fragiles.' },
      { title: 'Anti-mousse', text: 'Traitement préventif sur zones ombragées et humides.' },
      { title: 'Hauteur sécurisée', text: 'Équipe formée pour façades et murs périphériques.' },
      { title: 'Valorisation', text: 'Redonnez de l\'éclat et de la valeur à votre bien.' },
    ],
    steps: [
      { title: 'Préparation', text: 'Protection des ouvertures, végétation et accès sécurisé.' },
      { title: 'Nettoyage', text: 'Soft wash ou basse pression selon le revêtement.' },
      { title: 'Finition', text: 'Rinçage contrôlé et inspection de la façade.' },
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

const zoneLinks = [
  { slug: 'beziers', name: 'Béziers' },
  { slug: 'montpellier', name: 'Montpellier' },
  { slug: 'toulouse', name: 'Toulouse' },
  { slug: 'narbonne', name: 'Narbonne' },
  { slug: 'carcassonne', name: 'Carcassonne' },
  { slug: 'perpignan', name: 'Perpignan' },
  { slug: 'sete', name: 'Sète' },
  { slug: 'nimes', name: 'Nîmes' },
];

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
    <meta name="description" content="${s.title} en Occitanie — SAR Nettoyage. ${s.lead.slice(0, 120)}… Devis gratuit.">
    <meta name="keywords" content="${s.slug.replace(/-/g, ' ')}, nettoyage murs, occitanie">
    <meta name="author" content="SAR Nettoyage">
    <title>${s.title} | SAR Nettoyage</title>
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
                        <a href="${p}index.html#area" class="nav-link dropdown-toggle">Zone <span class="dropdown-arrow">▼</span></a>
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
                    <span class="svc-hero-badge">✨ ${s.badge}</span>
                    <h1><span class="highlight-svc">${s.title}</span></h1>
                    <p class="svc-hero-lead">${s.lead}</p>
                    <div class="svc-hero-actions">
                        <a href="${p}contact.html" class="btn btn-primary btn-icon"><span>Devis Gratuit</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="tel:+33664334035" class="btn btn-secondary btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>Appeler</span></a>
                    </div>
                    <div class="svc-hero-trust">
                        <span>⭐️ 4,9/5 avis clients</span>
                        <span>⚡ Réponse sous 15 min</span>
                        <span>🛡️ Garantie satisfaction</span>
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
                <p class="footer-desc">Experts en restauration de cloisons sèches, plâtre et bardages. Nettoyage profond écologique et sécurisé pour appartements et bureaux premium en Occitanie.</p>
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
                <p class="footer-contact-details"><span>📞 Tél. : <a href="tel:+33664334035">+33 6 64 33 40 35</a></span><span>✉️ Email : <a href="mailto:support@apexwallcare.com">support@apexwallcare.com</a></span></p>
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
