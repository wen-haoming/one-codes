// vite.config.ts
import react from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/@vitejs+plugin-react-swc@3.1.0_vite@4.1.1/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import Unocss from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/unocss@0.45.30_vite@4.1.1/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/vite@4.1.1/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/rollup-plugin-visualizer@5.9.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.1.1/node_modules/vite-plugin-compression/dist/index.mjs";
import svgr from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/one-codes/node_modules/.pnpm/vite-plugin-svgr@2.4.0_vite@4.1.1/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/wenhaoming/Desktop/\u6781\u5BA2\u65F6\u95F4\u7EC3\u4E60\u9898/one-codes";
var vite_config_default = defineConfig({
  base: "/one-codes/",
  build: {
    sourcemap: true,
    // lib: {
    //   entry: resolve(__dirname, './src/App.tsx'),
    //   name: 'oneCodes',
    // },
    rollupOptions: {
      // external:['react','react-dom'],
      output: {
        manualChunks: {
          "babel": ["@babel/standalone"],
          "rollup": ["@rollup/browser"],
          "prettier": ["prettier"],
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
        replacement: ""
      },
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "./src")
      }
    ]
  },
  plugins: [
    viteCompression(),
    visualizer(),
    Unocss({
      shortcuts: {
        btn: "inline-flex py-.5 px-2 font-semibold rounded bg-brand-primary text-white cursor-pointer hover:bg-brand-hover justify-center items-center",
        widgetBtn: "inline-block py-3 px-3	text-brand-primary font-semibold rounded-md text-brand-txt  cursor-pointer hover:bg-brand-grey hover:text-brand-primary text-left",
        "btn-block": "block py-1	 px-3	font-semibold rounded-md bg-brand-primary text-white cursor-pointer hover:bg-brand-hover text-center",
        "f-center": "flex justify-center items-center"
      },
      rules: [
        [
          "editor-hover",
          {
            outline: "1.5px dotted #2558fb",
            "outline-offset": "1px"
          }
        ]
      ],
      theme: {
        colors: {
          brand: {
            radius: "4px",
            primary: "#2558fb",
            hover: "#507ff7",
            grey: "#f5f5f5",
            line: "#e1e2e8",
            txt: "#1e2128",
            subTxt: "#505968"
          }
        }
      }
    }),
    react(),
    svgr()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2VuaGFvbWluZy9EZXNrdG9wL1x1Njc4MVx1NUJBMlx1NjVGNlx1OTVGNFx1N0VDM1x1NEU2MFx1OTg5OC9vbmUtY29kZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy93ZW5oYW9taW5nL0Rlc2t0b3AvXHU2NzgxXHU1QkEyXHU2NUY2XHU5NUY0XHU3RUMzXHU0RTYwXHU5ODk4L29uZS1jb2Rlcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvd2VuaGFvbWluZy9EZXNrdG9wLyVFNiU5RSU4MSVFNSVBRSVBMiVFNiU5NyVCNiVFOSU5NyVCNCVFNyVCQiU4MyVFNCVCOSVBMCVFOSVBMiU5OC9vbmUtY29kZXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncicgXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnL29uZS1jb2Rlcy8nLFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDp0cnVlLFxuICAgIC8vIGxpYjoge1xuICAgIC8vICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvQXBwLnRzeCcpLFxuICAgIC8vICAgbmFtZTogJ29uZUNvZGVzJyxcbiAgICAvLyB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIGV4dGVybmFsOlsncmVhY3QnLCdyZWFjdC1kb20nXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICBcImJhYmVsXCI6IFsnQGJhYmVsL3N0YW5kYWxvbmUnXSxcbiAgICAgICAgICBcInJvbGx1cFwiOiBbJ0Byb2xsdXAvYnJvd3NlciddLFxuICAgICAgICAgIFwicHJldHRpZXJcIjogWydwcmV0dGllciddLFxuICAgICAgICAgIFwiY29kZW1pcnJvclwiOiBbXCJAdWl3L3JlYWN0LWNvZGVtaXJyb3JcIiwgXCJAdWl3L2NvZGVtaXJyb3ItdGhlbWUtdnNjb2RlXCIsIFwiQGNvZGVtaXJyb3IvbGFuZy1qYXZhc2NyaXB0XCJdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgXG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7XG4gICAgICAgIGZpbmQ6IC9efi8sXG4gICAgICAgIHJlcGxhY2VtZW50OiAnJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZpdGVDb21wcmVzc2lvbigpLFxuICAgIHZpc3VhbGl6ZXIoKSxcbiAgICBVbm9jc3Moe1xuICAgICAgc2hvcnRjdXRzOiB7XG4gICAgICAgIGJ0bjogJ2lubGluZS1mbGV4IHB5LS41IHB4LTIgZm9udC1zZW1pYm9sZCByb3VuZGVkIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInLFxuICAgICAgICB3aWRnZXRCdG46XG4gICAgICAgICAgJ2lubGluZS1ibG9jayBweS0zIHB4LTNcdHRleHQtYnJhbmQtcHJpbWFyeSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdGV4dC1icmFuZC10eHQgIGN1cnNvci1wb2ludGVyIGhvdmVyOmJnLWJyYW5kLWdyZXkgaG92ZXI6dGV4dC1icmFuZC1wcmltYXJ5IHRleHQtbGVmdCcsXG4gICAgICAgICdidG4tYmxvY2snOlxuICAgICAgICAgICdibG9jayBweS0xXHQgcHgtM1x0Zm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciB0ZXh0LWNlbnRlcicsXG4gICAgICAgICdmLWNlbnRlcic6ICdmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcicsXG4gICAgICB9LFxuICAgICAgcnVsZXM6IFtcbiAgICAgICAgW1xuICAgICAgICAgICdlZGl0b3ItaG92ZXInLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dGxpbmU6ICcxLjVweCBkb3R0ZWQgIzI1NThmYicsXG4gICAgICAgICAgICAnb3V0bGluZS1vZmZzZXQnOiAnMXB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSxcbiAgICAgIHRoZW1lOiB7XG4gICAgICAgIGNvbG9yczoge1xuICAgICAgICAgIGJyYW5kOiB7XG4gICAgICAgICAgICByYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgcHJpbWFyeTogJyMyNTU4ZmInLFxuICAgICAgICAgICAgaG92ZXI6ICcjNTA3ZmY3JyxcbiAgICAgICAgICAgIGdyZXk6ICcjZjVmNWY1JyxcbiAgICAgICAgICAgIGxpbmU6ICcjZTFlMmU4JyxcbiAgICAgICAgICAgIHR4dDogJyMxZTIxMjgnLFxuICAgICAgICAgICAgc3ViVHh0OiAnIzUwNTk2OCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgICBzdmdyKClcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVyxPQUFPLFdBQVc7QUFDN1gsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLFVBQVU7QUFOakIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsV0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLVixlQUFlO0FBQUE7QUFBQSxNQUViLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxVQUM3QixVQUFVLENBQUMsaUJBQWlCO0FBQUEsVUFDNUIsWUFBWSxDQUFDLFVBQVU7QUFBQSxVQUN2QixjQUFjLENBQUMseUJBQXlCLGdDQUFnQyw2QkFBNkI7QUFBQSxRQUN2RztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUVmLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxnQkFBZ0I7QUFBQSxJQUNoQixXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFDVCxLQUFLO0FBQUEsUUFDTCxXQUNFO0FBQUEsUUFDRixhQUNFO0FBQUEsUUFDRixZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFlBQ0UsU0FBUztBQUFBLFlBQ1Qsa0JBQWtCO0FBQUEsVUFDcEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0wsUUFBUTtBQUFBLFlBQ1IsU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFlBQ0wsUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1A7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
