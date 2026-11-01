export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });
}