export function truncate(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...'
  } else {
    return str
  }
}
