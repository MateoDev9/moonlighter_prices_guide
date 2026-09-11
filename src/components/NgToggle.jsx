export default function NgToggle({ ngMode, setNgMode }) {
  return (
    <div className="ngtoggle">
      <div className="ngtoggle-label">
        <span className="ngtoggle-title">Precios de New Game+</span>
        <small>Solo aplica a materiales / pociones (las armas y armaduras no cambian)</small>
      </div>
      <label className="switch" htmlFor="ngToggle">
        <input
          type="checkbox"
          id="ngToggle"
          checked={ngMode}
          onChange={e => setNgMode(e.target.checked)}
        />
        <span className="slider" />
      </label>
    </div>
  );
}
