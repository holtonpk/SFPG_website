export function timeSince(timestamp: number): string {
  const now: Date = new Date();
  const inputDate: Date = new Date(timestamp * 1000);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  const intervals: Array<[string, number]> = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
    ["s", 1],
  ];

  for (const [name, secondsInUnit] of intervals) {
    const interval: number = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${name} ago`;
    }
  }
  return "just now";
}
