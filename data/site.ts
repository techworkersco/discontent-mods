import env from 'env-var';
export const projectStrings = {
  name: env.get('SITE_TITLE').default("Content Moderator Worker Solidarity").asString(),
  description: env.get('SITE_DESCRIPTION').default("Preserving and analysing the history of content moderator worker solidarity").asString(),
  baseUrl: env.get('SITE_BASE_URL').default("https://gameworkersolidarity.com").asString(),
  twitterHandle: env.get('TWITTER_HANDLE').default('@ContentModeratorSolidarity').asString(),
  email: env.get('EMAIL_ADDRESS').default('hello@contentworkersolidarity.com').asString(),
  github: env.get('GITHUB_REPO_URL').default('https://github.com/gameworkersolidarity/website').asString(),
}
