import { idSchema, globalProps, schemaMap, IdSchema } from '@/store';
import { getId } from '@/utils';
import { CodepenOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { ReactElement, useState } from 'react';
import get from 'lodash.get'

const AddWidget = (props: {
  slotId?: string; // 嵌套在哪个组件的id
  children?: ReactElement
}) => {
  const { slotId } = props;
  const [open, setOpen] = useState(false);

  return (
    <Popover
      overlayClassName="p-0"
      style={{ padding: 0 }}
      overlayInnerStyle={{ padding: 0, borderRadius: 8 }}
      overlayStyle={{ padding: 0 }}
      showArrow={false}
      arrowPointAtCenter={true}
      placement="bottomLeft"
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="w-350px min-h-200px">
          {
            globalProps.install.map((item, idx) => {
              return <div key={idx}>
                <p className="m-0 text-gray text-1">{item.typeName}</p>
                <div className="flex flex-row flex-wrap">
                  {
                    item.children.map((ele, idx2) => {
                      return <div
                        className="widgetBtn flex-1 text-2 flex items-center"
                        onClick={() => {
                          const id = getId();
                          let path = '';
                          if (slotId) {
                            const target = get(idSchema, schemaMap[slotId].path);
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
                            path = `${schemaMap[slotId].path}[${target.slot.length - 1}]`
                          } else {
                            idSchema.push({
                              id,
                            });
                            path = `[${idSchema.length - 1}]`
                          }
                          schemaMap[id] = {
                            props: ele.defaultProps || null,
                            component: ele.component,
                            componentName: ele.componentName ,
                            configProps: ele.configProps,
                            path: path
                          };
                          setOpen(false);
                        }
                        }
                        key={`${idx}-${idx2}-${ele.title || ele.component.name}`}
                      >
                        <CodepenOutlined
                          style={{ color: '#2558fb' }}
                          className="m-r-3 text-4"
                        />
                        {ele.title || ele.componentName}
                      </div>
                    })
                  }
                </div>
              </div>
            })
          }
        </div>
      }
    >
      {props.children ? props.children : <div className="btn w-6 h-6 ">+</div>}
    </Popover>
  );
};

export default AddWidget;
