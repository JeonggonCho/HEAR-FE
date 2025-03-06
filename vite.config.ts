import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true, // 디버깅용 소스맵 생성
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // 청크 파일 이름 명확화
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  base: '/', // S3 루트 경로에 맞게 설정
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@schemata', replacement: '/src/schemata' },
      { find: '@store', replacement: '/src/store' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@util', replacement: '/src/util' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@api', replacement: '/src/api' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@context', replacement: '/src/context' },
      { find: '@', replacement: '/src' },
    ],
  },
});