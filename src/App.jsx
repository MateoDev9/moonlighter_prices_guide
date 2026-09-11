import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NgToggle from './components/NgToggle';
import FilterChips from './components/FilterChips';
import SortBar from './components/SortBar';
import ItemCard from './components/ItemCard';
import EmptyState from './components/EmptyState';
import { useItemFilter } from './hooks/useItemFilter';
import './App.css';

export default function App() {
  const {
    query, setQuery,
    category, setCategory,
    ngMode, setNgMode,
    openKey, toggleOpen,
    sortBy, setSortBy,
    categories,
    filtered,
  } = useItemFilter();

  return (
    <div className="wrap">
      <Header />

      <SearchBar query={query} setQuery={setQuery} />

      <NgToggle ngMode={ngMode} setNgMode={setNgMode} />

      <FilterChips
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <SortBar count={filtered.length} sortBy={sortBy} setSortBy={setSortBy} />

      {filtered.length === 0 ? (
        <EmptyState query={query} />
      ) : (
        <div className="list" role="list">
          {filtered.map(item => {
            const key = item.es + '|' + item.cat + '|' + item.ng;
            return (
              <ItemCard
                key={key}
                item={item}
                isOpen={openKey === key}
                onToggle={toggleOpen}
              />
            );
          })}
        </div>
      )}

      <footer className="footer">
        Toca un objeto para ver en qué se usa · Espejo = valor de desecho en el Espejo de mercader ·{' '}
        <strong style={{ color: 'var(--gold-dim)' }}>×N</strong> junto al nombre = unidades por casilla de mochila
      </footer>
    </div>
  );
}
