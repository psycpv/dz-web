import {SanityClient} from 'next-sanity'

import {
  fairPageBySlug,
  FairPageBySlugPropsSchema,
  FairPageBySlugPropsType,
  FairPageBySlugSchema,
} from '@/sanity/queries/fairs/fairPageBySlug'

export async function getFairPageBySlug(client: SanityClient, params: FairPageBySlugPropsType) {
  const validatedParams = FairPageBySlugPropsSchema.parse(params)
  const data = await client.fetch(fairPageBySlug, validatedParams)
  if (!data) return null
  const validatedData = FairPageBySlugSchema.parse(data)
  return validatedData
}
