const production = !process.env.ROLLUP_WATCH;

module.exports = {
    plugins: [
        require('tailwindcss')(),
        require('postcss-import')(),
        ...(production
            ? [ require('autoprefixer')({
                overrideBrowserslist: ['defaults and last 4 versions'],
            }), require('cssnano')()]
            : []),
    ],
};
