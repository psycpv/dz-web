import {DefaultSeoProps, NextSeoProps} from 'next-seo'

import {builder} from '@/sanity/imageBuilder'
import {GlobalSEOScheme} from '@/sanity/types'
import {PageSEOSchema} from '@/sanity/types'
import {BreadcrumbItemSchema} from '@/sanity/types'

import {DEFAULT_SEO_PROPERTIES} from './constants'

export const defaultSeoMapper = (data: GlobalSEOScheme | undefined): DefaultSeoProps => {
  const {globalSEODescription, globalSEOImage, globalSEOTitle} = data ?? {}
  const {alt, asset} = globalSEOImage ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  const title = globalSEOTitle ?? DEFAULT_SEO_PROPERTIES.title
  const titleTemplate = `%s | ${title}`
  const description = globalSEODescription ?? DEFAULT_SEO_PROPERTIES?.description
  const imageOG = imgSrc
    ? {
        images: [
          {
            url: imgSrc,
            width: 800,
            height: 600,
            alt: alt,
            type: 'image/jpeg',
          },
        ],
      }
    : {}
  return {
    title,
    description,
    titleTemplate,
    defaultTitle: DEFAULT_SEO_PROPERTIES?.defaultTitle,
    openGraph: {
      ...DEFAULT_SEO_PROPERTIES.openGraph,
      title,
      description,
      ...imageOG,
    },
    languageAlternates: DEFAULT_SEO_PROPERTIES.languageAlternates,
    twitter: DEFAULT_SEO_PROPERTIES.twitter,
  }
}

export const perPageSeoMapper = (data: PageSEOSchema): NextSeoProps => {
  const {
    title: _title,
    pageTitle,
    metaDescription,
    canonicalURL,
    robotsNoIndex,
    robotsNoFollow,
    imageMeta,
    socialTitle,
    socialDescription,
    titleTemplate: _titleTemplate,
  } = data ?? {}

  const {alt, asset} = imageMeta ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const title = pageTitle || _title ? {title: (pageTitle || _title)?.slice(0, 160)} : {}
  const titleTemplate = _titleTemplate ? {titleTemplate: _titleTemplate} : {}
  const description = metaDescription ? {description: metaDescription} : {}
  const canonical = canonicalURL?.current
    ? `${DEFAULT_SEO_PROPERTIES?.canonical}${canonicalURL?.current}`
    : DEFAULT_SEO_PROPERTIES?.canonical

  const titleOG = socialTitle ? {title: socialTitle} : {}
  const descriptionOG = socialDescription ? {description: socialDescription} : {}

  const noindex = robotsNoIndex ?? false
  const nofollow = robotsNoFollow ?? false

  const imageOG = imgSrc
    ? {
        images: [
          {
            url: imgSrc,
            width: 800,
            height: 600,
            alt: alt,
            type: 'image/jpeg',
          },
        ],
      }
    : {}
  return {
    ...title,
    ...titleTemplate,
    ...description,
    canonical,
    noindex,
    nofollow,
    openGraph: {
      ...titleOG,
      ...descriptionOG,
      ...imageOG,
    },
  }
}

const getSanityImageLink = (image: any) => {
  const {asset} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  return imgSrc
}

const processImages = (images = []) => {
  return images?.map((image) => getSanityImageLink(image)).filter((value) => !!value)
}

export const articleJSONLDMapper = (data: any, url: string) => {
  const {author, description, images, publisherLogo, publisherName, title, _createdAt, _updatedAt} =
    data ?? {}
  const imagesSchema = processImages(images)
  const publisherLogoSchema = getSanityImageLink(publisherLogo)
  const {name} = author ?? {}
  return {
    url,
    title,
    images: imagesSchema,
    datePublished: _createdAt,
    dateModified: _updatedAt,
    authorName: [
      {
        name,
        // url: 'https://example.com',
      },
    ],
    publisherName,
    publisherLogo: publisherLogoSchema,
    description,
    isAccessibleForFree: true,
  }
}

const processBreadcrumbs = (breadcrumbs: BreadcrumbItemSchema[]) =>
  breadcrumbs?.map((breadcrumb, key) => ({
    position: key + 1,
    name: breadcrumb.name,
    item: breadcrumb.item,
  }))

export const breadcrumbsJSONLDMapper = (data: any) => {
  const itemListElements = processBreadcrumbs(data)
  return {
    itemListElements,
  }
}

const processAction = (actions: any) =>
  actions?.map((action: any) => ({target: action.target, queryInput: 'search_term_string'}))
export const searchBoxJSONLDMapper = (data: any, url: string) => {
  const potentialActions = processAction(data)
  return {
    url,
    potentialActions,
  }
}
