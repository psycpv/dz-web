import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && defined(slug) && slug.current == $slug]{
  title,
  artist->{fullName},
  slug { current },
  surveySubpage {
    itemsPerRow,
    displayNumberOfResults,
    title,
    items[]->{${artworkFields}}
  },
  "seo": surveySeo {
    ${pageSEOFields}
  }
}`