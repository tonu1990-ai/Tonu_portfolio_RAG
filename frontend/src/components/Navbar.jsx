
function Navbar({name}) {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <div className="logo">{name}</div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About me</a></li>
          <li><a href="#projects">AI Works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
