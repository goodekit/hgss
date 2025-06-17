export const CACHE_KEY = {
  products        : (page = 1) => `cache:products:page=${page}`,
  productById     : (id: string) => `cache:product:${id}`,
  productBySlug   : (slug: string) => `cache:product:${slug}`,
  featuredProducts: 'cache:products:featured',
  categories      : 'cache:categories:'
}

export const CACHE_TTL = {
  default         : 300,
  products        : 300,
  productById     : 600,
  productBySlug   : 600,
  featuredProducts: 180,
  categories      : 300
}