import { getId } from '@/utils';
import { CodepenOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { ReactElement, useState } from 'react';
import get from 'lodash.get'
import { ref, useSnapshot } from 'valtio';
import { JSONProps } from '@/layout/LeftPanel/JSONView';
import { dependencyConfigState, idSchemaState, schemaMapState } from '@/store';

const AddWidget = (props: {
  slotId?: string; // 嵌套在哪个组件的id
  children?: ReactElement
}) => {
  const { slotId } = props;
  const [open, setOpen] = useState(false);
  const dependencyConfigSnap = useSnapshot(dependencyConfigState).dependencyConfigState
  return (
    <Popover
      overlayClassName="p-0"
      style={{ padding: 0 }}
      overlayInnerStyle={{ padding: 0, borderRadius: 8 }}
      overlayStyle={{ padding: 0 }}
      arrow={false}
      placement="bottomLeft"
      trigger={['click', 'hover']}
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="w-350px min-h-200px z-9999999999999 p-15px" >
          {
           (dependencyConfigSnap).map((dependencyItem, depsList) => {
              
              return (dependencyItem.moduleConfig || []).length > 0 ? <div key={dependencyItem.libraryName}>
                <span className="m-0 text-gray text-1 text-16px">{dependencyItem.libraryName}</span>
                <div className="flex flex-row flex-wrap">
                  {
                    dependencyItem.moduleConfig!.map((componentItem, idx2) => {
                      const { isSlot, moduleName } = componentItem
                      return <div
                        className="widgetBtn flex-1 text-2 flex items-center"
                        onClick={() => {
                          const id = getId();
                          let path = '';
                          // 
                          if (slotId) {
                            const target = get(idSchemaState.idSchema, schemaMapState.schemaMap[slotId].path);
                            if (target) {
                              if (target.slot) {
                                target.slot.push({
                                  id,
                                });
                              } else {
                                target.slot = [({
                                  id,
                                })]
                              }
                            }
                            if (schemaMapState.schemaMap[slotId].path) {
                              path = `${schemaMapState.schemaMap[slotId].path}.slot[${target.slot.length - 1}]`;
                            } else {
                              path = `[${target.slot.length - 1}]`
                            }
                          } else {
                            idSchemaState.idSchema.push({
                              id,
                            });
                            path = `[${idSchemaState.idSchema.length - 1}]`
                          }
                          schemaMapState.schemaMap[id] = {
                            props: {},
                            isSlot: isSlot,
                            componentName: componentItem.moduleName,
                            path: path,
                            libraryName: dependencyItem.libraryGlobalImport!,
                            defaultProps: JSON.parse(JSON.stringify(((componentItem.defaultProps || []) as JSONProps[])))
                          };
                          setOpen(false);
                        }
                        }
                        key={componentItem.moduleName}
                      >
                        <CodepenOutlined
                          style={{ color: '#2558fb' }}
                          className="m-r-3 text-4"
                        />
                        {componentItem.moduleName}
                      </div>
                    })
                  }
                </div>
              </div> : null
            })
          }
        </div>
      }
    >
      <Button size="small" className='text-brand-primary' type="link"
        icon={<PlusSquareOutlined />} />
    </Popover>
  );
};

export default AddWidget;
