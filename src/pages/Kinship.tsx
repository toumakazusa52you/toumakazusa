import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KinshipLogic } from '../utils/kinshipLogic';

function Kinship() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const logic = new KinshipLogic();
    const chain = input.split('的').filter(word => word.trim() !== '');
    const relationship = logic.getRelationship(chain);
    setResult(relationship);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Link to="/" className="inline-block mb-8 text-black underline">返回首页</Link>
      <h1 className="text-4xl font-bold mb-8">亲戚计算器</h1>
      
      <div className="max-w-2xl">
        <div className="mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入关系，如：爸爸的爸爸"
            className="w-full p-4 border border-black mb-4"
          />
          
          <button
            onClick={handleCalculate}
            className="w-full p-4 bg-black text-white font-bold"
          >
            计算
          </button>
          
          {result && (
            <div className="mt-4 p-4 border border-black">
              <p className="text-xl font-bold">结果：{result}</p>
            </div>
          )}
        </div>

        <div className="border border-black p-6">
          <h2 className="text-2xl font-bold mb-4">使用说明</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">适用范围</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>直系亲属：父母、祖父母、曾祖父母、子女、孙子女等</li>
              <li>兄弟姐妹：哥哥、弟弟、姐姐、妹妹</li>
              <li>父亲的兄弟姐妹及配偶：伯伯、叔叔、姑姑、伯母、婶婶、姑父</li>
              <li>母亲的兄弟姐妹及配偶：舅舅、姨妈、舅妈、姨父</li>
              <li>堂亲：堂哥、堂弟、堂姐、堂妹（父亲兄弟的子女）</li>
              <li>表亲：表哥、表弟、表姐、表妹（父亲姐妹、母亲兄弟姐妹的子女）</li>
              <li>侄辈甥辈：侄子、侄女、外甥、外甥女</li>
              <li>姻亲：岳父、岳母、公公、婆婆、女婿、儿媳、嫂子、弟媳、姐夫、妹夫等</li>
              <li>其他远亲：伯祖父、叔祖父、姑祖母、舅公、姨婆等</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">功能特点</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>正向查询：输入关系链，返回称呼（如：爸爸的爸爸 → 爷爷）</li>
              <li>支持同义词：父亲、爸、爹等都会映射到"爸爸"</li>
              <li>支持复杂关系：支持多步关系链计算</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">注意事项</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>方言差异：主要基于普通话标准称呼，收录了一些常见方言（如姥爷、外公）</li>
              <li>复杂关系：非常复杂的关系可能无法直接计算，需要多步推导</li>
              <li>性别区分：计算时考虑性别因素（如儿子/女儿）</li>
              <li>同义词处理：将常见同义词映射到标准称呼</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kinship;
