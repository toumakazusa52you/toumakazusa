import { useState, useEffect } from 'react';
import { storage } from '@/shared/utils/storage';
import { STORAGE_KEYS } from '@/shared/constants';

const DIALOG_STYLES = [
  { id: 'humor', name: '幽默风趣', description: '用幽默化解尴尬' },
  { id: 'polite', name: '礼貌得体', description: '传统礼貌回应' },
  { id: 'sharp', name: '犀利回怼', description: '机智反击' },
  { id: 'evasive', name: '巧妙回避', description: '转移话题' },
];

const COMMON_QUESTIONS = [
  { category: '工作', questions: ['工作怎么样？', '工资多少？', '什么时候升职？', '有没有年终奖？'] },
  { category: '感情', questions: ['有对象了吗？', '什么时候结婚？', '打算什么时候生孩子？', '二胎考虑了吗？'] },
  { category: '生活', questions: ['买房了吗？', '车子买了没？', '存款有多少？', '以后打算在哪发展？'] },
  { category: '其他', questions: ['你怎么胖了？', '怎么还不结婚？', '你看看别人家的孩子', '别老玩手机'] },
];

const DIALOG_TEMPLATES: Record<string, Record<string, string[]>> = {
  humor: {
    '工作': [
      '工作挺好的，老板说我是公司的开心果，每天负责给大家讲笑话！',
      '工资嘛，够买奶茶，偶尔还能加个珍珠！',
      '升职？我现在的职位是"快乐制造机"，已经到顶了！',
      '年终奖就是老板的微笑，无价之宝！',
      '工作嘛，就像打游戏，升级慢慢来，装备迟早会有的！',
      '工资刚好够养活我的兴趣爱好，这不就是最理想的状态嘛！',
      '升职？我觉得现在的岗位挺适合我的，每天都能学到新东西！',
      '年终奖啊，保密！不过够我买好几个游戏皮肤了！',
      '工作挺充实的，每天都像在解锁新成就！',
      '工资？够用就行，毕竟开心最重要嘛！',
      '升职的事啊，随缘啦，是金子总会发光的！',
      '年终奖？公司福利挺好的，发了不少好吃的！',
    ],
    '感情': [
      '对象在路上了，可能被堵车耽误了！',
      '结婚是大事，我得先跟我的猫商量一下！',
      '孩子？我现在还是个孩子呢！',
      '二胎？我的一胎还在天上排队呢！',
      '对象？我现在忙着提升自己，等我变优秀了，TA自然会来的！',
      '结婚？我还没玩够呢，再享受几年单身生活！',
      '孩子？先把自己养活好再说吧！',
      '二胎？我连一胎的奶粉钱都没攒够呢！',
      '对象嘛，宁缺毋滥，要找就找灵魂伴侣！',
      '结婚是两个人的事，得遇到对的人才行！',
      '孩子？等我有了稳定的生活再说吧！',
      '二胎？我现在连自己都照顾不好，还是算了吧！',
    ],
    '生活': [
      '房子？我住的是"梦想公寓"，每天做梦都在买房！',
      '车子？我有11路公交车，环保又健康！',
      '存款？我的存款是快乐，取之不尽用之不竭！',
      '发展？我正在向"快乐星球"发展！',
      '房子嘛，暂时租着住，压力小一点，生活质量高一点！',
      '车子？现在打车多方便啊，还不用考虑停车问题！',
      '存款？够应急就行，钱是赚不完的！',
      '发展？计划赶不上变化，先过好当下！',
      '房子？我觉得租房也挺好的，想搬哪就搬哪！',
      '车子？等我考到驾照再说吧！',
      '存款？秘密！不过够我出去旅游几次了！',
      '发展？走一步看一步，说不定有更好的机会呢！',
    ],
    '其他': [
      '胖？这叫"富态"，是有福气的象征！',
      '不结婚？我在等一个能看懂我笑话的人！',
      '别人家的孩子？我爸妈觉得我是限量版，独一无二！',
      '玩手机？我在学习如何用手机拯救世界！',
      '胖？说明我生活过得好啊，心宽体胖！',
      '不结婚？我现在过得挺滋润的，不想被约束！',
      '别人家的孩子？每个人都有自己的优点，我也有我的闪光点！',
      '别老玩手机？我在学习新知识呢！',
      '胖？冬天还能当暖宝宝，多实用！',
      '不结婚？婚姻是需要缘分的，急不来！',
      '别人家的孩子？我爸妈才不会拿我跟别人比呢！',
      '别老玩手机？我在跟朋友保持联系呢！',
    ],
  },
  polite: {
    '工作': [
      '工作挺顺利的，感谢您的关心！',
      '工资还可以，够日常开销了。',
      '还在努力中，希望能有好消息！',
      '公司今年效益不错，应该会有一些。',
      '工作挺稳定的，同事们都很友好，谢谢您的关心！',
      '工资待遇符合我的预期，感谢您的关注！',
      '升职的事还在努力，相信只要付出总会有收获的。',
      '年终奖公司会根据业绩发放，我也在期待中。',
      '工作氛围挺好的，每天都能学到新东西。',
      '工资足够我生活了，我很满足。',
      '升职需要积累经验，我会继续努力的。',
      '年终奖是公司对员工的认可，我会好好工作的。',
    ],
    '感情': [
      '目前单身，遇到合适的会考虑的。',
      '结婚是缘分，顺其自然就好。',
      '孩子的事情以后再考虑，现在先专注事业。',
      '暂时还没有这个计划，谢谢关心。',
      '感情的事要看缘分，我相信对的人会在对的时间出现。',
      '结婚是人生大事，我想再慎重考虑一下。',
      '孩子的事暂时还没提上日程，先把事业做好。',
      '二胎的事要考虑很多因素，暂时还没计划。',
      '我现在更注重个人成长，感情的事随缘吧。',
      '结婚需要双方都做好准备，我还在等待合适的时机。',
      '孩子是爱的结晶，需要在合适的条件下迎接他的到来。',
      '二胎？先把第一个孩子培养好再说吧。',
    ],
    '生活': [
      '还在努力攒钱，希望能早点买上。',
      '目前公共交通挺方便的，暂时没买。',
      '存了一些钱，主要是为了应急。',
      '还在考虑中，想找个更适合自己的地方。',
      '房子的事正在规划中，希望能早日实现。',
      '车子暂时没考虑，现在出行方式挺多的。',
      '存款不多，但足够应对日常开销和突发情况。',
      '发展方向还在探索中，想找到最适合自己的道路。',
      '房子是人生大事，需要谨慎考虑。',
      '车子？等需要的时候再买吧。',
      '存款是安全感的来源，我会继续努力的。',
      '发展？我想多尝试一些不同的可能性。',
    ],
    '其他': [
      '可能是最近工作比较忙，没太注意身材。',
      '结婚要看缘分，不急在一时。',
      '每个孩子都有自己的闪光点，我也在努力！',
      '好的，我这就放下手机陪您聊天。',
      '最近确实有点忙，没怎么运动，以后会注意的。',
      '结婚是缘分，强求不来的。',
      '每个人都有自己的成长轨迹，我会按照自己的节奏来。',
      '好的，您说，我听着。',
      '谢谢关心，我会注意保持身材的。',
      '结婚的事我会认真考虑的。',
      '我知道自己还有很多不足，会继续努力的。',
      '好的，我不玩手机了，专心陪您说话。',
    ],
  },
  sharp: {
    '工作': [
      '工作挺好的，您的工作怎么样？',
      '工资是商业机密，不便透露。',
      '升职要看能力和机会，急不来。',
      '年终奖看公司业绩，我不好说。',
      '工作的事就不劳您操心了，我自己会处理好的。',
      '工资多少不重要，重要的是我喜欢这份工作。',
      '升职的事嘛，是我的个人规划，就不多说了。',
      '年终奖是公司对我的认可，具体数字就不说了。',
      '工作挺好的，您最近怎么样？',
      '工资够花就行，说多了反而让人嫉妒。',
      '升职？时机到了自然会升的。',
      '年终奖？公司福利不错，挺满意的。',
    ],
    '感情': [
      '感情的事我自己会把握，您不用操心。',
      '结婚是我自己的事，我会自己安排。',
      '生孩子是人生大事，我会认真考虑。',
      '每个人都自己的节奏，我不急。',
      '感情的事别人说了不算，得看我自己的感受。',
      '结婚是两个人的事，不是单方面的决定。',
      '生孩子要考虑很多因素，不是想生就能生的。',
      '我的人生我做主，就不劳您费心了。',
      '感情的事随缘，强求不来。',
      '结婚？等我遇到真正想娶/嫁的人再说吧。',
      '生孩子？先把自己的人生过明白再说。',
      '我的感情生活我自己负责，谢谢您的关心。',
    ],
    '生活': [
      '买房要看经济条件，我会量力而行。',
      '买车不是必需品，我有更重要的事情要做。',
      '存款是个人隐私，不方便说。',
      '发展要看机会，我会好好把握。',
      '买房是大事，需要谨慎考虑，不能冲动。',
      '买车？我觉得现在公共交通挺方便的。',
      '存款多少是我的个人隐私，就不透露了。',
      '发展方向我有自己的规划，会一步一步来的。',
      '买房的事我会根据自己的经济情况决定。',
      '买车？等我需要的时候自然会买。',
      '存款？够花就行，数字不重要。',
      '发展？我相信只要努力，总会有好的结果。',
    ],
    '其他': [
      '每个人体型不同，健康最重要。',
      '结婚不是人生的全部，我有自己的规划。',
      '我不喜欢比较，每个人都有自己的路。',
      '手机是工具，我在处理重要事情。',
      '身材是我的个人问题，就不劳您费心了。',
      '结婚是我的选择，不是别人的期待。',
      '每个人都有自己的优点，何必拿来比较呢？',
      '我在手机上处理工作的事，不是在玩。',
      '健康就好，体型不重要。',
      '结婚是缘分，不是任务。',
      '我就是我，不一样的烟火。',
      '手机是现代生活的必需品，我在合理使用。',
    ],
  },
  evasive: {
    '工作': [
      '还行还行，您最近身体怎么样？',
      '够用够用，对了，您最近在忙什么？',
      '慢慢来嘛，对了，您最近去旅游了吗？',
      '应该会有，对了，您最近身体还好吧？',
      '工作挺充实的，对了，您家孩子最近怎么样？',
      '工资嘛，够生活了，对了，您最近在忙什么呢？',
      '升职的事不急，对了，您最近有什么好玩的事吗？',
      '年终奖应该会有的，对了，您最近身体好吗？',
      '工作挺顺利的，对了，您最近怎么样？',
      '工资还可以，对了，您最近在忙什么？',
      '升职的事看机会，对了，您最近有什么计划吗？',
      '年终奖的事公司还没说，对了，您最近身体好吗？',
    ],
    '感情': [
      '缘分到了自然就有了，对了，您家孩子怎么样？',
      '不急不急，对了，您最近身体怎么样？',
      '以后再说，对了，您最近有什么新鲜事？',
      '看情况吧，对了，您最近过得怎么样？',
      '感情的事随缘，对了，您最近怎么样？',
      '结婚的事不急，对了，您家孩子最近怎么样？',
      '孩子的事以后再说，对了，您最近身体好吗？',
      '二胎的事看情况，对了，您最近有什么好玩的事吗？',
      '感情的事慢慢来，对了，您最近怎么样？',
      '结婚的事看缘分，对了，您最近在忙什么？',
      '孩子的事暂时没考虑，对了，您最近身体好吗？',
      '二胎的事以后再说，对了，您最近有什么新鲜事？',
    ],
    '生活': [
      '还在看，对了，您最近身体怎么样？',
      '暂时没买，对了，您最近有什么安排？',
      '存了一些，对了，您最近有什么新鲜事？',
      '还在考虑，对了，您最近身体还好吧？',
      '房子的事正在看，对了，您最近怎么样？',
      '车子暂时没考虑，对了，您最近在忙什么？',
      '存款够应急了，对了，您最近有什么好玩的事吗？',
      '发展方向还在考虑，对了，您最近身体好吗？',
      '房子的事慢慢来，对了，您最近怎么样？',
      '车子暂时没计划，对了，您最近在忙什么？',
      '存款还行，对了，您最近有什么新鲜事？',
      '发展方向还在探索，对了，您最近身体好吗？',
    ],
    '其他': [
      '可能吧，对了，您最近身体怎么样？',
      '不急不急，对了，您家孩子怎么样？',
      '各有各的好，对了，您最近有什么安排？',
      '好的好的，对了，您最近有什么新鲜事？',
      '也许吧，对了，您最近怎么样？',
      '结婚的事不急，对了，您家孩子最近怎么样？',
      '每个人都有自己的特点，对了，您最近身体好吗？',
      '好的，我不玩了，对了，您最近有什么好玩的事吗？',
      '可能最近没注意，对了，您最近怎么样？',
      '结婚的事看缘分，对了，您最近在忙什么？',
      '每个人都有自己的优点，对了，您最近身体好吗？',
      '好的，我放下手机，对了，您最近有什么新鲜事？',
    ],
  },
};

export default function Dialog() {
  const [selectedCategory, setSelectedCategory] = useState('工作');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('humor');
  const [generatedDialog, setGeneratedDialog] = useState('');
  const [history, setHistory] = useState<Array<{ question: string; answer: string; time: number }>>([]);
  const [relation, setRelation] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const relationParam = params.get('relation');
    if (relationParam) {
      setRelation(relationParam);
      setCustomQuestion(`面对${relationParam}的询问`);
    }

    const savedHistory = storage.get(STORAGE_KEYS.DIALOG_HISTORY, []);
    setHistory(savedHistory);
  }, []);

  const handleGenerate = () => {
    const question = customQuestion || selectedQuestion;
    if (!question) return;

    try {
      // 模板模式
      const templates = DIALOG_TEMPLATES[selectedStyle];
      const categoryTemplates = templates[selectedCategory] || templates['其他'];
      const randomIndex = Math.floor(Math.random() * categoryTemplates.length);
      let answer = categoryTemplates[randomIndex];

      // 如果有关系参数，根据关系调整话术
      if (relation) {
        // 根据不同关系调整话术开头
        const relationPrefixes: Record<string, string> = {
          '父亲': '爸爸，',
          '母亲': '妈妈，',
          '祖父': '爷爷，',
          '祖母': '奶奶，',
          '外祖父': '姥爷，',
          '外祖母': '姥姥，',
          '伯父': '伯父，',
          '叔叔': '叔叔，',
          '姑姑': '姑姑，',
          '舅舅': '舅舅，',
          '姨妈': '姨妈，',
          '堂兄': '哥，',
          '堂弟': '弟，',
          '堂姐': '姐，',
          '堂妹': '妹，',
          '表兄': '哥，',
          '表弟': '弟，',
          '表姐': '姐，',
          '表妹': '妹，',
          '侄子': '侄子，',
          '侄女': '侄女，',
          '外甥': '外甥，',
          '外甥女': '外甥女，',
          '孙子': '孙子，',
          '孙女': '孙女，',
          '外孙': '外孙，',
          '外孙女': '外孙女，',
          '岳父': '爸，',
          '岳母': '妈，',
          '公公': '爸，',
          '婆婆': '妈，',
          '姐夫': '姐夫，',
          '妹夫': '妹夫，',
          '嫂子': '嫂子，',
          '弟妹': '弟妹，',
        };

        const prefix = relationPrefixes[relation] || '';
        answer = prefix + answer;
      }

      setGeneratedDialog(answer);

      const newHistory = [
        { question, answer, time: Date.now() },
        ...history.slice(0, 9),
      ];
      setHistory(newHistory);
      storage.set(STORAGE_KEYS.DIALOG_HISTORY, newHistory);

      updateToolUsage();
    } catch (error) {
      console.error('生成失败:', error);
      alert('生成失败，请重试。');
    }
  };

  const updateToolUsage = () => {
    const toolStates = storage.get(STORAGE_KEYS.TOOL_STATES, []);
    const existingIndex = toolStates.findIndex((s: any) => s.id === 'dialog');
    
    if (existingIndex >= 0) {
      toolStates[existingIndex].usageCount += 1;
      toolStates[existingIndex].lastUsed = Date.now();
    } else {
      toolStates.push({
        id: 'dialog',
        lastUsed: Date.now(),
        usageCount: 1,
      });
    }
    
    storage.set(STORAGE_KEYS.TOOL_STATES, toolStates);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDialog);
    alert('已复制到剪贴板！');
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="dialog">
      <div className="page-header">
        <a href="/" className="back-link">
          ← 返回主页
        </a>
        <div className="dialog-header">
          <h1>💬 话术生成器</h1>
          <p>帮你应对亲戚的"关心"</p>
        </div>
      </div>

      <div className="dialog-config">
        <div className="config-section">
          <h3>选择问题类型</h3>
          <div className="category-tabs">
            {COMMON_QUESTIONS.map((cat) => (
              <button
                key={cat.category}
                className={`category-tab ${selectedCategory === cat.category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.category)}
              >
                {cat.category}
              </button>
            ))}
          </div>
          <div className="question-list">
            {COMMON_QUESTIONS.find(c => c.category === selectedCategory)?.questions.map((q) => (
              <button
                key={q}
                className={`question-item ${selectedQuestion === q ? 'active' : ''}`}
                onClick={() => setSelectedQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h3>自定义问题</h3>
          <input
            type="text"
            className="custom-question-input"
            placeholder="输入自定义问题..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
          />
        </div>

        <div className="config-section">
          <h3>选择话术风格</h3>
          <div className="style-grid">
            {DIALOG_STYLES.map((style) => (
              <button
                key={style.id}
                className={`style-card ${selectedStyle === style.id ? 'active' : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className="style-icon">
                  {style.id === 'humor' && '😄'}
                  {style.id === 'polite' && '🤝'}
                  {style.id === 'sharp' && '⚡'}
                  {style.id === 'evasive' && '🔄'}
                </div>
                <div className="style-name">{style.name}</div>
                <div className="style-desc">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerate}
        >
          生成话术
        </button>
      </div>

      {generatedDialog && (
        <div className="result-section">
          <div className="result-card">
            <div className="result-header">
              <h3>生成的话术</h3>
              <div className="result-actions">
                <button className="action-btn" onClick={handleCopy}>
                  📋 复制
                </button>
                <button className="action-btn" onClick={handleRegenerate}>
                  🔄 重新生成
                </button>
              </div>
            </div>
            <div className="result-content">
              {generatedDialog}
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>生成历史</h3>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-question">{item.question}</div>
                <div className="history-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}