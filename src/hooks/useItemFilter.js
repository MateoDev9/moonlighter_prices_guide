import { useState, useMemo, useCallback } from 'react';
import { DATA, CATS_WITH_NG } from '../data/items';

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function useItemFilter() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [ngMode, setNgMode] = useState(false);
  const [openKey, setOpenKey] = useState(null);
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name' | 'price-asc' | 'price-desc'

  const categories = useMemo(() => {
    return ['Todos', ...new Set(DATA.map(d => d.cat))];
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());

    let results = DATA.filter(it => {
      const hasNgVariant = CATS_WITH_NG.has(it.cat);
      if (hasNgVariant && it.ng !== ngMode) return false;
      if (!hasNgVariant && it.ng !== false) return false;
      if (category !== 'Todos' && it.cat !== category) return false;
      if (q && !normalize(it.es).includes(q) && !normalize(it.en).includes(q)) return false;
      return true;
    });

    if (sortBy === 'name') {
      results = [...results].sort((a, b) => a.es.localeCompare(b.es, 'es'));
    } else if (sortBy === 'price-asc') {
      results = [...results].sort((a, b) => a.base - b.base);
    } else if (sortBy === 'price-desc') {
      results = [...results].sort((a, b) => b.base - a.base);
    }

    return results;
  }, [query, category, ngMode, sortBy]);

  const toggleOpen = useCallback((key) => {
    setOpenKey(prev => prev === key ? null : key);
  }, []);

  const setCategory_ = useCallback((cat) => {
    setCategory(cat);
    setOpenKey(null);
  }, []);

  const setQuery_ = useCallback((q) => {
    setQuery(q);
    setOpenKey(null);
  }, []);

  return {
    query, setQuery: setQuery_,
    category, setCategory: setCategory_,
    ngMode, setNgMode,
    openKey, toggleOpen,
    sortBy, setSortBy,
    categories,
    filtered,
  };
}
