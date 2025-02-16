import { GLOBAL } from "hgss"

export const generateTitle = (title: string, page?: string) => {
    const SEPARATOR = GLOBAL.TITLE_SEPARATOR
    if (!page) return title
    return title + SEPARATOR + page
}