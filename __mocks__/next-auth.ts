type NextAuthReturn = {
  handlers: Record<string, unknown>
  auth: (...args: unknown[]) => Promise<unknown>
  signIn: (...args: unknown[]) => Promise<unknown>
  signOut: (...args: unknown[]) => Promise<unknown>
}

const noop = async () => undefined

const nextAuth = () : NextAuthReturn => ({
  handlers: {},
  auth    : noop,
  signIn  : noop,
  signOut : noop
})

export default nextAuth
