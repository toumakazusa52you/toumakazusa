import { useState, useEffect } from 'react';
import { storage } from '@/shared/utils/storage';
import { STORAGE_KEYS } from '@/shared/constants';
import { RedPacketRecord } from '@/shared/types';
import { formatCurrency, formatDateTime } from '@/shared/utils/format';

export default function Ledger() {
  const [records, setRecords] = useState<RedPacketRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showInitialBalanceForm, setShowInitialBalanceForm] = useState(false);
  const [initialBalance, setInitialBalance] = useState('');
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    from: '',
    note: '',
  });

  useEffect(() => {
    const savedRecords = storage.get<RedPacketRecord[]>(STORAGE_KEYS.RED_PACKETS, []);
    setRecords(savedRecords);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: RedPacketRecord = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      from: formData.from,
      date: new Date().toISOString(),
      note: formData.note,
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    storage.set(STORAGE_KEYS.RED_PACKETS, updatedRecords);

    setFormData({
      type: 'income',
      amount: '',
      from: '',
      note: '',
    });
    setShowForm(false);

    updateToolUsage();
  };

  const handleInitialBalance = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!initialBalance) return;

    const balanceRecord: RedPacketRecord = {
      id: Date.now().toString(),
      type: 'income',
      amount: parseFloat(initialBalance),
      from: '初始余额',
      date: new Date().toISOString(),
      note: '自定义初始余额',
    };

    const updatedRecords = [balanceRecord, ...records];
    setRecords(updatedRecords);
    storage.set(STORAGE_KEYS.RED_PACKETS, updatedRecords);

    setInitialBalance('');
    setShowInitialBalanceForm(false);
  };

  const handleDelete = (id: string) => {
    const updatedRecords = records.filter(r => r.id !== id);
    setRecords(updatedRecords);
    storage.set(STORAGE_KEYS.RED_PACKETS, updatedRecords);
  };

  const updateToolUsage = () => {
    const toolStates = storage.get(STORAGE_KEYS.TOOL_STATES, []);
    const existingIndex = toolStates.findIndex((s: any) => s.id === 'ledger');
    
    if (existingIndex >= 0) {
      toolStates[existingIndex].usageCount += 1;
      toolStates[existingIndex].lastUsed = Date.now();
    } else {
      toolStates.push({
        id: 'ledger',
        lastUsed: Date.now(),
        usageCount: 1,
      });
    }
    
    storage.set(STORAGE_KEYS.TOOL_STATES, toolStates);
  };

  const calculateSummary = () => {
    const income = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
    const expense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  };

  const summary = calculateSummary();

  return (
    <div className="ledger">
      <div className="page-header">
        <a href="/" className="back-link">
          ← 返回主页
        </a>
        <div className="ledger-header">
          <h1>🧧 红包账本</h1>
          <p>记录春节红包收支，轻松管理人情账</p>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-label">总收入</div>
          <div className="card-value">{formatCurrency(summary.income)}</div>
        </div>
        <div className="summary-card expense">
          <div className="card-label">总支出</div>
          <div className="card-value">{formatCurrency(summary.expense)}</div>
        </div>
        <div className="summary-card balance">
          <div className="card-label">结余</div>
          <div className="card-value">{formatCurrency(summary.balance)}</div>
        </div>
      </div>

      <div className="ledger-actions">
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '取消' : '+ 添加记录'}
        </button>
        <button className="add-btn" onClick={() => setShowInitialBalanceForm(!showInitialBalanceForm)}>
          {showInitialBalanceForm ? '取消' : '设置初始余额'}
        </button>
      </div>

      {showForm && (
        <form className="record-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>类型</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'income' })}
              >
                收入
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'expense' })}
              >
                支出
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>金额</label>
            <input
              type="number"
              step="0.01"
              placeholder="请输入金额"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>{formData.type === 'income' ? '来源' : '对象'}</label>
            <input
              type="text"
              placeholder={formData.type === 'income' ? '例如：爷爷、姑姑' : '例如：侄子、外甥'}
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>备注（可选）</label>
            <input
              type="text"
              placeholder="例如：压岁钱、拜年红包"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn">
            保存记录
          </button>
        </form>
      )}

      {showInitialBalanceForm && (
        <form className="record-form" onSubmit={handleInitialBalance}>
          <div className="form-group">
            <label>初始余额</label>
            <input
              type="number"
              step="0.01"
              placeholder="请输入初始余额"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            设置初始余额
          </button>
        </form>
      )}

      <div className="records-list">
        <h3>记录明细</h3>
        {records.length === 0 ? (
          <div className="empty-state">
            <p>暂无记录，点击上方按钮添加第一条记录</p>
          </div>
        ) : (
          <div className="records">
            {records.map((record) => (
              <div key={record.id} className="record-item">
                <div className="record-icon">
                  {record.type === 'income' ? '📥' : '📤'}
                </div>
                <div className="record-info">
                  <div className="record-from">{record.from}</div>
                  <div className="record-date">{formatDateTime(record.date)}</div>
                  {record.note && <div className="record-note">{record.note}</div>}
                </div>
                <div className="record-amount">
                  {record.type === 'income' ? '+' : '-'}{formatCurrency(record.amount)}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(record.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
