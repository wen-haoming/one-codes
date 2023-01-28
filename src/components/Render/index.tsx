import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { IdSchema, idSchema, SchemaMap, schemaMap } from '@/store';
import type { FC } from 'react';
import { ref, useSnapshot } from 'valtio';


const NestedRender = (
  props: {
    idSchema: IdSchema,
    schemaMap: SchemaMap
  }
) => {
  const idSchemaSnap = props.idSchema
  const schemaMapSnap = props.schemaMap

  return (
    <>
      {idSchemaSnap.map(({ id, slot }) => {
        const UiComponent = ref(schemaMapSnap)[id].component;
        const props = ref(schemaMapSnap)[id].props;
        if (slot) {
          return <Wrapper key={id} id={id}>
            <UiComponent {...props} >
              <NestedRender key={id} idSchema={slot} schemaMap={schemaMapSnap} />
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

  return <>
    <NestedRender idSchema={idSchemaSnap} schemaMap={schemaMapSnap} />
    <AddWidget />
  </>

};

export default Render;
