const fs = require('fs');
const path = require('path');
const { ICON, trustRowHtml, footerContactHtml } = require('./icon-snippets');
const { cities, ZONE_NAV_LABEL } = require('./zones-data');

function buildPage(c) {
  const p = '../';
  const cityLinks = cities.map(x => {
    const active = x.slug === c.slug ? ' active' : '';
    return `<a href="${x.slug}.html" class="zone-city-link${active}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <strong>${x.name}</strong>
                            <span>${x.dept.split(' ')[0]}</span>
                        </a>`;
  }).join('\n                    ');

  const dropdownActive = cities.map(x =>
    `<li><a href="${x.slug}.html"${x.slug === c.slug ? ' class="active"' : ''}>${x.name}</a></li>`
  ).join('\n                            ');

  const communes = c.communes.map(x => `<li>${x}</li>`).join('\n                        ');
  const footerZones = cities.map(x => `<li><a href="${x.slug}.html">${x.name}</a></li>`).join('\n                ');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Nettoyage de toiture, démoussage et hydrofuge à ${c.name} (34) — SAR Nettoyage. Entretien professionnel de tuiles, gouttières et façades. Devis gratuit.">
    <meta name="keywords" content="nettoyage toiture ${c.name}, demoussage toiture ${c.name}, hydrofuge toiture ${c.name}, nettoyage facade ${c.name}, entreprise nettoyage toiture 34">
    <meta name="author" content="SAR Nettoyage">
    <title>Nettoyage de Toiture &amp; Démoussage à ${c.name} | SAR Nettoyage</title>
    <link rel="canonical" href="https://support.apexwallcare.com/zones/${c.slug}.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${p}css/style.css">
    <link rel="stylesheet" href="${p}css/zone.css">
    <script src="${p}js/color.js"></script>
</head>
<body class="zone-page-body" data-zone="${c.slug}" data-lat="${c.lat}" data-lng="${c.lng}" data-city="${c.name}">

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
                        <a href="${p}index.html#services" class="nav-link dropdown-toggle">Services <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="${p}services/nettoyage-interieur.html">Nettoyage Intérieur</a></li>
                            <li><a href="${p}services/nettoyage-exterieur.html">Nettoyage de Toitures</a></li>
                            <li><a href="${p}services/traitement-hydrofuge-toiture.html">Hydrofuge Toiture</a></li>
                            <li><a href="${p}services/nettoyage-gouttieres.html">Nettoyage Gouttières</a></li>
                            <li><a href="${p}services/anti-moisissure.html">Traitement Anti-Moisissure</a></li>
                            <li><a href="${p}services/fin-de-bail.html">Nettoyage Fin de Bail</a></li>
                            <li><a href="${p}services/bureaux-locaux.html">Bureaux &amp; Locaux</a></li>
                        </ul>
                    </li>
                    <li><a href="${p}realisation.html" class="nav-link">Réalisations</a></li>
                    <li class="nav-item-dropdown">
                        <a href="${p}index.html#area" class="nav-link active dropdown-toggle">${ZONE_NAV_LABEL} <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            ${dropdownActive}
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
        <section class="zone-hero">
            <div class="container zone-hero-grid">
                <div class="zone-hero-content">
                    <span class="zone-hero-badge">${ICON.pin} ${c.dept}</span>
                    <h1>Nettoyage de Toiture à <span class="highlight-city">${c.name}</span></h1>
                    <p class="zone-hero-lead">${c.lead}</p>
                    <div class="zone-hero-actions">
                        <a href="${p}contact.html" class="btn btn-primary btn-icon"><span>Devis Gratuit</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="tel:+33664334035" class="btn btn-secondary btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>Appeler</span></a>
                    </div>
                    <div class="zone-hero-trust">${trustRowHtml()}
                    </div>
                </div>
                <div class="zone-hero-visual">
                    <div class="zone-hero-card">
                        <img src="${p}image/${c.img}" alt="${c.alt}" class="zone-hero-img" loading="lazy">
                        <div class="zone-hero-card-body">
                            <h3>Intervention locale à ${c.name}</h3>
                            <p>${c.tag} — équipe mobile SAR Nettoyage</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="zone-stats">
            <div class="container zone-stats-grid">
                <div class="zone-stat"><strong>15 min</strong><span>Délai de réponse</span></div>
                <div class="zone-stat"><strong>12+</strong><span>Ans d'expérience</span></div>
                <div class="zone-stat"><strong>100%</strong><span>Écologique</span></div>
                <div class="zone-stat"><strong>Devis</strong><span>Gratuit &amp; sans engagement</span></div>
            </div>
        </section>

        <section class="zone-page">
            <div class="container">
                <div class="zone-section-header scroll-reveal">
                    <span class="section-subtitle">Nos Services à ${c.name}</span>
                    <h2 class="section-title">Solutions Professionnelles de Toiture &amp; Extérieur</h2>
                    <p class="section-desc">Nous adaptons nos techniques au climat méditerranéen et aux types de toitures de ${c.name} et ses environs.</p>
                </div>
                <div class="zone-services-grid scroll-reveal">
                    <div class="zone-service-card"><div class="zone-service-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div><h3>Démoussage &amp; Toiture</h3><p>Retrait des mousses, lichens et algues sur tous types de tuiles pour éviter la porosité.</p></div>
                    <div class="zone-service-card"><div class="zone-service-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg></div><h3>Hydrofuge de Toiture</h3><p>Imperméabilisation incolore ou colorée pour protéger durablement vos tuiles.</p></div>
                    <div class="zone-service-card"><div class="zone-service-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div><h3>Nettoyage Façades</h3><p>Soft wash basse pression pour éliminer les traces rouges, noires et salissures.</p></div>
                    <div class="zone-service-card"><div class="zone-service-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg></div><h3>Nettoyage Gouttières</h3><p>Dégorgement complet des feuilles et débris pour prévenir les infiltrations sous toiture.</p></div>
                </div>
            </div>
        </section>

        <section class="zone-page bg-light">
            <div class="container zone-two-col scroll-reveal">
                <div>
                    <span class="section-subtitle">Zone Couverte</span>
                    <h2 class="section-title">Communes &amp; Quartiers Desservis</h2>
                    <p class="zone-intro-text">Nous intervenons à ${c.name} et dans les secteurs suivants. Votre commune n'est pas listée ? <a href="${p}contact.html">Contactez-nous</a> pour vérifier notre disponibilité.</p>
                    <ul class="zone-communes-list">${communes}</ul>
                </div>
                <div>
                    <span class="section-subtitle">Pourquoi Nous Choisir</span>
                    <h2 class="section-title">L'Expertise SAR à ${c.name}</h2>
                    <p class="zone-intro-text">Notre équipe connaît les problématiques locales : humidité, air salin, poussières et vieillissement des peintures. Nous utilisons des produits professionnels certifiés, sans danger pour votre famille.</p>
                    <a href="${p}realisation.html" class="btn btn-primary btn-icon"><span>Voir Nos Réalisations</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </div>
            </div>
        </section>

        <section class="zone-page">
            <div class="container">
                <div class="zone-section-header scroll-reveal">
                    <span class="section-subtitle">Nos Engagements</span>
                    <h2 class="section-title">Pourquoi ${c.name} Nous Fait Confiance</h2>
                </div>
                <div class="zone-why-grid scroll-reveal">
                    <div class="zone-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><h3>Produits Sûrs</h3><p>Non toxiques, respectueux de la peinture et adaptés aux enfants et animaux.</p></div>
                    <div class="zone-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><h3>Intervention Rapide</h3><p>Devis sous 15 minutes, créneaux flexibles à ${c.name} et alentours.</p></div>
                    <div class="zone-why-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><h3>Garantie 100%</h3><p>Pas satisfait ? Nous revenons gratuitement corriger le résultat.</p></div>
                </div>
            </div>
        </section>

        <section class="zone-page bg-light">
            <div class="container">
                <div class="zone-section-header scroll-reveal">
                    <span class="section-subtitle">Occitanie</span>
                    <h2 class="section-title">Nos Autres Villes d'Intervention</h2>
                </div>
                <div class="zone-cities-grid scroll-reveal">${cityLinks}</div>
            </div>
        </section>

        <section class="zone-map-section">
            <div class="container scroll-reveal">
                <div class="zone-section-header">
                    <span class="section-subtitle">Localisation</span>
                    <h2 class="section-title">Nous Trouver près de ${c.name}</h2>
                </div>
                <div class="zone-map-wrapper glass" id="zone-map-container"></div>
            </div>
        </section>

        <section class="zone-cta">
            <div class="container">
                <div class="zone-cta-card scroll-reveal">
                    <div>
                        <h2>Besoin d'un nettoyage de toiture à ${c.name} ?</h2>
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
            <div class="footer-links"><h4>${ZONE_NAV_LABEL}</h4><ul>${footerZones}</ul></div>
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

const dir = path.join(__dirname, '..', 'zones');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const validSlugs = new Set(cities.map((c) => c.slug));
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const slug = file.replace(/\.html$/, '');
  if (!validSlugs.has(slug)) {
    fs.unlinkSync(path.join(dir, file));
    console.log('Removed', file);
  }
}

cities.forEach((c) => {
  fs.writeFileSync(path.join(dir, c.slug + '.html'), buildPage(c), 'utf8');
  console.log('Created', c.slug + '.html');
});
