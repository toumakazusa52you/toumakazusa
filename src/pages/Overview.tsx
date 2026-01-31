import { Link } from 'react-router-dom';

function Overview() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl font-bold mb-8">新春工具集</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/kinship" className="p-6 border border-black hover:bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">亲戚计算器</h2>
          <p>计算亲戚关系</p>
        </Link>
        <Link to="/dialog" className="p-6 border border-black hover:bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">话术生成</h2>
          <p>生成应对亲朋话术</p>
        </Link>
        <Link to="/ledger" className="p-6 border border-black hover:bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">红包账本</h2>
          <p>记录红包收支</p>
        </Link>
        <Link to="/fortune" className="p-6 border border-black hover:bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">抽签</h2>
          <p>抽取新年签文</p>
        </Link>
      </div>
    </div>
  );
}

export default Overview;
