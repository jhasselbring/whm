const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
    resolve: {
        alias: {
            '@': Path.resolve(__dirname, './src/renderer'),
            '@e': Path.resolve(__dirname, './src/renderer/components/elements'),
            '@m': Path.resolve(__dirname, './src/renderer/components/modules'),
            '@p': Path.resolve(__dirname, './src/renderer/components/pages'),
        },
    }
});

module.exports = config;
