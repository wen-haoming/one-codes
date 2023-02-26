/// <reference types="vite/client" />
declare module 'prettier/standalone';
declare module 'prettier/parser-babel';
declare module  'lodash.get'
declare module '@babel/standalone'
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
