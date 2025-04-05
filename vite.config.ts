import react from '@vitejs/plugin-react';

import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: './',
    build: {
        outDir: './build',
    },
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    resolve: {
        alias: {
            app: '/src/app',
            assets: '/src/assets',
            components: '/src/components',
            constants: '/src/constants',
            features: '/src/features',
            hooks: '/src/hooks',
            routes: '/src/routes',
            selectors: '/src/selectors',
            services: 'services',
            slices: '/src/slices',
            styles: '/src/styles',
            types: '/src/types',
            utils: '/src/utils',
        },
    },
    server: {
        port: 3101,
        watch: {
            usePolling: true,
        },
    },
    test: {
        coverage: {
            exclude: ['node_modules/', 'test/', 'setupTests.ts'],
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
        },
        deps: {
            inline: ['vitest-canvas-mock'],
        },
        environment: 'jsdom',
        globals: true,
        // setupFiles: './setupTests.ts',
    },
});
