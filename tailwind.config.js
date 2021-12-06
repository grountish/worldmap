// const _ = require('lodash')
// const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

const pxToRem = (px, base = 16) => process.env.NODE_ENV === 'production' ? `${px}px` : `${px / base}rem`
const buildScaleFromArray = (I, cb) => I.reduce((a, i) => ({ ...a, [i]: cb ? cb(i) : i }), {})
const buildScaleFromSteps = (step = 4, limit = 64) => {
  const scale = { 0: '0px' }
  Array(limit / step).fill()
    .map((value, key) => pxToRem((key + 1) * step))
    .forEach((value, key) => { scale[(key + 1) * step] = value })
  return scale
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // experimental: {
  //   applyComplexClasses: false,
  // },

  theme: {
    extend: {
      colors: {
        accent: {
          red: '#f04932',
          green: '#e1f757',
          blue: '#0390e6',
        },
        primary: {
          0: '#ffffff',
          1: '#fbfaf9',
          2: '#edece7',
          3: '#a5a08d',
          4: '#96917a',
          5: '#726d5a',
          6: '#4c493c',
          7: '#39372d',
          8: '#13120f',
        },
        bg: {
          white: '#ffffff',
          grey: '#ecebe7',
        },
      },
      // fontSize: {
      //   'xs': '0.625rem',
      //   'sm': '0.75rem',
      //   'base': '1rem',
      //   'lg': '1.125rem',
      //   'xl': '1.25rem',
      //   '2xl': '1.5rem',
      //   '3xl': '1.75rem',
      //   '4xl': '2rem',
      //   '5xl': '2.5rem',
      //   '6xl': '3rem',
      //   '7xl': '5.625rem',
      // },

      fontFamily: {
        inherit: 'inherit',
        sans: ['Sohne', ...defaultTheme.fontFamily.sans],
        facebook: ['Facebook', 'Sohne', ...defaultTheme.fontFamily.sans],
      },

      maxHeight: (theme) => ({
        ...theme('spacing'),
        15: '3.75rem',
        18: '4.5rem',
        36: '9rem',
      }),
      minHeight: (theme) => ({
        ...theme('spacing'),
        128: '32rem',
        256: '64rem',
        384: '96rem',
      }),

      zIndex: buildScaleFromArray([-10]),
      textStrokeWidth: { default: '1px' },
    },
  },

  corePlugins: {
    container: false,
  },

  variants: {
    extend: {
      margin: ['first', 'last'],
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-text-fill-stroke')(),
    require('tailwindcss-scroll-snap'),
  ],

  purge: {
    content: [
      'mixins/**/*.js',
    ],
  },
}
