/* eslint-disable @typescript-eslint/no-unused-vars */
type QueryRecord = Record<string, string | null | undefined>

const decode = (value: string) => decodeURIComponent(value.replace(/\+/g, ' '))
const encode = (value: string) => encodeURIComponent(String(value))

const parse = (params: string): QueryRecord => {
  if (!params) return {}
  return params
    .replace(/^\?/, '')
    .split('&')
    .filter(Boolean)
    .reduce<QueryRecord>((acc, part) => {
      const [rawKey, rawValue = ''] = part.split('=')
      const key = decode(rawKey)
      acc[key] = decode(rawValue)
      return acc
    }, {})
}

const stringifyUrl = (
  { url, query }: { url: string; query: QueryRecord },
  options?: { skipNull?: boolean }
) => {
  const skipNull = options?.skipNull ?? false
  const search = Object.entries(query)
    .filter(([_, value]) => !(skipNull && (value === null || value === undefined)))
    .map(([key, value]) => `${encode(key)}=${value === undefined || value === null ? '' : encode(value)}`)
    .join('&')

  return search ? `${url}?${search}` : url
}

export { parse, stringifyUrl }

const qs = { parse, stringifyUrl }

export default qs
