export function RouteLoader() {
  return (
    <div className="route-loader-screen" role="status" aria-live="polite" aria-label="Loading page">
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls" aria-hidden="true">
            <span className="control close" />
            <span className="control minimize" />
            <span className="control maximize" />
          </div>
        </div>
        <div className="text">please wait...</div>
      </div>
    </div>
  );
}
