import { getSingleStaticPage } from '../data/staticPage';
import { StaticPage } from '../data/types';
import { NextSeo } from 'next-seo';
import env from 'env-var';
import { GetStaticProps } from 'next';
import PageLayout from '../components/PageLayout';
import ErrorPage from './404'
import { projectStrings } from '../data/site';

type PageProps = { article: StaticPage | null, errorMessage?: string }
type PageParams = { slug: string[] }

export default function Page({ article, errorMessage }: PageProps) {
  if (!article) return <ErrorPage message={errorMessage} />

  return (
    <PageLayout>
      <NextSeo
        title={article.fields.Title}
        description={article.fields.Summary}
        openGraph={{
          title: article.fields.Title,
          description: article.fields.Summary
        }}
      />

      <section className='content-wrapper py-5'>
        <article className='space-y-2'>
          <h1 className='font-identity dark:text-white text-4xl md:text-6xl pb-3'>{article.fields.Title}</h1>
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <section className='prose dark:prose-invert dark:text-white md:col-span-2'
              dangerouslySetInnerHTML={{ __html: article.body.html }}
            />
            <div className='grid lg:grid-cols-2 lg:col-span-2 gap-6'>
              <div className='space-y-5'>
                <section className='space-y-3'>
                  <h2 className='font-semibold text-lg'>Team</h2>
                  <p>Baby kitty, content moderation worker</p>
                </section>
                <section className='space-y-3'>
                  <h2 className='font-semibold text-lg'>Additional Help From</h2>
                  <p></p>
                </section>
                <section className='space-y-3'>
                  <h2 className='font-semibold text-lg'>Contact Us</h2>
                  <p><a className='link' href={`mailto:${projectStrings.email}`}>
                    Email
                  </a></p>
                  <p><a className='link' href={`https://twitter.com/${projectStrings.twitterHandle}`}>
                    Twitter
                  </a></p>
                  <p><a className='link' href={projectStrings.github}>
                    GitHub
                  </a></p>
                </section>
              </div>
              <section className='space-y-3'>
                <h2 className='font-semibold text-lg'>Credits</h2>
                <p>This website is a fork of the <a href="https://gameworkersolidarity.com/">gameworkersolidarity.com</a> website</p>
              </section>
            </div>
          </div>
        </article>
      </section>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<
  PageProps, PageParams
> = async () => {
  let article
  let errorMessage = ''
  try {
    article = await getSingleStaticPage('about') || null
  } catch (e) {
    console.error("No article was found", e)
    article = null
    errorMessage = e.toString()
  }

  return {
    props: {
      article,
      errorMessage
    },
    revalidate: env.get('PAGE_TTL').default(
      env.get('NODE_ENV').asString() === 'production' ? 60 : 5
    ).asInt(), // In seconds
  }
}
