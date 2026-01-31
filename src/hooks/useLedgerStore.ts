import { useState, useEffect, useCallback } from 'react';

const RECORD_TYPE = {
  INCOME: '收入',
  EXPENSE: '支出'
};

const STORAGE_KEY = 'cny_ledger_data';
const INITIAL_AMOUNT_KEY = 'red_packet_initial_amount';

const useLedgerStore = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialAmount, setInitialAmount] = useState(0);

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const recordsWithDate = parsedData.map(record => ({
            ...record,
            time: new Date(record.time),
            userProvidedTime: record.userProvidedTime || false
          }));
          setRecords(recordsWithDate);
        }

        const savedInitialAmount = localStorage.getItem(INITIAL_AMOUNT_KEY);
        if (savedInitialAmount) {
          setInitialAmount(Number(savedInitialAmount));
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        setRecords([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromStorage();
  }, []);

  const saveToStorage = useCallback((newRecords) => {
    try {
      const serializableRecords = newRecords.map(record => ({
        ...record,
        time: record.time.toISOString()
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableRecords));
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  }, []);

  const addRecord = useCallback((recordData) => {
    const newRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      amount: Number(recordData.amount),
      type: recordData.type,
      name: recordData.name.trim(),
      time: new Date(recordData.time || Date.now()),
      note: recordData.note || '',
      userProvidedTime: !!recordData.time
    };

    const newRecords = [...records, newRecord];
    setRecords(newRecords);
    saveToStorage(newRecords);

    return newRecord;
  }, [records, saveToStorage]);

  const deleteRecord = useCallback((recordId) => {
    const newRecords = records.filter(record => record.id !== recordId);
    setRecords(newRecords);
    saveToStorage(newRecords);
  }, [records, saveToStorage]);

  const getSummary = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
      if (record.type === RECORD_TYPE.INCOME) {
        totalIncome += record.amount;
      } else if (record.type === RECORD_TYPE.EXPENSE) {
        totalExpense += record.amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: initialAmount + totalIncome - totalExpense,
      netBalance: totalIncome - totalExpense,
      count: records.length
    };
  }, [records, initialAmount]);

  const getRecordsByName = useCallback((name) => {
    return records
      .filter(record => record.name === name)
      .sort((a, b) => b.time - a.time);
  }, [records]);

  const getMonthlySummary = useCallback(() => {
    const monthlyData = {};

    records.forEach(record => {
      const monthKey = `${record.time.getFullYear()}-${record.time.getMonth() + 1}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          income: 0,
          expense: 0,
          records: []
        };
      }

      if (record.type === RECORD_TYPE.INCOME) {
        monthlyData[monthKey].income += record.amount;
      } else {
        monthlyData[monthKey].expense += record.amount;
      }

      monthlyData[monthKey].records.push(record);
    });

    return Object.values(monthlyData)
      .sort((a, b) => b.month.localeCompare(a.month));
  }, [records]);

  const clearAllRecords = useCallback(() => {
    setRecords([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setInitialAmountValue = useCallback((amount) => {
    const newAmount = Number(amount);
    setInitialAmount(newAmount);
    localStorage.setItem(INITIAL_AMOUNT_KEY, newAmount.toString());
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `红包账本_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [records]);

  const importData = useCallback((jsonData) => {
    try {
      const importedRecords = JSON.parse(jsonData);

      if (!Array.isArray(importedRecords)) {
        throw new Error('数据格式错误');
      }

      const formattedRecords = importedRecords.map(record => ({
        ...record,
        time: new Date(record.time),
        amount: Number(record.amount),
        userProvidedTime: record.userProvidedTime || false
      }));

      setRecords(formattedRecords);
      saveToStorage(formattedRecords);
      return true;
    } catch (error) {
      console.error('导入数据失败:', error);
      return false;
    }
  }, [saveToStorage]);

  return {
    records,
    RECORD_TYPE,
    isLoading,
    initialAmount,
    addRecord,
    deleteRecord,
    getSummary,
    getRecordsByName,
    getMonthlySummary,
    clearAllRecords,
    exportData,
    importData,
    setInitialAmount: setInitialAmountValue
  };
};

export default useLedgerStore;
