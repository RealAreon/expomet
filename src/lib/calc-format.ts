export function parseNum(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === "") return 0;
  const n = parseFloat(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function resultNumFormat(value: number, decimals?: number): string {
  if (!Number.isFinite(value)) return "0";
  const digits = decimals ?? (value > 10 ? 0 : 2);
  return value
    .toFixed(digits)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

export function formatWeight(value: number): string {
  return `${resultNumFormat(value, value > 50 ? 0 : 3)} кг.`;
}

export function formatLength(value: number): string {
  return `${resultNumFormat(value, value > 50 ? 0 : 3)} м.`;
}

export function formatSquare(value: number): string {
  return `${resultNumFormat(value)} м²`;
}

export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return "0 руб.";
  return `${Math.round(value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} руб.`;
}
