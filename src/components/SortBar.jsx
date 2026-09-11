const SORT_OPTIONS = [
  { value: 'default', label: 'Por defecto' },
  { value: 'name', label: 'Nombre A–Z' },
  { value: 'price-asc', label: 'Precio ↑' },
  { value: 'price-desc', label: 'Precio ↓' },
];

export default function SortBar({ sortBy, setSortBy, count }) {
  return (
    <div className="sort-bar">
      <span className="count">{count} {count === 1 ? 'objeto' : 'objetos'}</span>
      <div className="sort-select-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
          <path d="M3 6h18M7 12h10M11 18h2"/>
        </svg>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="sort-select"
          aria-label="Ordenar por"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
