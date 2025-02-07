import { SORT } from './sort'


const LOCALE = {
    EN        : 'en',
    ENGLISH   : 'en-NZ',
    VIETNAMESE: 'vi-VN'
}

export const KEY = {
    DARK  : 'dark',
    LIGHT : 'light',
    SYSTEM: 'system',
    ...LOCALE,
    ...SORT
}