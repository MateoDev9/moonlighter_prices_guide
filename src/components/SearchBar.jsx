import { useRef } from 'react';

export default function SearchBar({ query, setQuery }) {
  const inputRef = useRef(null);

  return (
    <div className="search-row">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <input
        ref={inputRef}
        type="text"
        id="searchInput"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={e => e.target.select()}
        placeholder="Buscar objeto… (ej. gelatina, espada, gólem)"
        autoComplete="off"
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => { setQuery(''); inputRef.current?.focus(); }}
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      )}
    </div>
  );
}
