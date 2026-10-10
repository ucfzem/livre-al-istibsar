/** @type {import('next').NextConfig} */
const repo = 'livre-al-istibsar'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubPages
    ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` }
    : {}),
}

module.exports = nextConfig
