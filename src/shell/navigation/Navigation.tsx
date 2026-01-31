import { TOOLS } from '@/shared/constants';

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">🧨</span>
          <span className="brand-text">新春生存演练</span>
        </div>
        <div className="nav-links">
          {TOOLS.map((tool) => (
            <a key={tool.id} href={tool.path} className="nav-link">
              <span className="nav-icon">{tool.icon}</span>
              <span className="nav-text">{tool.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
