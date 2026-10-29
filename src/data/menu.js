export const menuSections = [
  {
    title: 'Coffee',
    items: [
      { name: 'Espresso', price: '$3.00', image: 'espresso', alt: 'A double espresso in a small cream cup' },
      { name: 'Flat white', price: '$4.50', image: 'flat-white', alt: 'A flat white with velvety microfoam' },
      { name: 'Latte', price: '$4.50', image: 'latte', alt: 'A latte with rosetta latte art' },
      { name: 'Pour-over', price: '$5.00', image: 'pour-over', alt: 'A pour-over coffee brewing on a wooden stand' },
    ],
  },
  {
    title: 'Bakery',
    items: [
      { name: 'Croissant', price: '$3.50', image: 'croissant', alt: 'A flaky butter croissant on a ceramic plate' },
      { name: 'Pain au chocolat', price: '$4.00', image: 'pain-au-chocolat', alt: 'A pain au chocolat on a linen napkin' },
      { name: 'Cardamom bun', price: '$4.00', image: 'cardamom-bun', alt: 'A cardamom bun with pearl sugar' },
      { name: 'Banana bread', price: '$3.50', image: 'banana-bread', alt: 'A thick slice of banana bread' },
    ],
  },
  {
    title: 'Cold',
    items: [
      { name: 'Iced latte', price: '$5.00', image: 'iced-latte', alt: 'An iced latte in a tall glass' },
      { name: 'Cold brew', price: '$4.50', image: 'cold-brew', alt: 'Cold brew coffee over ice in a glass' },
      { name: 'Lemonade', price: '$4.00', image: 'lemonade', alt: 'House lemonade with a lemon slice' },
      { name: 'Iced tea', price: '$3.50', image: 'iced-tea', alt: 'Iced black tea in a tall glass' },
    ],
  },
];

export const featuredItems = [
  menuSections[0].items[1],
  menuSections[1].items[0],
  menuSections[2].items[1],
  menuSections[1].items[2],
];
