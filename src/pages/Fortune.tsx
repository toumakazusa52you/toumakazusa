import { useState } from 'react';
import { Link } from 'react-router-dom';

const fortuneData = [
    { type: "上上签", title: "天赐良缘", content: "喜鹊登枝报佳音，天赐良缘福满门。家和万事皆如意，喜气盈庭庆新春。" },
    { type: "上上签", title: "金玉满堂", content: "金玉满堂福寿长，财源广进达三江。吉星高照平安宅，瑞气盈门富贵昌。" },
    { type: "上上签", title: "龙腾四海", content: "龙腾四海展宏图，凤舞九天庆有余。吉日良时添福寿，春风得意乐安居。" },
    { type: "大吉", title: "吉祥如意", content: "吉祥如意福星照，瑞气临门好运交。心想事成多喜乐，家庭和睦乐逍遥。" },
    { type: "上上签", title: "福寿双全", content: "福如东海长流水，寿比南山不老松。双喜临门多吉庆，全家欢乐乐融融。" },
    { type: "大吉", title: "财源广进", content: "财源广进似春潮，生意兴隆步步高。吉人自有天相佑，福禄双全乐陶陶。" },
    { type: "上上签", title: "鸿运当头", content: "鸿运当头照四方，吉星高照福满堂。前程似锦多顺利，步步高升事业强。" },
    { type: "大吉", title: "喜气盈门", content: "喜气盈门福满庭，吉星高照好运迎。春风得意人欢笑，四季平安万事兴。" },
    { type: "上上签", title: "五福临门", content: "五福临门喜气扬，吉星高照福安康。家庭和睦多欢乐，事业顺利永吉祥。" },
    { type: "大吉", title: "万事亨通", content: "万事亨通如意来，吉星高照福门开。春风得意人欢笑，步步登高上瑶台。" }
];

function Fortune() {
    const [fortune, setFortune] = useState(fortuneData[0]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    const drawFortune = () => {
        setIsDrawing(true);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * fortuneData.length);
            setFortune(fortuneData[randomIndex]);
            setIsDrawing(false);
            setHasDrawn(true);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <Link to="/" className="inline-block mb-8 text-black underline">返回首页</Link>
            <h1 className="text-4xl font-bold mb-8">抽签</h1>

            <div className="mb-8 p-6 border border-gray-300 rounded-lg">
                {hasDrawn ? (
                    <>
                        <p className="text-lg mb-2"><strong>类型：</strong>{fortune.type}</p>
                        <p className="text-xl mb-4"><strong>标题：</strong>{fortune.title}</p>
                        <p className="text-lg whitespace-pre-line"><strong>签文：</strong>{fortune.content}</p>
                    </>
                ) : (
                    <p className="text-lg">点击下方按钮开始求签</p>
                )}
            </div>

            <button
                onClick={drawFortune}
                disabled={isDrawing || hasDrawn}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {hasDrawn ? "已求签" : (isDrawing ? "抽签中..." : "求签")}
            </button>
        </div>
    );
}

export default Fortune;
