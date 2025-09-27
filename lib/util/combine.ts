const  _trim            = (s: string) => s.replace(/^\/+|\/+$/g, '')
export const combine    = (...parts: string[]) => '/' + parts.map(_trim).join('/')
export const combineUrl = (baseUrl: string, ...parts: string[]) => {
  return [_trim(baseUrl), ...parts.map(_trim)].join('/')
}