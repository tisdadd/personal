/** Helmet default content policy, formatted in nextjs security headers format */
// const ContentSecurityPolicy = `default-src 'self';
//   base-uri 'self';
//   font-src 'self' https: data:;
//   form-action 'self';
//   frame-ancestors 'self';
//   img-src 'self' data:;
//   object-src 'none';
//   script-src 'self';
//   script-src-attr 'none';
//   style-src 'self' https: 'unsafe-inline';
//   upgrade-insecure-requests;
// `;

// setting up with development mode just ignore, but getting rid of unsafe-inline for on server
const isDevelopment = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = isDevelopment ? '' : `
  default-src 'self';
  base-uri 'self';
  font-src 'self' https: data:;
  form-action 'self';
  frame-ancestors 'self';
  img-src 'self' data:;
  object-src 'none';
  script-src 'self';
  script-src-attr 'none';
  style-src 'self';
  upgrade-insecure-requests;
`;

// using the default helmet headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Origin-Agent-Cluster',
    value: '?1',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=15552000; includeSubDomains',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'off',
  },
  {
    key: 'X-Download-Options',
    value: 'noopen',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
  // some added from next docs
  {
    key: 'Permissions-Policy',
    // disable the below for self and under - can dig into
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
    // for more
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },

];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
