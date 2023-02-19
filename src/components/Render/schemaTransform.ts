import { IdSchema, SchemaMap } from '@/store'
import { rollup } from '@rollup/browser'
import { transform } from '@babel/standalone'

/**
 *  
 * @param schema  
 */
function schemaTransform({ idSchemaStateSnap, schemaMapStateSnap }: { idSchemaStateSnap: IdSchema, schemaMapStateSnap: SchemaMap }): Promise<{ esCode: string, umdCode: string }> {

  const improtMaps: Record<string, Set<string>> = {};

  function slotRender(idIdSchema: IdSchema): any {
    return idIdSchema.map(schema => {
      const { componentName, props, libraryName, isSlot, defaultProps } = schemaMapStateSnap[schema.id];

      const defaultPropsObj = defaultProps?.reduce<Record<string, any>>((pre, { propsName, propsValue }) => {
        pre[propsName as string] = propsValue
        return pre
      }, {})

      const newProps: any = {
        ...defaultPropsObj,
        ...props,
        componentid: schema.id
      };

      let childrenStr: string = '';

      if (improtMaps[libraryName]) {
        improtMaps[libraryName].add(componentName)
      } else {
        improtMaps[libraryName] = new Set([componentName])
      }

      const hasProps = Object.keys(newProps).length > 0

      const propsStr = hasProps ? Object.entries(newProps).filter(([key, value]) => {
        if (key === 'children' && typeof value !== 'object') {
          childrenStr = String(value)
          return false
        } else {
          return true
        }
      }).map(([key, value]) => `${key}=${typeof value === 'object' ? JSON.stringify(value) : `'${value}'`}`).join(' ') : ''

      if (isSlot && schema.slot) {
        return `<${componentName} ${propsStr}>
           ${childrenStr ? childrenStr : slotRender(schema.slot)}
        </${componentName}>`
      } else {
        return `<${componentName} ${propsStr}>
           ${childrenStr ? childrenStr : ''} 
         </${componentName}>`
      }
    }
    ).join('\n')
  }

  const jsx = slotRender(idSchemaStateSnap)
  const imports = Object.keys(improtMaps).map((libraryName) => {
    const componentNames = improtMaps[libraryName];
    return `import {${[...componentNames].join(',')}} from '${libraryName}'`
  }).join('\n')

  // 组件文件
  const mainjs = `import React from 'react';
  import ReactDOM from 'react-dom';
  ${imports}

  const App = () => {
    return <>
    ${jsx}
    </> 
  }
  ReactDOM.render(<App />, document.getElementById('root'));
  ` 
  // 编译jsx
  const transformEsModule = transform(mainjs, {  presets: ['es2016', 'react'], });
  console.log(transformEsModule, 'transformEsModule')
  const modules: any = {
    'main.js': transformEsModule,
  };

  // 编译 umd
  return rollup({
    input: 'main.js',
    plugins: [
      {
        name: 'loader',
        resolveId(source) {
          if (modules.hasOwnProperty(source)) {
            return source;
          } else {
            return ''
          }
        },
        load(id) {
          if (modules.hasOwnProperty(id)) {
            return modules[id];
          } else {
            return ''
          }
        },
      }
    ]
  })
    .then(async (bundle) => {
      const umdCodeBundle = (await bundle.generate({ format: 'umd' })).output
      return {
        umdCodeBundle: umdCodeBundle,
      }
    })
    .then(({ umdCodeBundle }) => {
      const umdCode = umdCodeBundle[0].code;
      return {
        esCode: mainjs,
        umdCode
      }
    });

}


export default schemaTransform
