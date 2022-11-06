/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */
/** @typedef { DefaultConfig & { theme: { extend: DefaultTheme } } } TailwindConfig */

const defaultTheme = require('tailwindcss/defaultTheme')
const polished = require('polished')

/** @type {TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      0: '0px',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '40px',
      6: '60px',
      7: '80px',
      8: '100px',
    },
    space: {
      0: '0px',
      '1px': "1px",
      '2px': "2px",
      '3px': "3px",
      '4px': "4px",
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '40px',
      6: '60px',
      7: '80px',
      8: '100px',
    },
    extend: {
      fontFamily: {
        identity: [
          'Parabole',
          ...defaultTheme.fontFamily.sans
        ]
      },
      colors: {
        transparent: 'transparent',
        inherit: 'white',
        white: '#fefefe',
        red: 'red',
        dark: 'black',
        gwYellow: '#EBFF00',
        gwRed: '#fe2901',
        gwRedLight: polished.lighten(0.1, '#fe2901'),
        gwRedLighter: polished.lighten(0.2, '#fe2901'),
        gwRedDark: polished.darken(0.1, '#fe2901'),
        gwRedDarker: polished.darken(0.2, '#fe2901'),
        gwBlue: '#3B97EC',
        gwBlueLight: '#E8EFF5',
        gwBackground: 'transparent',
        gwPink: '#fe2901',
        gwPink50: polished.rgba('#fe2901', 0.5),
        gwPinkLight: polished.lighten(0.1, '#fe2901'),
        gwOrange: '#FF8038',
        gwOrange50: polished.rgba('#FF8038', 0.5),
        gwOrangeLight: '#FFC58E',
      },
      boxShadow: theme => ({
        'noglow': 'inset 0 0 0 0 #FF8038',
        'glow': 'inset 4px 4px 20px 6px #FF8038',
        'innerGwPink': `inset 0px 0px 10px 6px ${polished.rgba('#DD96FF', 0.5)}`,
        'gwPink': `0px 1px 10px 5px ${theme('colors.gwPink50')}`,
        'gwOrange': `0px 1px 10px 5px ${theme('colors.gwOrange50')}`
      }),
      maxWidth: {
        full: "100%"
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: '#eeeeee',
            h1: { color: '#eeeeee' },
            h2: { color: '#eeeeee' },
            h3: { color: '#eeeeee' },
            h4: { color: '#eeeeee' },
            h5: { color: '#eeeeee' },
            a: {
              color: '#eeeeee',
              '&:hover': {
                color: '#eeeeee',
              },
            },
            p: {
              marginTop: theme('space.4'),
              marginBottom: theme('space.4')
            },
            blockquote: {
              marginTop: theme('space.5'),
              marginBottom: theme('space.5'),
              fontFamily: theme('fontFamily.identity').slice().reverse(),
              fontSize: theme('fontSize.3xl'),
              lineHeight: '1.25em',
              fontStyle: 'normal',
              border: 'none',
              margin: 'none',
              // background: `0% 0% url(/images/spaceinvader.png) no-repeat`,
              // backgroundSize: '32px 38px',
              paddingLeft: 40,
              ' p:first-of-type::before': {
                content: '"📢" !important',
                float: 'left',
                marginLeft: -40
              },
              ':after': { display: 'none' },
            }
          },
        },
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
