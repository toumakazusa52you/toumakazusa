export const STORAGE_KEYS = {
  TOOL_STATES: 'cny_tool_states',
  KINSHIP_HISTORY: 'cny_kinship_history',
  DIALOG_HISTORY: 'cny_dialog_history',
  RED_PACKETS: 'cny_red_packets',
  FORTUNE_HISTORY: 'cny_fortune_history',
} as const;

export const TOOLS: Array<{
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
  priority: number;
}> = [
  {
    id: 'overview',
    name: '全局概览',
    icon: '📊',
    description: '春节倒计时与工具状态',
    path: '/',
    priority: 5,
  },
  {
    id: 'kinship',
    name: '关系查询',
    icon: '👨‍👩‍👧‍👦',
    description: '亲属关系计算器',
    path: '/kinship',
    priority: 5,
  },
  {
    id: 'dialog',
    name: '话术生成',
    icon: '💬',
    description: 'AI应对亲戚话术',
    path: '/dialog',
    priority: 4,
  },
  {
    id: 'ledger',
    name: '红包账本',
    icon: '🧧',
    description: '红包收支记录',
    path: '/ledger',
    priority: 3,
  },
  {
    id: 'fortune',
    name: '吉签分享',
    icon: '🎋',
    description: '抽取新年签文',
    path: '/fortune',
    priority: 4,
  },
];
