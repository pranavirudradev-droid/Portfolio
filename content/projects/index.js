/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECTS REGISTRY
 * Maintained via /admin
 */

import { PROJECT_CATEGORIES, validateProjectSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const PROJECTS = [
  {
    "id": "does-packaging-alone-trigger-brand-recall",
    "title": "Does Packaging Alone Trigger Brand Recall?",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/packaging-brand-recall.jpg",
      "alt": "Does Packaging Alone Trigger Brand Recall cover",
      "aspectRatio": "4/5",
      "focalPoint": "50% 50%",
      "placeholderColor": "#36211C"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/does-packaging-alone-trigger-brand-recall.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-does-packaging-alone-trigger-brand-recall",
    "featured": true,
    "homepagePosition": {
      "colStart": 1,
      "colSpan": 7,
      "topOffset": "0px",
      "align": "start"
    },
    "homepageSize": "large",
    "rotation": -0.75,
    "zIndex": 2,
    "parallax": 0.12,
    "accent": "#A5BCD6"
  },
  {
    "id": "communication-theory-and-marketing-insights",
    "title": "Communication Theory & Marketing Insights",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/communication-theory.jpg",
      "alt": "Communication Theory & Marketing Insights cover",
      "aspectRatio": "16/10",
      "focalPoint": "50% 50%",
      "placeholderColor": "#2F1B17"
    },
    "document": {
      "type": "presentation",
      "src": "assets/projects/documents/communication-theory-marketing-insights.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-communication-theory-and-marketing-insights",
    "featured": false,
    "homepagePosition": {
      "colStart": 8,
      "colSpan": 5,
      "topOffset": "80px",
      "align": "end"
    },
    "homepageSize": "standard",
    "rotation": 1,
    "zIndex": 1,
    "parallax": 0.22,
    "accent": "#A5BCD6"
  },
  {
    "id": "how-do-colours-influence-consumer-behaviour",
    "title": "How Do Colours Influence Consumer Behaviour?",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/colours-consumer-behaviour.jpg",
      "alt": "How Do Colours Influence Consumer Behaviour? cover",
      "aspectRatio": "1/1",
      "focalPoint": "50% 50%",
      "placeholderColor": "#36211C"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/How_do_colours_influence_consumer_behaviour.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-how-do-colours-influence-consumer-behaviour",
    "featured": false,
    "homepagePosition": {
      "colStart": 2,
      "colSpan": 5,
      "topOffset": "40px",
      "align": "start"
    },
    "homepageSize": "standard",
    "rotation": -1.2,
    "zIndex": 3,
    "parallax": 0.15,
    "accent": "#A5BCD6",
    "description": ""
  },
  {
    "id": "primary-research-for-consumer-behaviour",
    "title": "Primary Research for Consumer Behaviour",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/primary-research-consumer-behaviour.jpg",
      "alt": "Primary Research for Consumer Behaviour cover",
      "aspectRatio": "3/4",
      "focalPoint": "50% 50%",
      "placeholderColor": "#281915"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/primary-research-consumer-behaviour.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-primary-research-for-consumer-behaviour",
    "featured": false,
    "homepagePosition": {
      "colStart": 7,
      "colSpan": 6,
      "topOffset": "120px",
      "align": "center"
    },
    "homepageSize": "large",
    "rotation": 0.5,
    "zIndex": 2,
    "parallax": 0.18,
    "accent": "#A5BCD6"
  },
  {
    "id": "primary-study-and-marketing-insights",
    "title": "Primary Study & Marketing Insights",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/primary-study-marketing-insights.jpg",
      "alt": "Primary Study & Marketing Insights cover",
      "aspectRatio": "16/9",
      "focalPoint": "50% 50%",
      "placeholderColor": "#38231E"
    },
    "document": {
      "type": "presentation",
      "src": "assets/projects/documents/primary-study-marketing-insights.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-primary-study-and-marketing-insights",
    "featured": false,
    "homepagePosition": {
      "colStart": 1,
      "colSpan": 6,
      "topOffset": "60px",
      "align": "start"
    },
    "homepageSize": "standard",
    "rotation": -0.5,
    "zIndex": 1,
    "parallax": 0.25,
    "accent": "#A5BCD6"
  },
  {
    "id": "character-analysis-personality-psychology-and-marketing",
    "title": "Character Analysis — Personality Psychology & Marketing",
    "category": "CONSUMER PSYCHOLOGY / INSIGHT",
    "cover": {
      "src": "assets/projects/covers/character-analysis-personality.jpg",
      "alt": "Character Analysis — Personality Psychology & Marketing cover",
      "aspectRatio": "4/5",
      "focalPoint": "50% 50%",
      "placeholderColor": "#301D19"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/character-analysis-personality-psychology-and-marketing.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-character-analysis-personality-psychology-and-marketing",
    "featured": true,
    "homepagePosition": {
      "colStart": 7,
      "colSpan": 5,
      "topOffset": "0px",
      "align": "end"
    },
    "homepageSize": "large",
    "rotation": 1.25,
    "zIndex": 3,
    "parallax": 0.1,
    "accent": "#A5BCD6"
  },
  {
    "id": "retail-marketing-insight-shoppers-stop",
    "title": "Retail Marketing Insight — Shoppers Stop",
    "category": "MARKET RESEARCH / CASE STUDY",
    "cover": {
      "src": "assets/projects/covers/retail-marketing-shoppers-stop.jpg",
      "alt": "Retail Marketing Insight — Shoppers Stop cover",
      "aspectRatio": "16/10",
      "focalPoint": "50% 50%",
      "placeholderColor": "#2B1A16"
    },
    "document": {
      "type": "presentation",
      "src": "assets/projects/documents/retail-marketing-insight-shoppers-stop.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-retail-marketing-insight-shoppers-stop",
    "featured": true,
    "homepagePosition": {
      "colStart": 3,
      "colSpan": 8,
      "topOffset": "70px",
      "align": "center"
    },
    "homepageSize": "panoramic",
    "rotation": -0.4,
    "zIndex": 2,
    "parallax": 0.14,
    "accent": "#A5BCD6"
  },
  {
    "id": "hireficient-from-market-gap-to-viable-venture",
    "title": "HireFicient — From Market Gap to Viable Venture",
    "category": "MARKET RESEARCH / CASE STUDY",
    "cover": {
      "src": "assets/projects/covers/hireficient-market-gap.jpg",
      "alt": "HireFicient — From Market Gap to Viable Venture cover",
      "aspectRatio": "4/5",
      "focalPoint": "50% 50%",
      "placeholderColor": "#3B241F"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/hireficient-from-market-gap-to-viable-venture.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-hireficient-from-market-gap-to-viable-venture",
    "featured": true,
    "homepagePosition": {
      "colStart": 1,
      "colSpan": 5,
      "topOffset": "30px",
      "align": "start"
    },
    "homepageSize": "standard",
    "rotation": 0.8,
    "zIndex": 2,
    "parallax": 0.16,
    "accent": "#A5BCD6"
  },
  {
    "id": "d2c-brands-in-india-and-their-marketing-strategies",
    "title": "D2C Brands in India & Their Marketing Strategies",
    "category": "MARKET RESEARCH / CASE STUDY",
    "cover": {
      "src": "assets/projects/covers/d2c-brands-india.jpg",
      "alt": "D2C Brands in India & Their Marketing Strategies cover",
      "aspectRatio": "1/1",
      "focalPoint": "50% 50%",
      "placeholderColor": "#321E19"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/d2c-brands-in-india-and-their-marketing-strategies.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-d2c-brands-in-india-and-their-marketing-strategies",
    "featured": false,
    "homepagePosition": {
      "colStart": 6,
      "colSpan": 6,
      "topOffset": "90px",
      "align": "end"
    },
    "homepageSize": "standard",
    "rotation": -1,
    "zIndex": 1,
    "parallax": 0.2,
    "accent": "#A5BCD6"
  },
  {
    "id": "forecasting-demand",
    "title": "Forecasting Demand",
    "category": "MARKET RESEARCH / CASE STUDY",
    "cover": {
      "src": "assets/projects/covers/forecasting-demand.jpg",
      "alt": "Forecasting Demand cover",
      "aspectRatio": "16/9",
      "focalPoint": "50% 50%",
      "placeholderColor": "#261713"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/forecasting-demand.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-forecasting-demand",
    "featured": false,
    "homepagePosition": {
      "colStart": 2,
      "colSpan": 7,
      "topOffset": "40px",
      "align": "start"
    },
    "homepageSize": "standard",
    "rotation": 0.6,
    "zIndex": 2,
    "parallax": 0.17,
    "accent": "#A5BCD6"
  },
  {
    "id": "a-sustainable-product",
    "title": "A Sustainable Product",
    "category": "PRODUCT / STRATEGY",
    "cover": {
      "src": "assets/projects/covers/sustainable-product.jpg",
      "alt": "A Sustainable Product cover",
      "aspectRatio": "3/4",
      "focalPoint": "50% 50%",
      "placeholderColor": "#422822"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/a-sustainable-product.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-a-sustainable-product",
    "featured": true,
    "homepagePosition": {
      "colStart": 1,
      "colSpan": 6,
      "topOffset": "50px",
      "align": "start"
    },
    "homepageSize": "large",
    "rotation": -0.9,
    "zIndex": 2,
    "parallax": 0.13,
    "accent": "#4D0E12"
  },
  {
    "id": "nazakath",
    "title": "NAZAKATH",
    "category": "PRODUCT / STRATEGY",
    "cover": {
      "src": "assets/projects/covers/nazakath.jpg",
      "alt": "NAZAKATH cover",
      "aspectRatio": "4/5",
      "focalPoint": "50% 50%",
      "placeholderColor": "#482721"
    },
    "document": {
      "type": "presentation",
      "src": "assets/projects/documents/nazakath.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-nazakath",
    "featured": true,
    "homepagePosition": {
      "colStart": 7,
      "colSpan": 6,
      "topOffset": "10px",
      "align": "end"
    },
    "homepageSize": "large",
    "rotation": 1.1,
    "zIndex": 3,
    "parallax": 0.15,
    "accent": "#4D0E12"
  },
  {
    "id": "the-airport-was-never-the-problem",
    "title": "The Airport Was Never the Problem",
    "category": "PRODUCT / STRATEGY",
    "cover": {
      "src": "assets/projects/covers/airport-never-the-problem.jpg",
      "alt": "The Airport Was Never the Problem cover",
      "aspectRatio": "16/9",
      "focalPoint": "50% 50%",
      "placeholderColor": "#3E241E"
    },
    "document": {
      "type": "pdf",
      "src": "assets/projects/documents/the-airport-was-never-the-problem.pdf",
      "pageCount": null,
      "downloadable": true
    },
    "href": "#project-the-airport-was-never-the-problem",
    "featured": true,
    "homepagePosition": {
      "colStart": 2,
      "colSpan": 10,
      "topOffset": "80px",
      "align": "center"
    },
    "homepageSize": "monumental",
    "rotation": -0.3,
    "zIndex": 2,
    "parallax": 0.19,
    "accent": "#4D0E12"
  }
];

PROJECTS.forEach(validateProjectSchema);

export function getFeaturedProjects() {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(category) {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}
