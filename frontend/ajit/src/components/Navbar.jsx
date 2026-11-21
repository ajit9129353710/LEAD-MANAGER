import { useState } from "react";
import {
LayoutDashboard,
Users,
Target,
Menu,
X,
ChevronRight,
Sparkles,
} from "lucide-react";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => setMenuOpen(false);

return (
<>
<button
className="mobile-menu-button"
onClick={() => setMenuOpen(!menuOpen)}
aria-label="Toggle navigation"
>
{menuOpen ? <X size={23} /> : <Menu size={23} />}
</button>

  {menuOpen && (
    <div className="sidebar-backdrop" onClick={closeMenu}></div>
  )}

  <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
    <div className="brand">
      <div className="brand-icon">
        <Target size={25} strokeWidth={2.5} />
      </div>

      <div className="brand-text">
        <h2>LeadFlow</h2>
        <span>CRM PLATFORM</span>
      </div>
    </div>

    <div className="sidebar-divider"></div>

    <div className="sidebar-label">WORKSPACE</div>

    <nav className="sidebar-navigation">
      <a
        href="#dashboard"
        className="nav-link active"
        onClick={closeMenu}
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
        <ChevronRight className="nav-arrow" size={16} />
      </a>

      <a
        href="#leads"
        className="nav-link"
        onClick={closeMenu}
      >
        <Users size={20} />
        <span>All Leads</span>
        <ChevronRight className="nav-arrow" size={16} />
      </a>
    </nav>

    <div className="sidebar-spacer"></div>

    <div className="sidebar-promo">
      <div className="promo-icon">
        <Sparkles size={19} />
      </div>
      <h4>Manage Smarter</h4>
      <p>Keep all your customer relationships organized in one place.</p>
    </div>

    <div className="sidebar-divider"></div>

    <div className="sidebar-bottom">
      <div className="profile-avatar">A</div>

      <div className="profile-info">
        <h4>Admin</h4>
        <p>Lead Manager</p>
      </div>

      <div className="profile-status"></div>
    </div>

    <div className="sidebar-version">LEADFLOW CRM · VERSION 1.0</div>
  </aside>
</>

);
}

export default Navbar;