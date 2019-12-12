module.exports = ({ env }) => ({
  parser: require('postcss-comment'),
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
