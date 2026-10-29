import PageHero from '../components/PageHero.jsx';
import MenuCard from '../components/MenuCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { menuSections } from '../data/menu.js';

export default function MenuPage() {
  return (
    <>
      <PageHero
        image="coffee-bar"
        alt="The green espresso machine and stacked cups on Ember’s oak coffee bar"
        title="Menu"
      />
      <div className="menu-sections">
        {menuSections.map((section) => (
          <Reveal as="section" className="menu-category" key={section.title} aria-labelledby={`menu-${section.title.toLowerCase()}`}>
            <h2 className="section-title" id={`menu-${section.title.toLowerCase()}`}>
              {section.title}
            </h2>
            <div className="grid-4">
              {section.items.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
