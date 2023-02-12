import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { IdSchema, store } from '@/store';
import { ConfigProvider } from 'antd';
import type { FC } from 'react';
import { useSnapshot } from 'valtio';

const NestedRender = (
  props: {
    idSchema: IdSchema,
  }
) => {
  const idSchemaSnap = props.idSchema;
  useSnapshot(store.schemaMap);
  return (
    <>
      {idSchemaSnap.map(({ id, slot }) => {
        const UiComponent = (store.schemaMap)[id].component;
        const props = (store.schemaMap)[id].props;
        if (slot) {
          return <Wrapper key={id} id={id}>
            <UiComponent {...props} >
              <NestedRender idSchema={slot} />
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
  const idSchemaSnap = useSnapshot(store.idSchema);
  const schemaMapSnap = useSnapshot(store.schemaMap);

  return <><ConfigProvider prefixCls='ant'>
    <NestedRender idSchema={idSchemaSnap as IdSchema} />
  </ConfigProvider>
    <div className='w-100%'>
      <AddWidget />
    </div>
  </>

};

export default Render;
