import { USES, EQUIP_CATS } from '../data/items';
import { ICON_MAP } from '../data/iconUrls';

function fmt(n) {
  return n.toLocaleString('es-ES');
}

export default function ItemCard({ item, isOpen, onToggle }) {
  const key = item.es + '|' + item.cat + '|' + item.ng;
  const isEquip = EQUIP_CATS.has(item.cat);
  const usedIn = USES[item.es];
  const iconFile = ICON_MAP[item.en];
  const iconSrc = iconFile ? `${import.meta.env.BASE_URL}icons/${iconFile}` : null;

  return (
    <article
      className={`item${isOpen ? ' open' : ''}`}
      onClick={() => onToggle(key)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle(key)}
    >
      <div className="item-top">
        {iconSrc && (
          <div className="item-icon-wrap" aria-hidden="true">
            <img
              src={iconSrc}
              alt=""
              className="item-icon"
              loading="lazy"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
        <div className="item-names">
          <div className="item-es">
            <span className="item-es-title">{item.es}</span>
            <span className="stack-badge">×{item.stack}</span>
          </div>
          <div className="item-en">{item.en}</div>
          <div className="item-cat-tag">
            {item.cat}{item.ng ? ' · NG+' : ''}
          </div>
        </div>
        <div className={`item-chevron${isOpen ? ' rotated' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-cell low">
          <div className="k">Baja</div>
          <div className="v">{fmt(item.low)}</div>
        </div>
        <div className="detail-cell base">
          <div className="k">Base</div>
          <div className="v">{fmt(item.base)}</div>
        </div>
        <div className="detail-cell high">
          <div className="k">Alta</div>
          <div className="v">{fmt(item.high)}</div>
        </div>
        <div className="detail-cell mirror">
          <div className="k">Espejo</div>
          <div className="v">{fmt(item.mirror[0])}–{fmt(item.mirror[1])}</div>
        </div>
      </div>

      <div className="uses-panel" style={{ maxHeight: isOpen ? '300px' : '0' }}>
        <div className="uses-inner">
          <div className="uses-label">Se usa para craftear</div>
          {isEquip ? (
            <div className="uses-equip">Es equipo listo para usar — no es un material de crafteo.</div>
          ) : usedIn && usedIn.length > 0 ? (
            <div className="uses-chips">
              {usedIn.map(u => (
                <span key={u} className="uses-chip">{u}</span>
              ))}
            </div>
          ) : (
            <div className="uses-none">Sin receta de crafteo confirmada — probablemente solo sirva para vender.</div>
          )}
        </div>
      </div>

      <div className="tap-hint">{isOpen ? 'Toca para cerrar' : 'Toca para ver en qué se usa'}</div>
    </article>
  );
}
