export default function EmptyState({ query }) {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40" style={{opacity:0.4, marginBottom:'12px'}}>
        <circle cx="11" cy="11" r="7"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <p>No se encontró ningún objeto{query ? ` con "${query}"` : ''}.</p>
    </div>
  );
}
