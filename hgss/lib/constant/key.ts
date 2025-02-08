import { SORT } from './sort'


const LOCALE = {
    EN        : 'en',
    ENGLISH   : 'en-NZ',
    VIETNAMESE: 'vi-VN'
}

export const KEY = {
    ALL   : 'all',
    DARK  : 'dark',
    LIGHT : 'light',
    SYSTEM: 'system',
    ...LOCALE,
    ...SORT
}