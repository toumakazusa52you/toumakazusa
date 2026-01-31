export const getNextCNY = (): Date => {
  const now = new Date();
  const year = now.getFullYear();
  const cnyDate = getCNYDate(year);
  
  if (now < cnyDate) {
    return cnyDate;
  }
  return getCNYDate(year + 1);
};

export const getCNYDate = (year: number): Date => {
  const cnyDates: Record<number, string> = {
    2026: '2026-02-17',
    2027: '2027-02-06',
    2028: '2028-01-26',
    2029: '2029-02-13',
    2030: '2029-02-03',
  };
  
  return new Date(cnyDates[year] || `${year}-02-01`);
};

export const getCountdown = (targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};
