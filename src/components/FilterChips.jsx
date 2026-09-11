export default function FilterChips({ categories, category, setCategory }) {
  return (
    <div className="filters" role="group" aria-label="Filtrar por categoría">
      {categories.map(cat => (
        <button
          key={cat}
          className={`chip${category === cat ? ' active' : ''}`}
          onClick={() => setCategory(cat)}
          aria-pressed={category === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
