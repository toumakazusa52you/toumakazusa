import { useState } from 'react';
import { storage } from '@/shared/utils/storage';
import { STORAGE_KEYS } from '@/shared/constants';
import { KinshipRelation } from '@/shared/types';

const KINSHIP_DATABASE: Record<string, KinshipRelation> = {
  '父亲': { path: '父亲', title: '父亲', gender: 'male' },
  '母亲': { path: '母亲', title: '母亲', gender: 'female' },
  '祖父': { path: '父亲的父亲', title: '祖父', gender: 'male' },
  '祖母': { path: '父亲的母亲', title: '祖母', gender: 'female' },
  '外祖父': { path: '母亲的父亲', title: '外祖父', gender: 'male' },
  '外祖母': { path: '母亲的母亲', title: '外祖母', gender: 'female' },
  '伯父': { path: '父亲的哥哥', title: '伯父', gender: 'male' },
  '叔叔': { path: '父亲的弟弟', title: '叔叔', gender: 'male' },
  '姑姑': { path: '父亲的姐妹', title: '姑姑', gender: 'female' },
  '舅舅': { path: '母亲的兄弟', title: '舅舅', gender: 'male' },
  '姨妈': { path: '母亲的姐妹', title: '姨妈', gender: 'female' },
  '堂兄': { path: '伯父的儿子（比自己大）', title: '堂兄', gender: 'male' },
  '堂弟': { path: '伯父的儿子（比自己小）', title: '堂弟', gender: 'male' },
  '堂姐': { path: '伯父的女儿（比自己大）', title: '堂姐', gender: 'female' },
  '堂妹': { path: '伯父的女儿（比自己小）', title: '堂妹', gender: 'female' },
  '表兄': { path: '姑姑或姨妈的儿子（比自己大）', title: '表兄', gender: 'male' },
  '表弟': { path: '姑姑或姨妈的儿子（比自己小）', title: '表弟', gender: 'male' },
  '表姐': { path: '姑姑或姨妈的女儿（比自己大）', title: '表姐', gender: 'female' },
  '表妹': { path: '姑姑或姨妈的女儿（比自己小）', title: '表妹', gender: 'female' },
  '侄子': { path: '兄弟的儿子', title: '侄子', gender: 'male' },
  '侄女': { path: '兄弟的女儿', title: '侄女', gender: 'female' },
  '外甥': { path: '姐妹的儿子', title: '外甥', gender: 'male' },
  '外甥女': { path: '姐妹的女儿', title: '外甥女', gender: 'female' },
  '孙子': { path: '儿子的儿子', title: '孙子', gender: 'male' },
  '孙女': { path: '儿子的女儿', title: '孙女', gender: 'female' },
  '外孙': { path: '女儿的儿子', title: '外孙', gender: 'male' },
  '外孙女': { path: '女儿的女儿', title: '外孙女', gender: 'female' },
  '岳父': { path: '妻子的父亲', title: '岳父', gender: 'male' },
  '岳母': { path: '妻子的母亲', title: '岳母', gender: 'female' },
  '公公': { path: '丈夫的父亲', title: '公公', gender: 'male' },
  '婆婆': { path: '丈夫的母亲', title: '婆婆', gender: 'female' },
  '姐夫': { path: '姐姐的丈夫', title: '姐夫', gender: 'male' },
  '妹夫': { path: '妹妹的丈夫', title: '妹夫', gender: 'male' },
  '嫂子': { path: '哥哥的妻子', title: '嫂子', gender: 'female' },
  '弟妹': { path: '弟弟的妻子', title: '弟妹', gender: 'female' },
};

export default function Kinship() {
  const [inputMode, setInputMode] = useState<'text' | 'select'>('text');
  const [textQuery, setTextQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [result, setResult] = useState<KinshipRelation | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleTextSearch = () => {
    const trimmedQuery = textQuery.trim();
    if (!trimmedQuery) return;

    // 优化搜索逻辑，支持更多输入格式
    let found = Object.entries(KINSHIP_DATABASE).find(([key, value]) =>
      key.includes(trimmedQuery) || 
      trimmedQuery.includes(key) ||
      value.path.includes(trimmedQuery) ||
      trimmedQuery.includes(value.path)
    );

    // 如果没有找到，尝试更宽松的匹配
    if (!found) {
      const keywords = trimmedQuery.split(/的|\s+/).filter(k => k);
      if (keywords.length > 0) {
        found = Object.entries(KINSHIP_DATABASE).find(([key, value]) =>
          keywords.some(keyword => 
            key.includes(keyword) || 
            value.path.includes(keyword)
          )
        );
      }
    }

    if (found) {
      setResult(found[1]);
      saveToHistory(found[0]);
    } else {
      setResult(null);
    }
  };

  const handleSelectSearch = () => {
    if (selectedPath.length === 0) return;

    const pathStr = selectedPath.join('的');
    let found = Object.entries(KINSHIP_DATABASE).find(([key, value]) =>
      value.path === pathStr || value.path.includes(pathStr)
    );

    // 如果没有找到，尝试更宽松的匹配
    if (!found) {
      found = Object.entries(KINSHIP_DATABASE).find(([key, value]) =>
        pathStr.includes(value.path)
      );
    }

    if (found) {
      setResult(found[1]);
      saveToHistory(found[0]);
    } else {
      setResult(null);
    }
  };

  const saveToHistory = (title: string) => {
    const newHistory = [title, ...history.filter(h => h !== title)].slice(0, 10);
    setHistory(newHistory);
    storage.set(STORAGE_KEYS.KINSHIP_HISTORY, newHistory);
  };

  const loadFromHistory = (title: string) => {
    const found = KINSHIP_DATABASE[title];
    if (found) {
      setResult(found);
      setTextQuery(title);
    }
  };

  const handleGenerateDialog = () => {
    if (result) {
      window.location.href = `/dialog?relation=${encodeURIComponent(result.title)}`;
    }
  };

  return (
    <div className="kinship">
      <div className="page-header">
        <a href="/" className="back-link">
          ← 返回主页
        </a>
        <div className="kinship-header">
          <h1>👨‍👩‍👧‍👦 亲属关系查询</h1>
          <p>输入关系描述，快速找到正确的称呼</p>
        </div>
      </div>

      <div className="input-mode-toggle">
        <button
          className={`mode-btn ${inputMode === 'text' ? 'active' : ''}`}
          onClick={() => setInputMode('text')}
        >
          文字输入
        </button>
        <button
          className={`mode-btn ${inputMode === 'select' ? 'active' : ''}`}
          onClick={() => setInputMode('select')}
        >
          结构化选择
        </button>
      </div>

      {inputMode === 'text' ? (
        <div className="text-input-section">
          <input
            type="text"
            className="kinship-input"
            placeholder="例如：爸爸的哥哥、姑姑的儿子"
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTextSearch()}
          />
          <button className="search-btn" onClick={handleTextSearch}>
            查询
          </button>
        </div>
      ) : (
        <div className="select-input-section">
          <div className="relationship-builder">
            <div className="path-display">
              {selectedPath.length > 0 ? selectedPath.join(' 的 ') : '选择关系...'}
            </div>
            <div className="relationship-options">
              {['父亲', '母亲', '丈夫', '妻子', '儿子', '女儿', '哥哥', '弟弟', '姐姐', '妹妹'].map((rel) => (
                <button
                  key={rel}
                  className="rel-option-btn"
                  onClick={() => setSelectedPath([...selectedPath, rel])}
                >
                  {rel}
                </button>
              ))}
            </div>
            <button className="search-btn" onClick={handleSelectSearch}>
              查询
            </button>
            <button className="clear-btn" onClick={() => setSelectedPath([])}>
              清除
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="result-card">
          <div className="result-title">
            <span className="result-icon">{result.gender === 'male' ? '👨' : '👩'}</span>
            <span className="result-text">{result.title}</span>
          </div>
          <div className="result-path">关系路径：{result.path}</div>
          <button className="generate-dialog-btn" onClick={handleGenerateDialog}>
            💬 生成应对话术
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>查询历史</h3>
          <div className="history-list">
            {history.map((item, index) => (
              <button
                key={index}
                className="history-item"
                onClick={() => loadFromHistory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
