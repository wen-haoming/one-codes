import { IdSchema, idSchemaState, SchemaMap } from '@/store'
import { rollup } from '@rollup/browser'
import { transform } from '@babel/standalone'
import { jsxProps2JsxEle } from '@/utils';
import getVal from 'lodash.get'

/**
 *  
 * @param schema  
 */
async function schemaTransform({ idSchemaStateSnap, schemaMapStateSnap }: { idSchemaStateSnap: IdSchema, schemaMapStateSnap: SchemaMap }): Promise<{ esCode: string, umdCode: string }> {

  const improtMaps: {
    libraryName: Record<string, Set<string>>;
    libraryGlobalImport: Record<string, Set<string>>;
  } = { libraryName: {}, libraryGlobalImport: {} };
  const importGlobalMaps: Record<string, string> = {}
  const subModuneMaps: Record<string, Set<string>> = {}

  function slotRender(idIdSchema: IdSchema): any {
    return idIdSchema.map(schema => {
      const path = schemaMapStateSnap[schema.id]?.path;
      if (schema.type !== 'jsx') return
      if (!getVal(idSchemaState.idSchema, path)) return
      const { libraryGlobalImport, libraryName, isSlot, defaultProps, props, componentName: ncomponentName } = getVal(idSchemaState.idSchema, path) || {}
      let [componentName, subComponentName] = ncomponentName.split('.')
      importGlobalMaps[libraryName] = libraryGlobalImport;
      let newProps: any = {
        ...defaultProps,
        ...props,
        componentid: schema.id
      };

      // 处理subModuleName 比如 Form.Item 的情况，但是一般不会大于两层
      if (subComponentName) {
        if (subModuneMaps[componentName]) {
          subModuneMaps[componentName].add(subComponentName)
        } else {
          subModuneMaps[componentName] = new Set([subComponentName])
        }
      }

      let childrenStr: string = '';
      // 添加 import 的语句依赖
      if (improtMaps.libraryGlobalImport[libraryGlobalImport] && improtMaps.libraryName[libraryName]) {
        improtMaps.libraryGlobalImport[libraryGlobalImport].add(componentName)
        improtMaps.libraryName[libraryName].add(componentName)
      } else {
        improtMaps.libraryGlobalImport[libraryGlobalImport] = new Set([componentName])
        improtMaps.libraryName[libraryName] = new Set([componentName])
      }


      const hasProps = Object.keys(newProps).length > 0;
      newProps = jsxProps2JsxEle(newProps, (slots) => slotRender(slots)) // 把 jsx type 转为 jsxEle

      const propsStr = hasProps ? Object.entries(newProps).filter(([key, value]) => {
        if (key === 'children' && typeof value !== 'object') {
          childrenStr = String(value)
          return false
        } else {
          return true
        }
      }).map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value)}}`
        } else if (typeof value === 'string') {
          return `${key}="${(value)}"`
        } else {
          return `${key}={${(value)}}`
        }
      }).join(' ') : ''


      if (isSlot && schema.slot) {
        return `<${subComponentName || componentName} ${propsStr}>
           ${childrenStr ? childrenStr : ''}
           ${slotRender(schema.slot)}
        </${subComponentName || componentName}>`
      } else {
        return `<${subComponentName || componentName} ${propsStr}>
           ${childrenStr ? childrenStr : ''} 
         </${subComponentName || componentName}>`
      }
    }
    ).join('\n')
  }

  const jsx = slotRender(idSchemaStateSnap).replace(/\"\[{{(.*?)}}\]\"/g, `$1`)

  const hasSubModuneMaps = Object.keys(subModuneMaps).length > 0;
  // 组件文件
  const getMainjsType = (type: 'libraryName' | 'libraryGlobalImport') => {
    const imports = Object.keys(improtMaps[type]).map((libraryName) => {
      const componentNames = improtMaps[type][libraryName];
      return `import {${[...componentNames].join(',')}} from '${libraryName}'`
    }).join('\n')

    return `import React from 'react';
  import ReactDOM from 'react-dom';
  ${imports}

  ${hasSubModuneMaps ? Object.entries(subModuneMaps).map(([moduleName, subModuleName]) => {
      return `const { ${[...subModuleName].join(',')} } = ${moduleName}`
    }) : ''}

  const App = () => {
    return <>
    ${jsx}
    </> 
  }
  ReactDOM?.render(<App />, document.getElementById('root'));
  `
  }

  // 编译jsx
  const transformEsModule = transform(getMainjsType("libraryGlobalImport"), { presets: ['es2016', 'react'], });

  const modules: any = {
    'main.js': transformEsModule,
  };
  // 编译 umd
  const umdCode = await rollup({
    input: 'main.js',
    output: {
      strict: false
    },
    plugins: [
      {
        name: 'loader',
        resolveId(source, importer) {
          if (modules.hasOwnProperty(source)) {
            return source || '';
          } else {
            return false
          }
        },
        load(id) {
          if (modules.hasOwnProperty(id)) {
            return modules[id] || '';
          } else {
            return false
          }
        },
      }
    ]
  })
    .then((bundle) => bundle.generate({ format: 'umd' })).then(res => res.output[0].code)

  return {
    esCode: getMainjsType('libraryName'),
    umdCode
  }
}


export default schemaTransform
