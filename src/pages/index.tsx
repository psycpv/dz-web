import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {Home_SLUG} from '@/common/constants/gtmPageConstants'
import {HomeContainer} from '@/components/containers/home'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {homePage} from '@/sanity/queries/page/homePage'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {getHomePage} from '@/sanity/services/page/getHomePage'

interface PageProps {
  data: any
  preview: boolean
  slug: string | null
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Home({data, preview}: PageProps) {
  const {seo} = data ?? {}

  if (preview) {
    return <PreviewPage query={homePage} seo={seo} Container={HomeContainer} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <HomeContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: Home_SLUG}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        dataLayerProps: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const homePage = await getHomePage()
  const dataLayerProps = await getGTMPageLoadData(params)

  if (!homePage) return {notFound: true}

  return {
    props: {
      data: homePage,
      dataLayerProps: {
        ...dataLayerProps,
        page_data: {
          ...dataLayerProps?.page_data,
          site_section: 'home',
        },
      },
      preview,
      slug: params?.slug || null,
      token: null,
    },
    revalidate: 1,
  }
}
