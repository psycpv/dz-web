import {CARD_TYPES, MEDIA_ASPECT_RATIOS, MEDIA_OBJECT_FIT} from '@zwirner/design-system'
import Image from 'next/image'

import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {ArticleTypes, MediaTypes} from '@/sanity/types'

const formatDate = (date: string) => {
  const dateParsed = new Date(date)
  const monthPlusDay = dateParsed.toLocaleString('default', {month: 'long', day: 'numeric'})
  const year = dateParsed.getFullYear()
  return monthPlusDay && year ? `${monthPlusDay}, ${year}` : ''
}
export const articlesGridMap = (data: any[]) => {
  return data?.map((relatedArticles) => {
    const {
      _id,
      date,
      displayDate,
      description,
      subtitle,
      title,
      type,
      slug,
      _type,
      exhibition,
      externalURL,
      header,
      image,
    } = relatedArticles ?? {}
    const {current} = slug ?? {}
    const {summary, endDate, startDate} = exhibition ?? {}

    const isArticle = _type === 'article'

    const SharedMediaOptions = {
      objectFit: MEDIA_OBJECT_FIT.COVER,
      aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
    }

    const {type: headerImageType} = header?.[0] ?? {}
    const sourceImage = Object.values(MediaTypes).includes(headerImageType)
      ? header?.[0]
      : header?.[0]?.photos?.[0]

    const {media: articleMedia, hideMedia: hideImgArticle} = dzMediaMapper({
      data: type === ArticleTypes.INTERNAL ? sourceImage : image ?? relatedArticles,
      ImgElement: Image,
      options: SharedMediaOptions,
    })
    const {media: exhibitionMedia, hideMedia: hideImgExhibition} = dzMediaMapper({
      data: exhibition,
      ImgElement: Image,
      options: SharedMediaOptions,
    })

    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${EXHIBITIONS_URL}/${current}` : null
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : current
    const articleURL = isArticle ? urlToRedirect : null

    const articleDate = displayDate ? displayDate : isArticle && date ? formatDate(date) : null

    const cardDate = articleDate ?? new Date(startDate ?? endDate).getFullYear()
    const urlToContent = exhibitionURL ?? articleURL
    const secondaryTitleText = safeText({
      key: 'secondaryTitle',
      text: (isArticle ? subtitle : description) ?? summary,
    })
    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      media: isArticle ? articleMedia : exhibitionMedia ?? {},
      title,
      hideImage: isArticle ? hideImgArticle : hideImgExhibition,
      enableZoom: true,
      cardLink: {
        href: urlToContent,
      },
      ...secondaryTitleText,
      ...(isArticle ? safeText({key: 'description', text: description}) : {}),
      secondarySubtitle: cardDate,
    }
  })
}
