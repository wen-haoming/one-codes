import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { IdSchema, idSchema, SchemaMap, schemaMap } from '@/store';
import { ConfigProvider } from 'antd';
import type { FC } from 'react';
import { ref, useSnapshot } from 'valtio';

const NestedRender = (
  props: {
    idSchema: IdSchema,
    schemaMap: SchemaMap
  }
) => {
  const idSchemaSnap = props.idSchema
  useSnapshot(schemaMap)
  return (
    <>
      {idSchemaSnap.map(({ id, slot }) => {
        const UiComponent = (schemaMap)[id].component;
        const props = (schemaMap)[id].props;
        if (slot) {
          return <Wrapper key={id} id={id}>
            <UiComponent {...props} >
              {
                slot.map(slotItem => {
                  const props2 = (schemaMap)[slotItem.id].props;
                  const UiComponent2 = (schemaMap)[slotItem.id].component;
                  return <Wrapper key={slotItem.id} id={slotItem.id} >
                    <UiComponent2 {...props2} />
                  </Wrapper>
                })
              }
            </UiComponent>
          </Wrapper>
        }

        return (
          <Wrapper key={id} id={id}>
            <UiComponent {...props} />
          </Wrapper>
        );
      })}
    </>
  );
}

export const Render: FC = () => {
  const idSchemaSnap = useSnapshot(idSchema);
  const schemaMapSnap = useSnapshot(schemaMap);

  return <><ConfigProvider prefixCls='ant'>
    <NestedRender idSchema={idSchemaSnap as IdSchema} schemaMap={schemaMapSnap as SchemaMap} />
  </ConfigProvider>
    <div className='w-100%'>
    <AddWidget />
    </div>
  </>

};

export default Render;
