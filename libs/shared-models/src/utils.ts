// libs/shared-models/src/lib/utils.ts
export function formatMessage(author: string, content: string) {
  return `[${new Date().toLocaleTimeString()}] ${author}: ${content}`;
}