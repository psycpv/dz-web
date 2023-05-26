import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {UtopiaEditionsContainer} from '@/components/containers/utopiaEditions'
import {utopiaEditionsData} from '@/sanity/queries/utopiaEditions.queries'
import {getUtopiaEditions} from '@/sanity/services/utopiaEditions.service'

interface UtopiaDataCMS {
  utopiaData: any
}

interface PageProps {
  data: UtopiaDataCMS
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

export default function UtopiaEditions({data, preview}: PageProps) {
  const {utopiaData = []} = data
  const [utopia] = utopiaData ?? []
  const {seo} = utopia ?? {}

  if (preview) {
    return <PreviewPage query={utopiaEditionsData} seo={seo} type={PREVIEW_PAGE_TYPE.UTOPIA} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <UtopiaEditionsContainer data={utopia} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'consignments'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          utopiaData: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const consignmentsPage = await getUtopiaEditions()
    return {
      props: {
        data: {
          utopiaData: consignmentsPage,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING CONSIGNMENTS:', e?.response?.statusMessage)
    return {
      props: {
        data: {
          utopiaData: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}