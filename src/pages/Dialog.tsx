import { Link } from 'react-router-dom';
import { useState } from 'react';

const phrasesData = {
  "催婚": {
    "礼貌敷衍": [
      "谢谢关心，缘分到了自然就成。",
      "这个急不来，我还在努力寻找中。",
      "感情的事讲究水到渠成，我会留意的。",
      "现在工作比较忙，等稳定下来会考虑的。",
      "谢谢您的建议，我会认真考虑的。",
      "现在提倡晚婚晚育，我还不急。",
      "这种事情要看缘分，强求不来的。",
      "我爸妈都不急，您就别操心啦。",
      "现在新时代了，结婚不是唯一的选择。",
      "等遇到合适的人，一定会告诉您的。"
    ],
    "幽默自黑": [
      "我这不是在等着国家分配对象嘛！",
      "我要求不高，只是长得像吴彦祖、才华像周杰伦、性格像彭于晏而已。",
      "我怕我结婚了，您家孩子压力大，毕竟我这么优秀。",
      "我在等一个能忍受我所有缺点的人出现。",
      "听说现在结婚率低，我在为国家做贡献呢！",
      "我一个人祸害自己就够了，别去祸害别人了。",
      "这不是没找到像我一样优秀的人嘛！",
      "现在的年轻人不都流行单身贵族嘛，我就是贵族本族。",
      "我这不是为计划生育做贡献嘛，少生优生。",
      "我在等一个能像您一样关心我的人出现。"
    ],
    "发疯回怼": [
      "您家孩子不是也没结婚吗？要不先管管？",
      "您退休金多少？孩子一个月给您多少钱啊？",
      "您这么关心我，不如给我介绍个对象呗，要求不高，有车有房父母双亡。",
      "您家孩子什么时候要二胎啊？我看您挺闲的。",
      "我这不是怕结了婚像您一样天天操心别人家事嘛！",
      "您是不是打麻将又输了，拿我出气呢？",
      "我结婚您给我出彩礼/嫁妆吗？不出就别问了！",
      "您家孩子工作怎么样啊？工资涨了吗？领导喜欢吗？",
      "我觉得一个人挺好，至少不用伺候公婆/丈母娘。",
      "您说完了吗？说完了我去吃饭了。"
    ]
  },
  "工资": {
    "礼貌敷衍": [
      "还行，够自己花了。",
      "比上不足比下有余吧。",
      "马马虎虎，够生活就好。",
      "公司有规定不让说，不好意思。",
      "谢谢关心，我会继续努力的。",
      "今年经济不景气，能保住工作就不错了。",
      "刚够生活，还要继续努力。",
      "工资多少不重要，重要的是开心。",
      "这个话题有点敏感，咱们聊点别的吧。",
      "还行吧，反正饿不着。"
    ],
    "幽默自黑": [
      "说出来怕您笑话，还没您退休金高呢！",
      "工资就像大姨妈，一个月来一次，一周就没了。",
      "我的工资是商业机密，怕说出来吓到您。",
      "工资多少不重要，重要的是我工作得开心。",
      "我的工资只够买得起我现在的快乐。",
      "工资不高，但加班费挺高的，毕竟天天加班。",
      "我的工资配不上我的才华，所以我在等伯乐。",
      "工资多少无所谓，反正最后都是交给马云的。",
      "我的工资和我头发一样，越来越少。",
      "工资这事，就像我的发际线，不提也罢。"
    ],
    "发疯回怼": [
      "您退休金多少啊？够花吗？",
      "您孩子工资多少啊？有我的高吗？",
      "您这么关心我工资，是要给我介绍高薪工作吗？",
      "工资多少关您什么事？您要给我补差价吗？",
      "您是不是钱不够花了？怎么老问别人工资？",
      "我的工资多少不重要，重要的是您儿子还没对象吧？",
      "您这么闲，不如去管管自己孩子吧！",
      "我工资再低也比您儿子在家啃老强！",
      "您是不是打麻将输了，想找我借钱？",
      "我的工资够买您闭嘴的时间了！"
    ]
  },
  "学业": {
    "礼貌敷衍": [
      "还在努力中，谢谢关心。",
      "马马虎虎，还需要继续努力。",
      "学习是自己的事，我会尽力的。",
      "成绩还行，不过还有进步空间。",
      "谢谢关心，我会加油的。",
      "学习不能急，要一步一个脚印。",
      "老师说我进步空间很大。",
      "正在努力中，希望有好的结果。",
      "学习的事情急不来，顺其自然吧。",
      "我会尽自己最大努力的。"
    ],
    "幽默自黑": [
      "我的成绩和我的体重一样，稳中有升。",
      "老师说我是班里最有潜力的，因为进步空间最大。",
      "我的成绩就像股市，有涨有跌，但总体趋势向下。",
      "学习这种事，三分天注定，七分靠打拼，剩下九十分靠老师心情。",
      "我在等一个奇迹，比如考试那天突然开窍。",
      "我的成绩和我的游戏段位成反比，你懂的。",
      "老师说我是班里最稳定的，因为每次都倒数。",
      "我在用实践验证爱因斯坦的相对论——考试时间过得特别快。",
      "我的成绩就像我的发型，永远达不到预期。",
      "我在等待知识自己跑进我脑子里。"
    ],
    "发疯回怼": [
      "您家孩子考得怎么样啊？上清华北大了吧？",
      "您这么关心我学习，不如给我请个家教呗！",
      "您孩子工作找好了吗？工资多少啊？",
      "我学习好不好关您什么事？您要给我发奖学金吗？",
      "您是不是自己没上过大学，所以特别关心别人？",
      "我学习再差也比您孩子在家啃老强！",
      "您这么会教育，怎么没把自己孩子教育好？",
      "您家孩子结婚了吗？生孩子了吗？二胎了吗？",
      "我学习好不好不重要，重要的是您养老金够花吗？",
      "您是不是没事干了？怎么老盯着别人家孩子？"
    ]
  },
  "熊孩子": {
    "礼貌敷衍": [
      "孩子还小，不懂事很正常。",
      "活泼一点好，显得有生气。",
      "孩子嘛，活泼一点是好事。",
      "现在孩子都这样，精力旺盛。",
      "小孩子活泼一点挺好的。",
      "孩子还小，长大就好了。",
      "现在孩子都聪明，有自己想法。",
      "小孩子调皮一点正常。",
      "孩子活泼是健康的表现。",
      "小孩子嘛，不懂事，别介意。"
    ],
    "幽默自黑": [
      "这孩子比我小时候强多了，我小时候更皮。",
      "这孩子以后肯定有出息，这么小就会拆家了。",
      "这孩子是在练习当拆迁队队长呢！",
      "这孩子是在探索世界，虽然方式有点特别。",
      "这孩子是在测试家具的牢固程度。",
      "这孩子以后肯定能当领导，这么会指挥人。",
      "这孩子是在释放天性，虽然释放得有点彻底。",
      "这孩子是在练习成为未来的运动员。",
      "这孩子是在进行艺术创作，虽然画在了墙上。",
      "这孩子是在研究物理学，虽然研究对象是您家的古董。"
    ],
    "发疯回怼": [
      "您家孩子是不是有多动症啊？要不要去医院看看？",
      "您会不会教育孩子啊？这么没规矩！",
      "您家孩子这么皮，是不是遗传啊？",
      "您是不是管不住自己孩子啊？需要帮忙吗？",
      "您家孩子这样，以后怎么上学啊？",
      "您是不是太惯着孩子了？这么没大没小！",
      "您家孩子再这样，我可要打110了！",
      "您是不是觉得自己孩子这样很可爱啊？",
      "您家孩子是不是缺管教啊？",
      "您再不管管，我可要替您管管了！"
    ]
  }
};

const categories = Object.keys(phrasesData);
const attitudes = ["礼貌敷衍", "幽默自黑", "发疯回怼"];

function Dialog() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAttitude, setSelectedAttitude] = useState(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isAttitudeVisible, setIsAttitudeVisible] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedAttitude(null);
    setIsAttitudeVisible(true);
    setCurrentPhraseIndex(0);
  };

  const handleAttitudeSelect = (attitude) => {
    setSelectedAttitude(attitude);
    setCurrentPhraseIndex(0);
  };

  const getCurrentPhrase = () => {
    if (selectedCategory && selectedAttitude) {
      const phrases = phrasesData[selectedCategory][selectedAttitude];
      return phrases[currentPhraseIndex] || "暂无话术";
    }
    return "请先选择话题和应对态度";
  };

  const getCurrentPhraseList = () => {
    if (selectedCategory && selectedAttitude) {
      return phrasesData[selectedCategory][selectedAttitude] || [];
    }
    return [];
  };

  const changePhrase = () => {
    if (selectedCategory && selectedAttitude) {
      const phrases = getCurrentPhraseList();
      if (phrases.length > 1) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === currentPhraseIndex && phrases.length > 1);
        setCurrentPhraseIndex(newIndex);
      }
    }
  };

  const copyToClipboard = () => {
    const phrase = getCurrentPhrase();
    navigator.clipboard.writeText(phrase).then(() => {
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Link to="/" className="inline-block mb-8 text-black underline">返回首页</Link>
      
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 mt-6">
          <h1 className="text-4xl font-bold mb-2 text-red-700">春节话术生成器</h1>
          <p className="text-gray-600 text-lg">应对春节灵魂拷问，一招制敌！</p>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 bg-red-500 rounded-full"></div>
            <div className="w-8 h-1 bg-yellow-500 rounded-full mx-2"></div>
            <div className="w-24 h-1 bg-red-500 rounded-full"></div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-red-100 text-red-700 p-2 rounded-lg mr-2">第一步</span>
            选择话题分类
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-800 border border-red-200 hover:bg-red-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {isAttitudeVisible && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-2">第二步</span>
              选择应对态度
            </h2>
            <div className="flex flex-wrap gap-3">
              {attitudes.map(attitude => (
                <button
                  key={attitude}
                  onClick={() => handleAttitudeSelect(attitude)}
                  className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedAttitude === attitude
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  {attitude}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 md:p-8 mb-6 border-l-6 border-red-600 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedCategory && selectedAttitude
                  ? `${selectedCategory} · ${selectedAttitude}`
                  : "春节应对话术"}
              </h3>
              <div className="text-sm text-gray-500">
                {selectedCategory && selectedAttitude
                  ? `共 ${getCurrentPhraseList().length} 句话术`
                  : ""}
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-32 flex items-center justify-center">
              <p className="text-xl text-gray-800 text-center leading-relaxed">
                {getCurrentPhrase()}
              </p>
            </div>
            
            {selectedCategory && selectedAttitude && (
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {getCurrentPhraseList().map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentPhraseIndex ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={changePhrase}
              disabled={!selectedCategory || !selectedAttitude}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                selectedCategory && selectedAttitude
                  ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              换一句
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!selectedCategory || !selectedAttitude}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                selectedCategory && selectedAttitude
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              复制话术
            </button>
          </div>
        </section>

        {showCopyNotification && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg">
            已复制到剪贴板！
          </div>
        )}

        <footer className="mt-12 p-6 bg-white rounded-xl border border-red-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">使用说明</h3>
          <ol className="list-decimal pl-5 text-gray-600 space-y-2">
            <li>从上方选择春节常被问到的话题分类</li>
            <li>选择你想要的应对态度（礼貌敷衍、幽默自黑或发疯回怼）</li>
            <li>系统会显示对应的话术，点击"换一句"可随机切换</li>
            <li>点击"复制话术"可将当前话术复制到剪贴板</li>
          </ol>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>🎉 祝您春节应对自如，过个清净年！</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dialog;
