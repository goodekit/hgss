import { JSX, ReactNode } from 'react'
import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { CODE, ProductSchema, BagSchema, BagItemSchema, BagSchema, ShippingAddressSchema, OrderSchema, PaymentMethodSchema, OrderItemSchema, PaymentResultSchema, UpdateUserSchema, UpdateUserAccountSchema, UpdateProductSchema, ContactMessageSchema, GalleryItemSchema, GallerySchema, UpdateGallerySchema, UpdateGallerySchema, ResetPasswordSchema, ForgotPasswordSchema, SignUpSchema, SignInSchema } from 'lib/schema'
import { ReviewSchema } from 'lib/schema/review-schema'

declare global {
  export interface UserBase {
    name : string
    email: string
  }

  export interface User extends UserBase {
    id        : string
    role      : string
    avatar   ?: string
    updatedAt : Date
    createdAt : Date
  }
  export type FieldName    = Path<z.infer<TSchema>>
  export type SetFieldName = PathValue<TypeOf<TSchema>, Path<TSchema>>

  type   ImageArr        = { currentImages: string[]; index: number }
  type   ImageSolo       = { currentImages: string }
  export type ImageInput = ImageArr | ImageSolo

  export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
  export type ModuleType = 'admin' | 'user' | 'default'
  export type RoleType   = 'admin' | 'user'

  export interface Product extends z.infer<typeof ProductSchema> {
    id        : string
    rating    : string
    numReviews: number
    createdAt : Date
  }

  export interface Gallery extends z.infer<typeof GallerySchema> {
    id       : string
    createdAt: Date
    updatedAt: Date
  }

  export interface GalleryItem extends z.infer<typeof GalleryItemSchema> {
    id       : string
    createdAt: Date
    updatedAt: Date
  }

  export interface Order extends z.infer<typeof OrderSchema>  {
    id           : string
    createdAt    : Date
    isPaid       : boolean
    paidAt       : Date | null
    isDelivered  : boolean
    deliveredAt  : Date | null
    orderitems   : OrderItem[]
    user         : { name: string, email: string },
    paymentResult: PaymentResult
  }

  export interface Review extends z.infer<typeof ReviewSchema> {
    id        : string
    createdAt : Date
    user     ?: { name: string | null }
  }

  export type SignIn            = z.infer<typeof SignInSchema>
  export type SignUp            = z.infer<typeof SignUpSchema>
  export type Bag               = z.infer<typeof BagSchema>
  export type BagItem           = z.infer<typeof BagItemSchema>
  export type ContactMessage    = z.infer<typeof ContactMessageSchema>
  export type ShippingAddress   = z.infer<typeof ShippingAddressSchema>
  export type OrderItem         = z.infer<typeof OrderItemSchema>
  export type PaymentResult     = z.infer<typeof PaymentResultSchema>
  export type UpdateUser        = z.infer<typeof UpdateUserSchema>
  export type UpdateUserAccount = z.infer<typeof UpdateUserAccountSchema>
  export type CreateProduct     = z.infer<typeof ProductSchema>
  export type UpdateProduct     = z.infer<typeof UpdateProductSchema>
  export type ReviewType        = z.infer<typeof ReviewSchema>
  export type PaymentMethod     = z.infer<typeof PaymentMethodSchema>
  export type ForgotPassword    = z.infer<typeof ForgotPasswordSchema>
  export type ResetPassword     = z.infer<typeof ResetPasswordSchema>
  export type CreateGallery     = z.infer<typeof GallerySchema>
  export type CreateGalleryItem = z.infer<typeof GalleryItemSchema>
  export type UpdateGallery     = z.infer<typeof UpdateGallerySchema>
  export type UpdateGalleryItem = z.infer<typeof UpdateGalleryItemSchema>
  export type SalesData         = { month: string, totalSales: number }[]

  export type S3FolderName = 'product'| 'gallery'| 'banner' | 'upload'

  export interface TblCell {
    id        : string
    value     : string | JSX.Element | number | ReactNode
    align     : string
    className?: string
  }

  export interface TblCells<T extends number> {
    cells: TblCell[] & { length: T }
  }

  export interface PayPalOrderID {
    data    : { orderID: string }
    orderId?: string
  }

  export interface ReadonlyReactNode {
    children: Readonly<{ children: ReactNode }>
  }

  export interface ResponseMessage {
    code   : CODE
    success: boolean
    message: string
  }

  export interface ErrorResponseMessage {
    code   : CODE
    success: boolean
    message: AppError | string
  }

  export interface SystemResponse extends ResponseMessage {
    tag?: string
  }

  export interface SystemErrorResponse extends ErrorResponseMessage {
    tag?: string
  }

  export interface AppPagination {
    limit?: number
    page  : number
  }

  export interface AppDocuments extends AppPagination {
    query: string
  }

  export interface AppDocumentsFilters extends AppPagination {
    query    : string
    sort    ?: string
    category?: stiring
  }

  export interface AppResponse {
    success    : boolean
    code       : CODE
    message    : string
    redirectTo?: string
    data      ?: unknown
  }

  export interface AppPage<T> { page: T }
  export interface AppPageAction<T> extends AppPage<T> { limit?: number }
  export interface AppSearchPage<T> extends AppPage<T> { query?: string, category?: string, price?: string, rating?: string, sort?: string  }
  export interface AppOrdersAction<T> extends AppPage<T> { limit?: number, query: string }
  export interface AppUser<T> extends AppPage<T> { limit?: number, query: string }
  export interface AppProductsPage<T> extends AppPage<T> { query: string, category: string }
  export interface AppProductsAction<T> extends AppPage<T> { query: string, limit?: number,  category?: string, price?: string, rating?: string, sort?: string }

  export type AppError =
    | ZodError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError

  export type ButtonVariant = 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link' | null | undefined
  export type BadgeVariant  = 'default' | 'destructive' | 'outline' | 'secondary' | null | undefined
  export type ButtonSize    = 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  export type ButtonType    = 'submit' | 'button' | 'reset' | undefined

  export type ModuleFormType = 'create' | 'update'
  export type ProductForm = {
    type      : ModuleFormType
    product  ?: Product
    productId?: string
  }

  export type GalleryForm = {
    type      : ModuleFormType
    gallery  ?: Gallery
    galleryId?: string
  }

  export enum METHOD {
    GET    = 'get',
    POST   = 'post',
    PATCH  = 'patch',
    PUT    = 'put',
    DELETE = 'delete',
    OPTION = 'option'
  }
}
