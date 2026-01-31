import { useState } from 'react';
import { storage } from '@/shared/utils/storage';
import { STORAGE_KEYS } from '@/shared/constants';
import type { Fortune as FortuneType } from '@/shared/types';

const FORTUNES: FortuneType[] = [
  { id: '1', title: '上上签', content: '龙年大吉，万事如意，财源广进，福星高照。', luck: '上上' },
  { id: '2', title: '上上签', content: '新春纳福，阖家欢乐，身体健康，心想事成。', luck: '上上' },
  { id: '3', title: '上吉签', content: '事业有成，步步高升，贵人相助，前程似锦。', luck: '上吉' },
  { id: '4', title: '上吉签', content: '爱情甜蜜，婚姻美满，家庭和睦，幸福安康。', luck: '上吉' },
  { id: '5', title: '中吉签', content: '学业进步，金榜题名，智慧增长，才华横溢。', luck: '中吉' },
  { id: '6', title: '中吉签', content: '财运亨通，生意兴隆，财源滚滚，富贵吉祥。', luck: '中吉' },
  { id: '7', title: '上上签', content: '平安顺遂，无病无灾，岁岁平安，年年有余。', luck: '上上' },
  { id: '8', title: '上吉签', content: '友谊长存，知己相伴，情深义重，天长地久。', luck: '上吉' },
  { id: '9', title: '中吉签', content: '春风得意，马到成功，一帆风顺，大展宏图。', luck: '中吉' },
  { id: '10', title: '上上签', content: '花开富贵，竹报平安，年年有余，岁岁平安。', luck: '上上' },
  { id: '11', title: '上吉签', content: '贵人相助，吉星高照，万事如意，心想事成。', luck: '上吉' },
  { id: '12', title: '中吉签', content: '家庭和睦，事业有成，财源广进，身体健康。', luck: '中吉' },
];

export default function Fortune() {
  const [currentFortune, setCurrentFortune] = useState<FortuneType | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const drawFortune = () => {
    const randomIndex = Math.floor(Math.random() * FORTUNES.length);
    const fortune = FORTUNES[randomIndex];
    
    setCurrentFortune(fortune);
    setShowPoster(false);

    updateToolUsage();
  };

  const updateToolUsage = () => {
    const toolStates = storage.get(STORAGE_KEYS.TOOL_STATES, []);
    const existingIndex = toolStates.findIndex((s: any) => s.id === 'fortune');
    
    if (existingIndex >= 0) {
      toolStates[existingIndex].usageCount += 1;
      toolStates[existingIndex].lastUsed = Date.now();
    } else {
      toolStates.push({
        id: 'fortune',
        lastUsed: Date.now(),
        usageCount: 1,
      });
    }
    
    storage.set(STORAGE_KEYS.TOOL_STATES, toolStates);
  };

  const sharePoster = () => {
    setShowPoster(true);
  };

  const getLuckColor = (luck: string) => {
    switch (luck) {
      case '上上': return '#ff4d4f';
      case '上吉': return '#ff7a45';
      case '中吉': return '#ffc53d';
      case '下吉': return '#73d13d';
      case '末吉': return '#40a9ff';
      default: return '#8c8c8c';
    }
  };

  return (
    <div className="fortune">
      <div className="page-header">
        <a href="/" className="back-link">
          ← 返回主页
        </a>
        <div className="fortune-header">
          <h1>🎋 吉签分享</h1>
          <p>抽取新年签文，分享你的好运</p>
        </div>
      </div>

      <div className="draw-section">
        {!currentFortune ? (
          <button className="draw-btn" onClick={drawFortune}>
            🎲 抽取签文
          </button>
        ) : (
          <div className="fortune-display">
            <div className="fortune-luck" style={{ color: getLuckColor(currentFortune.luck) }}>
              {currentFortune.luck}
            </div>
            <div className="fortune-content">
              {currentFortune.content}
            </div>
            <div className="fortune-actions">
              <button className="action-btn" onClick={drawFortune}>
                🔄 再抽一次
              </button>
              <button className="action-btn" onClick={sharePoster}>
                📤 生成海报
              </button>
            </div>
          </div>
        )}
      </div>

      {showPoster && currentFortune && (
        <div className="poster-section">
          <div className="poster-card">
            <div className="poster-header">
              <div className="poster-year">2026</div>
              <div className="poster-title">新春吉签</div>
            </div>
            <div className="poster-luck" style={{ color: getLuckColor(currentFortune.luck) }}>
              {currentFortune.luck}
            </div>
            <div className="poster-content">
              {currentFortune.content}
            </div>
            <div className="poster-footer">
              <div className="poster-date">
                {new Date().toLocaleDateString('zh-CN')}
              </div>
              <div className="poster-brand">新春生存演练</div>
            </div>
          </div>
          <button className="close-poster-btn" onClick={() => setShowPoster(false)}>
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
