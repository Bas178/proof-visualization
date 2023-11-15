function Navibar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">ProofVisualization</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Documentation</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Showcase</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Playground</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">GitLab</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto"> {/* Added this ul for right-aligned items */}
              <li className="nav-item">
                <span className="nav-link">v1.0.4</span> {/* Display version here */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navibar;