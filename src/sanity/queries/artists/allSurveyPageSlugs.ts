import {groq} from 'next-sanity'
import {z} from 'zod'

export const allSurveyPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(surveySubpage)]{
  "params": {
    "slug": slug.current
  }
}`

export const AllSurveyPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)