import {DzFooter, DzGridColumns, DzHeader} from '@zwirner/design-system'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'

import CtaModalListener from '@/components/containers/ctaModalListener/ctaModalListener'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

import styles from './layout.module.css'
import {getFooterProps, getHeaderProps} from './mappers'

type LayoutProps = {
  children: ReactNode
  layoutData?: any
}
const Layout = ({children, layoutData}: LayoutProps) => {
  const {menu} = getHeaderProps(layoutData)
  const {data} = getFooterProps(layoutData)
  const router = useRouter()

  return (
    <>
      <DzHeader
        menu={menu}
        footerData={data}
        // TODO handle search
        handleSearch={() => null}
        headerClass={styles.header}
        linkProps={{
          router,
          useRoute: true,
        }}
        LinkElement={Link}
        // TODO handle newsletter
        newsletterAction={() => null}
      />
      <main className={styles.mainLayout} aria-label="Main" role="main">
        <DzGridColumns className="h-full min-h-screen w-full">{children}</DzGridColumns>
      </main>
      <CtaModalListener />
      <DzFooter
        footerClass={styles.footer}
        data={data}
        newsletterAction={() => {
          window.document.dispatchEvent(CTAClickEvent(CtaActions.NEWSLETTER))
        }}
        LinkElement={Link}
      />
    </>
  )
}

export default Layout
