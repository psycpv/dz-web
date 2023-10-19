import {ButtonModes, ButtonVariant, EditorialType, SplitTypes} from '@zwirner/design-system'

export interface GlobalSEOScheme {
  _id: string
  globalSEOTitle: string | null
  globalSEODescription: string | null
  globalSEOImage: any
}

type CanonicalURL = {
  current: string
}
export interface PageSEOSchema {
  pageTitle?: string
  metaDescription?: string
  h1Header?: string
  canonicalURL?: CanonicalURL
  robotsNoIndex?: boolean
  robotsNoFollow?: boolean
  imageMeta?: any
  socialTitle?: string
  socialDescription?: string
  jsonLD?: JSONLDSchema
}

export interface ArticleSchema {
  title?: string
  images?: any
  author?: any
  publisherName?: string
  description?: string
  publisherLogo?: string
}

export interface RedirectSchema {
  from: string
  to: string
}

export interface ArtistPageSchemaProps {
  title: string
  slug: any
  seo: any
  artist: any
}

// UTILS

export interface BreadcrumbItemSchema {
  name: string
  item: string
}

export enum EditorialTextTypes {
  PARAGRAPH = 'paragraph',
  QUOTE = 'quote',
}

export enum CtaActions {
  INQUIRE = 'inquire',
  ECOMM = 'ecomm',
  CUSTOM = 'custom',
  NONE = 'none',
  NEWSLETTER = 'Newsletter',
  LINK = 'Link',
  DOWNLOAD_PDF = 'Download PDF',
  LINK_CONTENT = 'Link Content',
}

export enum ArticleCategories {
  PRESS = 'Press',
  NEWS = 'News',
  EVENT = 'Event',
  MUSEUM_EXHIBITION = 'Museum Exhibition',
  MUSEUM_HIGHLIGHTS = 'Museum Highlights',
}

export enum ArticleTypes {
  INTERNAL = 'internalNews',
  PRESS = 'pressRelease',
  EXTERNAL = 'externalNews',
}

export enum BookVariation {
  PRODUCT = 'productCard',
  CONTENT = 'contentCard',
}

export enum MediaTypes {
  IMAGE = 'Image',
  VIDEO = 'Custom Video',
  VIDEO_RECORD = 'Video Record',
}

export interface CTASchemaType {
  type: 'button' | 'link'
  action: CtaActions
  text: string
  link?: linkSchemaType
  variant?: ButtonVariant
}

export interface TextComplexSchemaType {
  text: string
  textType: any
}

export const SCHEMA_TYPE_JSON_LD = {
  ARTICLE: 'article',
  BREADCRUMB: 'breadcrumb',
  BLOG: 'blog',
  SITELINKS: 'sitelinks',
  MANUAL: 'manual',
}
export const JSON_LD_SCHEMA_TYPE_NAMES = [
  SCHEMA_TYPE_JSON_LD.ARTICLE,
  SCHEMA_TYPE_JSON_LD.BREADCRUMB,
  SCHEMA_TYPE_JSON_LD.BLOG,
  SCHEMA_TYPE_JSON_LD.SITELINKS,
  SCHEMA_TYPE_JSON_LD.MANUAL,
] as const

type SchemaType = (typeof JSON_LD_SCHEMA_TYPE_NAMES)[number]

interface SearchActionType {
  target: string
}

export interface JSONLDSchema {
  schemaType: SchemaType
  article?: any
  breadcrumbs?: BreadcrumbItemSchema[]
  searchPotentialActions?: SearchActionType[]
  manualSchema?: any
}

interface externalLinkType {
  href: string
  blank: boolean
}

export interface linkSchemaType {
  externalLink?: externalLinkType
  internalLink?: string
}

export enum ExhibitionPageStatus {
  COMING_SOON = 'comingSoon',
  OPEN = 'open',
  CLOSE = 'close',
}

// MOLECULES

export interface DzCardSchemaProps {
  title: string
  primaryCTA?: CTASchemaType
  secondaryCTA?: CTASchemaType
  primarySubtitle?: string
  secondarySubtitle?: string
  secondaryTitle?: string
  bookVariation?: BookVariation
  enableOverrides: boolean
  mediaOverride?: any
  additionalInformation?: any
}

export type DzCardExtendedProps = DzCardSchemaProps & {
  isOnGrid: boolean
  isSmall: boolean
  cardSize: any
}

export interface DzMediaSchemaProps {
  media: any
  title: string
  caption: string
}

export interface DzCarouselSchemaProps {
  title: string
  enableOverrides: boolean
}

export interface DzEditorialSchemaProps {
  title: string
  editorialType: EditorialType
  editorialTextOverrides?: TextComplexSchemaType[]
  editorialTextOverridesSimple?: any
  imageOverride?: any
  quoteTitle?: string
  quoteFootNote?: string
  reverse?: boolean
}

export interface GridMoleculeTypeProps {
  title: string
  wrap: boolean
  itemsPerRow: number
}

export interface DzHeroSchemaProps {
  title: string
  headingOverride?: string
  subHeadingOverride?: string
  secondaryTitleOverride?: string
  descriptionOverride?: string
  imageOverride?: any
  enableOverrides: boolean
}

export interface DzHeroCarouselSchemaProps {
  title: string
  headingOverride?: string
  pictures?: any
  enableOverrides: boolean
}

export interface DzInterstitialTypeProps {
  title: string
  mode: ButtonModes
  cta: any
  image: any
  subtitle: string
  eyebrow: string
}

export interface DzSplitTypeProps {
  titleOverride: string
  splitType: SplitTypes
  reverse: boolean
  animate: boolean
  media?: any
  enableOverrides: boolean
  primaryCTA?: CTASchemaType
  subtitleOverride?: string
}

export interface DzTitleTypeProps {
  title: string
  enableOverrides: boolean
}
