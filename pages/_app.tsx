import App from 'next/app'
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import Link from 'next/link';
import VerticalScrollPage from '../components/VerticalScrollPage';
import { getStaticPageLinks } from '../data/staticPage';
import { projectStrings } from '../data/site';
import { useRouter } from 'next/dist/client/router';
import {DefaultSeo} from 'next-seo';
import { KonamiCode } from '../components/KonamiCode';

function MyApp({ Component, pageProps, links }) {
  const router = useRouter()
  const canonicalURL = (new URL(router.asPath, projectStrings.baseUrl)).toString()
  return (
    <SWRConfig value={{
      initialData: pageProps,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }}>
      <DefaultSeo
        defaultTitle={projectStrings.name}
        titleTemplate={`%s | ${projectStrings.name}`}
        description={projectStrings.description}
        canonical={canonicalURL}
        additionalLinkTags={[
          { rel: 'icon', href: '/favicon/favicon.ico' },
          { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
          { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
          { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
          { rel: "manifest", href: "/site.webmanifest" }
        ]}
        openGraph={{
          url: canonicalURL,
          site_name: projectStrings.name,
          title: projectStrings.name,
          description: projectStrings.description
        }}
        twitter={{
          handle: projectStrings.twitterHandle,
          site: projectStrings.twitterHandle,
          cardType: 'summary_large_image',
        }}
      />

      <VerticalScrollPage>
        <header className='my-4'>
          <div className='content-wrapper'>
            <nav className='lg:flex flex-row justify-between items-center'>
              <div className='text-2xl font-identity font-bold cursor-pointer  hover:text-gwPink'>
                <div>Game Worker Solidarity</div>
              </div>
              <div className='ml-auto space-x-2'>
                <Link href={'/submit'}>
                  <span className='link'>Submit</span>
                </Link>
                <Link href='/docs'>
                  <span className='link'>API</span>
                </Link>
                <Link href={'/news'}>
                  <span className='link'>News</span>
                </Link>
                {links?.map((link, i) => (
                  <a href={link.fields.Slug ? `/${link.fields.Slug}` : link.fields.Link} key={link.fields.Slug || link.fields.Link}>
                    <span className='link'>{link.fields.Title}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <hr className='my-3 border-transparent' />

        <KonamiCode />

        <Component {...pageProps} />
      </VerticalScrollPage>
    </SWRConfig>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const links = await getStaticPageLinks()
  return { ...appProps, links }
}

export default MyApp
