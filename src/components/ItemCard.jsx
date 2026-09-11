import { useState } from 'react';
import { USES, EQUIP_CATS } from '../data/items';
import { ICON_MAP } from '../data/iconUrls';
import { getItemUsageProfile } from '../data/itemSpecialInfo';

function fmt(n) {
  return n.toLocaleString('es-ES');
}

export default function ItemCard({ item, isOpen, onToggle }) {
  const [copied, setCopied] = useState(false);
  const key = item.es + '|' + item.cat + '|' + item.ng;
  const isEquip = EQUIP_CATS.has(item.cat);
  const usedIn = USES[item.es];
  const iconFile = ICON_MAP[item.en];
  const iconSrc = iconFile ? `${import.meta.env.BASE_URL}icons/${iconFile}` : null;
  const stackTotal = item.stack > 1 ? item.base * item.stack : null;
  const profile = getItemUsageProfile(item, usedIn, isEquip);
  const { special, hasCrafting, craftingList } = profile;

  const handleCopyBase = (e) => {
    e.stopPropagation();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(item.base.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

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
            <span className="cat-text">{item.cat}{item.ng ? ' · NG+' : ''}</span>
            {special.type === 'boss' && <span className="mini-tag boss">👑 Jefe</span>}
            {special.type === 'enchantment' && <span className="mini-tag enchant">✨ Encantar</span>}
            {special.type === 'potion' && <span className="mini-tag potion">🧪 Alquimia</span>}
            {special.type === 'lore' && <span className="mini-tag lore">📜 Lore</span>}
            {special.type === 'sell_only' && <span className="mini-tag sell">💎 Vender</span>}
          </div>
        </div>
        <div className={`item-chevron${isOpen ? ' rotated' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      <div className="detail-grid">
        <div
          className={`detail-cell base${copied ? ' copied' : ''}`}
          onClick={handleCopyBase}
          role="button"
          tabIndex={0}
          title="Toca para copiar precio base"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCopyBase(e)}
        >
          <div className="base-header">
            <span className="k">{copied ? '¡Copiado al portapapeles!' : 'Precio Base · Perfecto'}</span>
            <span className="copy-icon" aria-hidden="true">
              {copied ? '✓' : '⧉'}
            </span>
          </div>
          <div className="base-content">
            <div className="v">{fmt(item.base)}</div>
            {stackTotal && (
              <div className="stack-calc">
                Stack ×{item.stack}: <strong>{fmt(stackTotal)}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="detail-cell low">
          <div className="k">Baja</div>
          <div className="v">{fmt(item.low)}</div>
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

      <div className="uses-panel" style={{ maxHeight: isOpen ? '650px' : '0' }}>
        <div className="uses-inner">
          <div className={`usage-box usage-${special.type}`}>
            <div className="usage-header">
              <span className="usage-icon">{special.icon}</span>
              <span className="usage-badge">{special.badge}</span>
              {special.title && <span className="usage-title">{special.title}</span>}
            </div>
            <p className="usage-desc">{special.description}</p>
            {special.potions && special.potions.length > 0 && (
              <div className="usage-potions-block">
                <div className="uses-subheading">🧪 Recetas de Pociones:</div>
                <div className="uses-chips">
                  {special.potions.map(p => (
                    <span key={p} className="uses-chip potion-chip">🧪 {p}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {hasCrafting && (
            <div className="crafting-block">
              <div className="uses-subheading">🔨 Se usa para forjar equipo ({craftingList.length}):</div>
              <div className="uses-chips">
                {craftingList.map(u => (
                  <span key={u} className="uses-chip">{u}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tap-hint">{isOpen ? 'Toca para cerrar' : 'Toca para ver usos y detalles'}</div>
    </article>
  );
}
