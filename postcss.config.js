module.exports = ({ env }) => ({
  plugins: [
    require('autoprefixer')(),
    require('css-declaration-sorter')({
      order: 'smacss'
    }),
    env === 'production' ? require('cssnano')({
      autoprefixer: false
    }) : false
  ]
});
