import {CARD_TYPES, MEDIA_ASPECT_RATIOS} from '@zwirner/design-system'
import {format, isAfter, isValid, isWithinInterval, parse} from 'date-fns'
import Image from 'next/image'

import {LEARN_MORE} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

export const mapCardsGrid = (
  data: any[],
  options?: {
    enableZoom?: boolean
    useDatePrefix?: boolean
    showLinkCTA?: boolean
    disabledIds?: Array<string>
  }
) => {
  if (!data) {
    return []
  }
  const {
    enableZoom = false,
    useDatePrefix = true,
    showLinkCTA = false,
    disabledIds = [],
  } = options ?? {}

  return (
    data
      // TODO check this validate
      // .filter((exhibitionPageData) => validateImage(exhibitionPageData))
      .map((exhibitionPageData) => {
        const {
          _id,
          title,
          subtitle,
          startDate,
          slug,
          endDate,
          locations,
          displayDate,
          description,
          heroMedia,
        } = exhibitionPageData
        const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
        const {media, hideImage} = dzMediaMapper({
          data: heroMediaSource ?? exhibitionPageData,
          ImgElement: Image,
          options: {
            aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
          },
        })
        const descriptionSafeText = safeText({key: 'description', text: description})
        const isDisabled = disabledIds.includes(_id)
        const locationsTitle = locations?.map(({name}: {name: string}) => name).join(',')
        const exStartDate = parse(startDate, 'yyyy-MM-dd', new Date())
        const exEndDate = parse(endDate, 'yyyy-MM-dd', new Date())
        let exhibitionDateTitle = displayDate

        if (!displayDate && isValid(exStartDate) && isValid(exEndDate)) {
          const dateNow = new Date()
          let datePrefix = 'Upcoming: '

          try {
            if (isWithinInterval(dateNow, {start: exStartDate, end: exEndDate})) {
              datePrefix = 'Now Open: '
            } else if (isAfter(dateNow, exEndDate)) {
              datePrefix = ''
            }
          } catch {
            console.info('Error checking start and date interval')
          }

          const formattedFromDate = format(exStartDate, 'MMMMMM d')
          const formattedToDate = format(exEndDate, 'MMMMMM d, yyyy')
          exhibitionDateTitle = `${
            useDatePrefix ? datePrefix : ''
          }${formattedFromDate}-${formattedToDate}`
        }

        return {
          cardType: CARD_TYPES.CONTENT,
          enableZoom,
          id: _id,
          media,
          ...descriptionSafeText,
          hideImage,
          title,
          subtitle,
          secondaryTitle: locationsTitle,
          secondarySubtitle: exhibitionDateTitle,
          isDisabled,
          cardLink: {
            href: slug?.current,
          },
          linkCTA: showLinkCTA
            ? {
                text: LEARN_MORE,
                url: slug?.current,
              }
            : null,
        }
      })
  )
}
