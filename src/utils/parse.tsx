import type { IdSchema, SchemaMap, UiItem } from '@/store';
import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import reactElementToJSXString from 'react-element-to-jsx-string';

// 分析依赖
export const getImports = (uiTree: UiItem[]) => {
  const importMap = uiTree.reduce<Record<string, string | string[]>>(
    (pre, uiTreeItem) => {
      const {
        importDefault,
        import: importName,
        source,
      } = uiTreeItem?.component?.importDeclaration || {};
      if (source && uiTreeItem && typeof pre[source] === 'undefined') {
        if (importDefault) {
          pre[source] = importDefault;
        } else if (importName) {
          pre[source] = [importName];
        }
      } else if (source && uiTreeItem && pre[source]) {
        if (Array.isArray(pre[source]) && importName) {
          pre[source] = [...new Set(pre[source].concat(importName))];
        }
      }
      return pre;
    },
    {},
  );

  return Object.entries(importMap)
    .map(([source, importValue]) => {
      if (Array.isArray(importValue)) {
        return `import { ${importValue.join(', ')} } from '${source}';`;
      } else {
        return `import ${importValue} from '${source}';`;
      }
    })
    .join(`\n`);
};

const getJsx = (getIdSchema: IdSchema, getSchemaMap: SchemaMap) => {

  return getIdSchema.map(schema => {

    const Ele = getSchemaMap[schema.id].component;
    const props = getSchemaMap[schema.id].props

    if (schema.slot) {
      return reactElementToJSXString(<Ele {...props} key={schema.id} >
        {
          schema.slot.map(item => {
            const Ele2 = getSchemaMap[item.id].component;
            const props2 = getSchemaMap[item.id].props;
            return <Ele2 {...props2} key={String(item.id)} />
          })
        }
      </Ele>, {
        displayName(element:any) {
          return getSchemaMap[String(element.key).replace(/[^\w]|$/g,'')].componentName
        },
        filterProps:['key']
      })
    }

    return reactElementToJSXString(<Ele {...props} key={schema.id}  />, {
      filterProps:['key'],
      displayName(element:any) {
        return getSchemaMap[element.key].componentName
      },
    })
  })
};

export const parse = (getIdSchema: IdSchema, getSchemaMap: SchemaMap) => {
  // ${getImports(uiTree)}
  const str = `

  function Page (){

    return <>
        ${getJsx(getIdSchema, getSchemaMap).join('\n')}
    </>
  }

  export default Page
  `;
  return prettier.format(str, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};
