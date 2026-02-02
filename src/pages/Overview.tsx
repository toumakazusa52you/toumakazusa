import { Link } from 'react-router-dom';

function Overview() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 new-year-title">新春工具集</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/kinship" className="new-year-card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2 text-red-800">亲戚计算器</h2>
          <p className="text-gray-600">计算亲戚关系</p>
        </Link>
        <Link to="/dialog" className="new-year-card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2 text-red-800">话术生成</h2>
          <p className="text-gray-600">生成应对亲朋话术</p>
        </Link>
        <Link to="/ledger" className="new-year-card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2 text-red-800">红包账本</h2>
          <p className="text-gray-600">记录红包收支</p>
        </Link>
        <Link to="/fortune" className="new-year-card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2 text-red-800">抽签</h2>
          <p className="text-gray-600">抽取新年签文</p>
        </Link>
      </div>
    </div>
  );
}

export default Overview;
