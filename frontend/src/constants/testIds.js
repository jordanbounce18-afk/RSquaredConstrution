// Centralized data-testid constants for R2 Construction

export const NAV = {
  logo: "nav-logo",
  home: "nav-home",
  services: "nav-services",
  portfolio: "nav-portfolio",
  about: "nav-about",
  contact: "nav-contact",
  estimateCta: "nav-estimate-cta",
  mobileToggle: "nav-mobile-toggle",
  adminLink: "nav-admin-link",
};

export const HERO = {
  section: "hero-section",
  primaryCta: "hero-primary-cta",
  secondaryCta: "hero-secondary-cta",
};

export const SERVICES = {
  section: "services-section",
  card: (slug) => `service-card-${slug}`,
};

export const PORTFOLIO = {
  section: "portfolio-section",
  item: (idx) => `portfolio-item-${idx}`,
  filter: (cat) => `portfolio-filter-${cat}`,
};

export const ABOUT = {
  section: "about-section",
};

export const TESTIMONIALS = {
  section: "testimonials-section",
  item: (idx) => `testimonial-${idx}`,
};

export const ESTIMATE = {
  section: "estimate-section",
  form: "estimate-form",
  name: "estimate-name",
  email: "estimate-email",
  phone: "estimate-phone",
  projectType: "estimate-project-type",
  budget: "estimate-budget",
  timeline: "estimate-timeline",
  address: "estimate-address",
  message: "estimate-message",
  submit: "estimate-submit",
};

export const CONTACT = {
  section: "contact-section",
  phone: "contact-phone",
  email: "contact-email",
  area: "contact-area",
};

export const FOOTER = {
  section: "footer-section",
};

export const ADMIN = {
  page: "admin-page",
  table: "admin-estimates-table",
  row: (id) => `admin-row-${id}`,
  statusSelect: (id) => `admin-status-select-${id}`,
  delete: (id) => `admin-delete-${id}`,
  summaryTotal: "admin-summary-total",
  summaryNew: "admin-summary-new",
  refresh: "admin-refresh",
  detailDialog: "admin-detail-dialog",
  viewRow: (id) => `admin-view-${id}`,
};

export const HOME = { emergentLink: "emergent-link" };
