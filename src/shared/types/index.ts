export interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
  priority: number;
}

export interface ToolState {
  id: string;
  lastUsed: number;
  usageCount: number;
}

export interface KinshipRelation {
  path: string;
  title: string;
  gender: 'male' | 'female';
}

export interface DialogStyle {
  id: string;
  name: string;
  description: string;
}

export interface RedPacketRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  from: string;
  date: string;
  note?: string;
}

export interface Fortune {
  id: string;
  title: string;
  content: string;
  luck: '上上' | '上吉' | '中吉' | '下吉' | '末吉';
}
