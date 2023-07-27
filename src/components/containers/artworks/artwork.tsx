import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'
import {FC} from 'react'
import {} from './mapper'

interface ArtworkContainerProps {
  data: any
}

export const ArtworkContainer: FC<ArtworkContainerProps> = ({data}) => {
  const {
    title,
    // displayCustomTitle,
    // displayTitle,
    // displayDate,
    // dateSelection,
    // edition,
    // editionInformation,
    // salesInformation,
    // productInformation,
    // copyrightInformation,
    // artworkCTA,
    // currency,
    // medium,
    // framed,
    // dimensions,
    // framedDimensions,
    // availability,
    // artists,
    // photos,
    // description,
    // artworkType,
  } = data ?? ''

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
    </DzColumn>
  )
}