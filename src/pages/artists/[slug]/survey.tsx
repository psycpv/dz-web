import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {getAllArtistSubPageSlugs} from '@/sanity/services/artist.service'
import {getArtworkByArtist} from '@/sanity/services/artwork.service'

interface AvailableArtworksCMS {
  artworksPage: any
}

interface PageProps {
  data: AvailableArtworksCMS
  preview: boolean
  slug: string | null
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function SurveyPage({data}: PageProps) {
  const subPageData = data?.artworksPage[0]?.surveySubpage ?? {}
  const pageData = {artworksGrid: subPageData || {items: []}, title: subPageData?.title}
  const parentPath = data?.artworksPage[0]?.slug?.current
  const parentPageTitle = data?.artworksPage?.[0]?.title
  const {seo} = subPageData ?? {}

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <SEOComponent data={seo} />
      <AvailableArtworksContainer data={pageData} />
    </ArtistsPageLayout>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistSubPageSlugs('survey')
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}} = ctx

  try {
    const data = await getArtworkByArtist({
      slug: `/artists/${params.slug}`,
    })

    return {
      props: {
        data: {
          artworksPage: data,
        },
        preview: false,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING ARTIST AVAILABLE ARTWORKS DATA:', e.message)
    return {
      props: {
        data: {
          artworksPage: [],
        },
        preview: false,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
