import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from './builders/mediaBuilder'

// Must follow DzSplitTypeProps
export const dzSplitFields = groq`
  "_type": "dzSplit",
  'props': {
    title,
    splitType,
    reverse,
    animate,
    media {
      ${mediaBuilder}
    },
    enableOverrides,
    primaryCTA
  }
`
export const dzSplitProps = groq`
  _type == 'dzSplit' => {
    ${dzSplitFields}
  },
`

const SplitTypeSchema = z.enum(['tall', 'short'])

// TODO: define type instead any
// props: DzSplitPropsDataSchema
export const DzSplitPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  splitType: SplitTypeSchema,
  reverse: z.boolean(),
  animate: z.boolean(),
  media: z.nullable(z.any()),
  enableOverrides: z.boolean(),
  primaryCTA: z.nullable(z.any()),
})