
/**
 * converts Object with snake_case keys to camelCase
 */
export function camelizeKeys<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v)) as T;
  } else if (obj !== null && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),
        camelizeKeys(value),
      ])
    ) as T;
  }
  return obj as T;
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
