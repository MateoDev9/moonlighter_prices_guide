export default function Header() {
  return (
    <header className="header">
      <div className="eyebrow">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12 3a9 9 0 1 0 8.94 10.06A7 7 0 0 1 12 3z"/>
        </svg>
        GUÍA DE VENTAS · MOONLIGHTER
      </div>
      <h1>Precios <em>Perfectos</em></h1>
      <p className="sub">
        Consulta rápida de precios de venta óptimos para cada objeto — juego base, DLC y New Game+.{' '}
        Datos de la guía de{' '}
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3603360927" target="_blank" rel="noopener">
          Kaloneun en Steam
        </a>.
      </p>
    </header>
  );
}
