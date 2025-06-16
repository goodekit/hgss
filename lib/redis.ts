import { Redis } from '@upstash/redis'
import { GLOBAL } from 'hgss'

const { REST_URL, REST_TOKEN } = GLOBAL.REDIS.UPSTASH

const redis = new Redis({
  url  : REST_URL,
  token: REST_TOKEN
})

export default redis
