export const site = {
  name: 'Ember',
  tagline: 'Small room. Good coffee.',
  founded: 2019,
  founder: 'Nora Bennett',
  address: {
    line1: '214 Ash Street',
    line2: 'Portland, OR 97204',
  },
  hours: 'Daily 7 am – 6 pm',
  phone: '(503) 555-0142',
  phoneHref: 'tel:+15035550142',
  email: 'hello@embercafe.coffee',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
};

export const fullAddress = `${site.address.line1}, ${site.address.line2}`;
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const navItems = [
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const reviews = [
  { quote: 'Best flat white in town.', name: 'Hannah R.' },
  { quote: 'Warm, quiet, perfect pastries.', name: 'Marcus L.' },
  { quote: 'My morning ritual.', name: 'Priya S.' },
  { quote: 'The cardamom bun alone is worth the walk.', name: 'Theo M.' },
  { quote: 'I come for the pour-over, stay for the room.', name: 'Lena K.' },
  { quote: 'Quiet enough to read, warm enough to linger.', name: 'Jordan P.' },
];

export const timeline = [
  {
    year: '2019',
    title: 'First counter',
    text: 'One rented counter, two stools, and a secondhand grinder.',
    image: 'first-counter',
    alt: 'The original two-stool coffee counter at Ember',
  },
  {
    year: '2021',
    title: 'Own roaster',
    text: 'A five-kilo drum roaster moved into the back room.',
    image: 'roaster',
    alt: 'A drum roaster cooling freshly roasted coffee beans',
  },
  {
    year: '2023',
    title: 'The bakery',
    text: 'Daniel’s ovens arrived. The room stayed small on purpose.',
    image: 'bakery',
    alt: 'Hands shaping dough on a flour-dusted bakery counter',
  },
];

export const team = [
  {
    name: 'Maya Chen',
    role: 'Head barista',
    hours: 'Mon–Fri · 7 am – 3 pm',
    since: '2019',
    image: 'maya-portrait',
    alt: 'Maya Chen, head barista at Ember, behind the espresso bar',
  },
  {
    name: 'Daniel Ortiz',
    role: 'Head baker',
    hours: 'Wed–Sun · 5 am – 1 pm',
    since: '2021',
    image: 'daniel-portrait',
    alt: 'Daniel Ortiz, head baker at Ember, in the bakery kitchen',
  },
  {
    name: 'Amira Hassan',
    role: 'Roaster',
    hours: 'Daily · 7 am – 6 pm',
    since: '2023',
    image: 'amira-portrait',
    alt: 'Amira Hassan, roaster at Ember, beside the drum roaster',
  },
];
