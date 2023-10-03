export function timeSince(timestamp: number): string {
  const now: Date = new Date();
  const inputDate: Date = new Date(timestamp);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  if (seconds < 5) {
    return "just now";
  }

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

  return "error";
}

export function generateRandomId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "numeric" }).format(
    date
  );
  const year = date.getFullYear().toString().slice(-2);

  return `${month}-${day}`;
}
