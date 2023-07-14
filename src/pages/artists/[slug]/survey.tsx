import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import ArtistSurveyPageContainer from '@/components/containers/pages/artists/survey/index'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworkByArtist.queries'
import {getAllArtistPageSlugs} from '@/sanity/services/artist.service'
import {getArtworkByArtist} from '@/sanity/services/artwork.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data: any
  preview: boolean
  querySlug: any
}

interface Query {
  [key: string]: string
}

export default function SurveyPage({data, preview, querySlug}: PageProps) {
  const [surveyData] = data ?? []
  const {seo} = surveyData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artworksDataByArtistSlug}
        params={querySlug}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_SURVEY}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveyPageContainer data={surveyData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {
    paths: paths.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}, preview = false} = ctx
  const querySlug = {
    slug: `/artists/${params.slug}`,
  }

  if (preview) {
    return {
      props: {
        data: null,
        preview,
        querySlug,
      },
    }
  }

  const data = await getArtworkByArtist(querySlug)

  return {
    props: {
      data,
      preview: false,
      querySlug: null,
    },
  }
}