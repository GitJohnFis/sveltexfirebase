const production = !process.env.ROLLUP_WATCH;


module.exports = {
    future: {
        removeDecrepatedGapUtilties: true,
        purgeLayersByDefault: true,
    },
    plugins: [],
    purge: {
        content: ['./src/**/*.svelte', './src/**/*.css'],
        enabled: production,
    },
  };