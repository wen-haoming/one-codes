import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  base: '/one-codes/',
  build: {
    sourcemap:true,
    // lib: {
    //   entry: resolve(__dirname, './src/App.tsx'),
    //   name: 'oneCodes',
    // },
    rollupOptions: {
      // external:['react','react-dom'],
      output: {
        manualChunks: {
          "babel": ['@babel/standalone'],
          "rollup": ['@rollup/browser'],
          "prettier": ['prettier'],
          "codemirror": ["@uiw/react-codemirror", "@uiw/codemirror-theme-vscode", "@codemirror/lang-javascript"]
        }
      }
    },
    commonjsOptions: {
      
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  plugins: [
    viteCompression(),
    visualizer(),
    Unocss({
      shortcuts: {
        btn: 'inline-flex py-.5 px-2 font-semibold rounded bg-brand-primary text-white cursor-pointer hover:bg-brand-hover justify-center items-center',
        widgetBtn:
          'inline-block py-3 px-3	text-brand-primary font-semibold rounded-md text-brand-txt  cursor-pointer hover:bg-brand-grey hover:text-brand-primary text-left',
        'btn-block':
          'block py-1	 px-3	font-semibold rounded-md bg-brand-primary text-white cursor-pointer hover:bg-brand-hover text-center',
        'f-center': 'flex justify-center items-center',
      },
      rules: [
        [
          'editor-hover',
          {
            outline: '1.5px dotted #2558fb',
            'outline-offset': '1px',
          },
        ],
      ],
      theme: {
        colors: {
          brand: {
            radius: '4px',
            primary: '#2558fb',
            hover: '#507ff7',
            grey: '#f5f5f5',
            line: '#e1e2e8',
            txt: '#1e2128',
            subTxt: '#505968',
          },
        },
      },
    }),
    react(),
    svgr()
  ],
});
