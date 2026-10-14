import "./MenuBtn.css";

const MenuBtn = ({ isOpen, toggleMenu }) => {
  return (
    <button
      type="button"
      className={`menu-toggle ${isOpen ? "opened" : "closed"}`}
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
    >
      <div className="menu-toggle-icon">
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy">
        <p>Menu</p>
      </div>
    </button>
  );
};

export default MenuBtn;
