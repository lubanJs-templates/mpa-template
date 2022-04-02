module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'gray-color': '#F8F8F8',
        'black-color': '#1B1B1B',
        'card-border-color': 'rgba(208, 213, 221, 1)',
        'gray2-color': '#EBEBEB',
        'gray3-color': '#D9DBE1'
      },
      fontFamily: {
        'roboto-bold': ['Roboto-Bold', 'Roboto', 'HelveticaNeue'],
        roboto: ['Roboto-Medium', 'Roboto', 'HelveticaNeue'],
        helve: ['HelveticaNeue'],
        'helve-bold': ['HelveticaNeue-Bold', 'HelveticaNeue'],
        pingfang: ['PingFangSC-Semibold', 'PingFang SC', 'HelveticaNeue'],
        'roboto-medium': ['Roboto-Medium', 'Roboto', 'Helvetica'],
        'roboto-regular': ['Roboto-Regular', 'Roboto', 'Helvetica'],
        helvetica: ['Helvetica']
      }
    }
  },
  plugins: []
}
