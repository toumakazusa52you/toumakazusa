import { useState, useEffect } from 'react';
import { getNextCNY, getCountdown } from '@/shared/utils/countdown';
import { TOOLS } from '@/shared/constants';
import { storage } from '@/shared/utils/storage';
import { STORAGE_KEYS } from '@/shared/constants';
import { ToolState } from '@/shared/types';

export default function Overview() {
  const [countdown, setCountdown] = useState(getCountdown(getNextCNY()));
  const [toolStates, setToolStates] = useState<ToolState[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(getNextCNY()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const states = storage.get<ToolState[]>(STORAGE_KEYS.TOOL_STATES, []);
    setToolStates(states);
  }, []);

  const getToolState = (toolId: string) => {
    return toolStates.find(s => s.id === toolId);
  };

  const getToolStatusText = (toolId: string) => {
    const state = getToolState(toolId);
    if (!state) return '未使用';
    return `已使用 ${state.usageCount} 次`;
  };

  return (
    <div className="overview">
      <div className="countdown-section">
        <h1 className="countdown-title">距离2026年春节还有</h1>
        <div className="countdown-timer">
          <div className="countdown-item">
            <span className="countdown-value">{countdown.days}</span>
            <span className="countdown-label">天</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdown.hours}</span>
            <span className="countdown-label">时</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdown.minutes}</span>
            <span className="countdown-label">分</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdown.seconds}</span>
            <span className="countdown-label">秒</span>
          </div>
        </div>
      </div>

      <div className="tools-grid">
        <h2 className="grid-title">工具箱</h2>
        <div className="grid">
          {TOOLS.filter(tool => tool.id !== 'overview').map((tool) => (
            <a key={tool.id} href={tool.path} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-description">{tool.description}</p>
              <div className="tool-status">{getToolStatusText(tool.id)}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
