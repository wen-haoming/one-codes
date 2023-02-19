import { IdSchema, SchemaMap } from '@/store'
import { rollup } from '@rollup/browser'
import { transform } from '@babel/standalone'

/**
 *  
 * @param schema  
 */
async function schemaTransform({ idSchemaStateSnap, schemaMapStateSnap }: { idSchemaStateSnap: IdSchema, schemaMapStateSnap: SchemaMap }): Promise<{ esCode: string, umdCode: string }> {

  const improtMaps: {
    libraryName: Record<string, Set<string>>;
    libraryGlobalImport: Record<string, Set<string>>;
  } = { libraryName: {}, libraryGlobalImport: {} };
  const importGlobalMaps:Record<string,string> = {

  }
  function slotRender(idIdSchema: IdSchema): any {
    return idIdSchema.map(schema => {
      const { componentName, props, libraryGlobalImport, libraryName, isSlot, defaultProps } = schemaMapStateSnap[schema.id];
      importGlobalMaps[ libraryName] =  libraryGlobalImport

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
      if (improtMaps.libraryGlobalImport[libraryGlobalImport]) {
        improtMaps.libraryGlobalImport[libraryGlobalImport].add(componentName)
        improtMaps.libraryName[libraryName].add(componentName)
      } else {
        improtMaps.libraryGlobalImport[libraryGlobalImport] = new Set([componentName])
        improtMaps.libraryName[libraryName] = new Set([componentName])
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


  // 组件文件
  const getMainjsType = (type: 'libraryName' | 'libraryGlobalImport') => {
    const imports = Object.keys(improtMaps[type]).map((libraryName) => {
      const componentNames = improtMaps[type][libraryName];
      return `import {${[...componentNames].join(',')}} from '${libraryName}'`
    }).join('\n')

    return `import React from 'react';
  import ReactDOM from 'react-dom';
  ${imports}

  const App = () => {
    return <>
    ${jsx}
    </> 
  }
  ReactDOM.render(<App />, document.getElementById('root'));
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
    output:{
      strict:false
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
