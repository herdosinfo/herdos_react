/**
 * HERDOS Navigation Structure
 * Single source of truth for all navigation across the app
 * Extracted verbatim from site.js NAV array
 */

export const NAV = [
  {
    id: 'goats',
    label: 'For Goats',
    href: '/goats/',
    cols: [
      {
        title: 'Overview',
        items: [
          ['/goats/', 'HERDOS for Goats', 'Built for browsing behaviour & herd dynamics.'],
          ['/goats/#roi', 'ROI Analysis', 'See your savings per goat, per month.'],
          ['/goats/#features', 'New Features', 'Latest collar & app capabilities.'],
        ],
      },
      {
        title: 'Solutions',
        items: [
          ['/solutions/#herding', 'Reduce Herding Cost', 'One herder, a much larger herd.'],
          ['/solutions/#illness', 'Early Illness Detection', 'Catch illness before symptoms show.'],
          ['/solutions/#fencing', 'Virtual Fencing', 'Move paddocks in minutes, no wire.'],
          ['/solutions/#security', 'Livestock Security', 'Tracking, anti-tamper, exclusion zones.'],
        ],
      },
    ],
  },
  {
    id: 'sheep',
    label: 'For Sheep',
    href: '/sheep/',
    cols: [
      {
        title: 'Overview',
        items: [
          ['/sheep/', 'HERDOS for Sheep', 'Flock-aware grouping & grazing thresholds.'],
          ['/sheep/#roi', 'ROI Analysis', 'See your savings per sheep, per month.'],
          ['/sheep/#features', 'New Features', 'Latest collar & app capabilities.'],
        ],
      },
      {
        title: 'Solutions',
        items: [
          ['/solutions/#herding', 'Reduce Herding Cost', 'Less supervision across grazing flocks.'],
          ['/solutions/#illness', 'Early Illness Detection', 'Spot fever & rumination drift early.'],
          ['/solutions/#fencing', 'Virtual Fencing', 'Flock-cohesion boundary logic.'],
          ['/solutions/#security', 'Livestock Security', 'Keep flocks off roads & rail lines.'],
        ],
      },
    ],
  },
  {
    id: 'farmers',
    label: 'Our Farmers',
    href: '/farmers/',
    cols: [
      {
        title: 'Stories',
        items: [
          ['/farmers/', 'All Stories', "Farmers building India's livestock future."],
          ['/farmers/#goat', 'Goat Farmers', 'From Rajasthan to Maharashtra.'],
          ['/farmers/#sheep', 'Sheep Farmers', 'Grazing flocks at scale.'],
          ['/farmers/#fpo', 'FPOs & Cooperatives', 'Community-scale deployments.'],
        ],
      },
    ],
  },

  {
    id: 'resources',
    label: 'Resources',
    href: '/resources/',
    cols: [
      {
        title: 'Learn',
        items: [
          ['/resources/#blog', 'Blog & Articles', 'Livestock tech, health & grazing.'],
          ['/resources/#welfare', 'Animal Welfare Charter', 'Our welfare commitments.'],
          ['/resources/#learning', 'Learning Hub', 'Become a HERDOS-certified farmer.'],
          ['/resources/#help', 'Help Centre', 'Setup, signal & collar support.'],
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    href: '/about/',
    cols: [
      {
        title: 'Company',
        items: [
          ['/about/', 'Our Story', 'The digital backbone for livestock.'],
          ['/contact/', 'Contact', 'Talk to our team in Bengaluru.'],
          ['/about/#careers', 'Careers', 'Build the future of Indian livestock.'],
          ['/about/#press', 'Press & Media', 'HERDOS in the news.'],
        ],
      },
      {
        title: 'Our Technology',
        items: [
          ['/technology/', 'Technology', 'The platform behind every collar.'],
        ],
      },
    ],
  },
];
