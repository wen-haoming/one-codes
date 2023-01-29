import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { IdSchema, idSchema, schemaMap } from '@/store';
import type { FC } from 'react';
import { useSnapshot, } from 'valtio';

const NestedRender = (
  props: {
    idSchema: IdSchema,
  }
) => {
  const idSchemaSnap = props.idSchema
  useSnapshot(schemaMap);

  return (
    <>
      {idSchemaSnap.map(({ id, slot }) => {
        const UiComponent = ((schemaMap)[id].component);
        const props = ((schemaMap)[id].props);

        if (slot) {
          return <Wrapper key={id} id={id}>
            <UiComponent {...props} >
              {
                slot.map(slotItem => {
                  const props2 = ((schemaMap)[slotItem.id].props);
                  const UiComponent2 = ((schemaMap)[slotItem.id].component);
                  return <Wrapper key={slotItem.id} id={slotItem.id}>
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

  return <>
    <NestedRender idSchema={idSchemaSnap as IdSchema} />
    <AddWidget />
  </>

};

export default Render;
