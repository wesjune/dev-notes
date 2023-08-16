import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';

const author: string = 'Wes June';
const repositoryUrl: string = 'https://github.com/wesjune/dev-notes';
const siteName: string = `${author}’s Dev Notes`;
const thisYear: number = new Date().getFullYear();

function createTitle() {
  const { asPath } = useRouter();
  const { title } = useConfig();

  if (asPath === '/') return siteName;

  if (/^\/css/.test(asPath)) {
    return `${title} - CSS | ${siteName}`;
  }
  if (/^\/html/.test(asPath)) {
    return `${title} - HTML | ${siteName}`;
  }
  if (/^\/javascript/.test(asPath)) {
    return `${title} - JavaScript | ${siteName}`;
  }
  if (/^\/typescript/.test(asPath)) {
    return `${title} - TypeScript | ${siteName}`;
  }

  return `${title} | ${siteName}`;
}

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 248 204">
    <path
      fill="currentColor"
      d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
    />
  </svg>
);

function GitTimestamp({ timestamp }) {
  const { asPath, locale = 'en-US' } = useRouter();

  if (['/', '/about'].includes(asPath)) return null;

  return (
    <>
      <span>Last updated on </span>
      <time dateTime={timestamp.toISOString()}>
        {timestamp.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </>
  );
}

const config: DocsThemeConfig = {
  chat: {
    link: 'https://twitter.com/WesJuneChu',
    icon: TwitterIcon,
  },
  docsRepositoryBase: repositoryUrl,
  editLink: { text: null },
  feedback: { content: null },
  footer: {
    text: `© ${thisYear} ${author}. Built with Nextra.`,
  },
  gitTimestamp: GitTimestamp,
  head: () => {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={createTitle()} />
      </>
    );
  },
  logo: <strong>{siteName}</strong>,
  project: { link: repositoryUrl },
  useNextSeoProps() {
    return { titleTemplate: createTitle() };
  },
};

export default config;
