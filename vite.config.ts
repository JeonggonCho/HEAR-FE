import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      visualizer({
        open: true, // 번들 분석 결과를 자동으로 브라우저에서 열기
        filename: 'stats.html', // 출력될 HTML 파일 이름
        gzipSize: true, // gzip 압축 후 크기 표시
        brotliSize: true, // brotli 압축 후 크기 표시
      }) as PluginOption,
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return 'vendor'; // 외부 라이브러리를 별도 청크로 분리
  //         }
  //       },
  //     },
  //   },
  // },
  resolve: {
    alias: [
      {find: "@components", replacement: "/src/components"},
      {find: "@pages", replacement: "/src/pages"},
      {find: "@assets", replacement: "/src/assets"},
      {find: "@constants", replacement: "/src/constants"},
      {find: "@schemata", replacement: "/src/schemata"},
      {find: "@store", replacement: "/src/store"},
      {find: "@routes", replacement: "/src/routes"},
      {find: "@util", replacement: "/src/util"},
      {find: "@layouts", replacement: "/src/layouts"},
      {find: "@api", replacement: "/src/api"},
      {find: "@hooks", replacement: "/src/hooks"},
      {find: "@styles", replacement: "/src/styles"},
      {find: "@context", replacement: "/src/context"},
      {find: "@", replacement: "/src"},
    ],
  }
})
