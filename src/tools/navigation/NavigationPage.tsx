import { TOOLS } from '@/shared/constants';

export default function NavigationPage() {
  return (
    <div className="navigation-page">
      <div className="navigation-header">
        <h1>🧨 新春生存演练</h1>
        <p>选择你需要的工具</p>
      </div>
      
      <div className="navigation-grid">
        {TOOLS.filter(tool => tool.id !== 'overview').map((tool) => (
          <a key={tool.id} href={tool.path} className="navigation-card">
            <div className="navigation-icon">{tool.icon}</div>
            <div className="navigation-name">{tool.name}</div>
            <div className="navigation-description">{tool.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}