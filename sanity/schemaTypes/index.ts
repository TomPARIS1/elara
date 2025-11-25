import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { ratingType } from './ratingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, blockContentType, orderType, salesType, ratingType,],
}
