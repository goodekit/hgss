export const CACHE_KEY = {
  products        : (page = 1) => `cache:products:page=${page}`,
  productById     : (id: string) => `cache:product:${id}`,
  productBySlug   : (slug: string) => `cache:product:${slug}`,
  featuredProducts: 'cache:products:featured',
  categories      : 'cache:categories:',
  myBag           : `cache:mybag:`,
  myBagId         : (id: string) => `cache:mybag:${id}`,
  galleries       : (page = 1) => `cache:galleries:page=${page}`,
  galleryById     : (id: string) => `cache:gallery:${id}`,
  galleryItems    : (page = 1) => `cache:galleryitems:page=${page}`,
  galleryItemById : (id: string) => `cache:galleryitem:${id}`,
  orders          : (page = 1) => `cache:orders:page=${page}`,
  myOrders        : (page = 1) => `cache:myorders:page=${page}`,
  orderById       : (id: string) => `cache:order:${id}`,
  orderSummary    : `cache:orders:summary`,
  users           : (page = 1) => `cache:users:page=${page}`,
  userById        : (id: string) => `cache: user:${id}`
}

export const CACHE_TTL = {
  default         : 300,
  products        : 300,
  productById     : 600,
  productBySlug   : 600,
  featuredProducts: 180,
  categories      : 300,
  myBag           : 600,
  galleries       : 300,
  galleryById     : 600,
  galleryItems    : 300,
  galleryItem     : 600,
  orders          : 300,
  myOrders        : 300,
  orderById       : 500,
  orderSummary    : 300,
  users           : 300,
  userById        : 600
}