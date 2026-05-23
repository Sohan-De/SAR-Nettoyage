'use strict';

/** Flat stroke SVG icons (Lucide-style) — shared across HTML generators and pages */
const ICON = {
    sparkles:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v16M8 5h8M3 12h18M5 8v8M19 8v8"/></svg>',
    pin:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    star:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    zap:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    shield:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    phone:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    calendar:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    lock:
        '<svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
};

const STAR_FILLED =
    '<svg class="icon-star" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

function trustRowHtml() {
    return `
                        <span class="trust-inline">${ICON.star} 4,9/5 avis clients</span>
                        <span class="trust-inline">${ICON.zap} Réponse sous 15 min</span>
                        <span class="trust-inline">${ICON.shield} Garantie satisfaction</span>`;
}

function footerContactHtml() {
    return `<p class="footer-contact-details"><span class="footer-contact-item">${ICON.phone} Tél. : <a href="tel:+33664334035">+33 6 64 33 40 35</a></span><span class="footer-contact-item">${ICON.mail} Email : <a href="mailto:support@apexwallcare.com">support@apexwallcare.com</a></span></p>`;
}

function footerContactSpansHtml() {
    return `<span class="footer-contact-item">${ICON.phone} Tél. : <a href="tel:+33664334035">+33 6 64 33 40 35</a></span>
                    <span class="footer-contact-item">${ICON.mail} Email : <a href="mailto:support@apexwallcare.com">support@apexwallcare.com</a></span>`;
}

function ratingStarsHtml() {
    return `<div class="rating icon-stars" aria-label="5 étoiles sur 5">${STAR_FILLED.repeat(5)}</div>`;
}

function blogModalMeta(dateText, readTime) {
    return `<span class="meta-inline">${ICON.calendar} ${dateText}</span> · <span class="meta-inline">${ICON.clock} ${readTime}</span>`;
}

module.exports = {
    ICON,
    trustRowHtml,
    footerContactHtml,
    footerContactSpansHtml,
    ratingStarsHtml,
    blogModalMeta,
    STAR_FILLED,
};
