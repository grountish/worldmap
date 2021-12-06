import { join } from 'path'
import _ from 'lodash'
import flatten from 'flat'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }

const handleName = (className, base) => {
  const split = className.split(`${base}-`)
  const prefixedName = `${split[0] || ''}${split[1] ? prefixNegativeModifiers(base, split[1]) : base || ''}`
  return prefixedName.split('-default').join('')
}

const prefixNegativeModifiers = (base, modifier) => {
  return _.startsWith(modifier, '-') ? `-${base}-${modifier.slice(1)}` : `${base}-${modifier}`
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'MoMN (Museum Of Missing Nurses)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An online Museum dedicated to the 34 million nurse salaries lost to tax abuse every year.' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/fonts.pcss'],
  // loading: {
  //   color: theme.colors.blue.default,
  //   failedColor: theme.colors.red.default,
  //   height: theme.spacing[5],
  // },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/_filters' },
    // { src: '~/plugins/scroll-lock', mode: 'client' },
    // { src: '~/plugins/formulate', mode: 'client' },
    { src: '~/plugins/vuetensils', mode: 'client' },
    { src: '~/plugins/html2canvas.js', mode: 'client' },
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
    { src: '~/plugins/v-scroll-lock', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://sanity.nuxtjs.org
    '@nuxtjs/sanity',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',

    'portal-vue/nuxt',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // TailwindCSS module configuration (https://tailwindcss.nuxtjs.org/)
  tailwindcss: {
    // configPath: 'tailwind.config.js',
    cssPath: '~/assets/css/tailwind.pcss',
    // exposeConfig: false,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config, ctx) {},
    postcss: {
      plugins: {
        'postcss-fontpath': { checkFiles: true },
        'tailwindcss': join(__dirname, 'tailwind.config.js'),
        // 'postcss-easing-gradients': {},
        // 'postcss-viewport-height-correction': {},
      },
      order: [
        'postcss-import',
        'postcss-fontpath',
        'tailwindcss',
        // 'postcss-easing-gradients',
        'postcss-preset-env',
        // 'postcss-viewport-height-correction',
        'cssnano',
      ],
    },
  },

  // Storybook Configuration (https://storybook.nuxtjs.org/)
  storybook: {
    addons: [
      '@storybook/addon-a11y',
      // '@storybook/addon-centered',
    ],
    parameters: {
      backgrounds: {
        default: 'transparent',
        values: Object.entries(flatten(fullConfig.theme.colors, FLATTEN_CONFIG)).map(([name, value]) => ({ name: handleName(name), value })),
      },
      options: {
        storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
      },
    },
  },

  // Sanity Configuration (https://sanity.nuxtjs.org/)
  sanity: {
    projectId: 'm76cfcma',
    dataset: process.env.NODE_ENV === 'development'
      ? 'staging'
      : process.env.SANITY_DATASET || 'production',
  },

  // Runtime configuration
  publicRuntimeConfig: {
    siteName: process.env.npm_package_name || '',
    siteDescription: process.env.npm_package_description || '',
  },
}
