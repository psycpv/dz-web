import {DzInterstitial as DzInterstitialMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzInterstitialTypeProps} from '@/sanity/schema/objects/page/components/molecules/dzInterstitial'

import {interstitialMap} from './interstitialMapper'

interface DzInterstitialProps {
  data: any
  componentProps?: DzInterstitialTypeProps
}

export const DzInterstitial: FC<DzInterstitialProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (interstitialMap[_type] ?? ((a: any) => ({data: a})))(data, componentProps)

  return <DzInterstitialMolecule {...mappedData} />
}

export default DzInterstitial