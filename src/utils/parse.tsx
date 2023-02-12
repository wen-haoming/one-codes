import type { IdSchema, SchemaMap, UiItem } from '@/store';
import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

// 分析依赖
export const getImports = (uiTree: UiItem[]) => {
  const importMap = uiTree.reduce<Record<string, string | string[]>>(
    (pre, uiTreeItem:any) => {
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

const getJsx = (getIdSchema: IdSchema, getSchemaMap: any) => {

  const jsxEle = ({ idSchema }: { idSchema: IdSchema }) => {
    return idSchema.map(schema => {
      const Ele = getSchemaMap[schema.id].component;
      const props = getSchemaMap[schema.id].props;
      if (schema.slot) {
        return <Ele {...props} key={schema.id} >
          {jsxEle({ idSchema: schema.slot })}
        </Ele>
      }

      return <Ele {...props} key={schema.id} />
    })
  }
  
  return reactElementToJSXString(<React.Fragment key={""}>{jsxEle({ idSchema: getIdSchema })}</React.Fragment>, {
    filterProps: ['key'],
    displayName(element: any) {
      return getSchemaMap[String(element.key).replace(/[^\w]|$/g, '')]?.componentName || ''
    },
  })
};

export const parse = (getIdSchema: IdSchema, getSchemaMap: SchemaMap) => {
  // ${getImports(uiTree)}
  const jsxString = getJsx(getIdSchema, getSchemaMap);

  const str = `

  function Page (){

    return ${jsxString}
  }

  export default Page
  `;
  return prettier.format(str, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};
