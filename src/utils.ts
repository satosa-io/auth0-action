export function removeEmpty (obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}
