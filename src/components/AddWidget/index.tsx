import { idSchema, globalProps, schemaMap, IdSchema } from '@/store';
import { getId } from '@/utils';
import { CodepenOutlined, FireOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useState } from 'react';

const AddWidget = (props: {
  slotId?: string; // 嵌套在哪个组件的id
}) => {
  const { slotId } = props;
  const [open, setOpen] = useState(false);

  // const addComp = (type: keyof typeof componentsInstall) => {
  //   const id = getId();
  //   idSchema.push({
  //     id,
  //   });
  //   schemaMap[id] = {
  //     props: null,
  //     component: componentsInstall[type],
  //   };
  //   setOpen(false);
  // };

  const addComp = (addCompProps: {
    ele: any;
    defaultProps: any;
  }) => {
    const { ele ,defaultProps = null} = addCompProps
    const id = getId();
    if (slotId) {
      const searchId = (idSchema2: IdSchema) => {
        return idSchema2.find(schema => {
          if (schema.id === slotId) {
            return true
          } else if (schema.slot) {
            return searchId(schema.slot)
          }
          return false
        })
      }
      const target = searchId(idSchema);
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
      schemaMap[id] = {
        props: defaultProps,
        component: ele,
      };
    } else {
      idSchema.push({
        id,
      });
      schemaMap[id] = {
        props: defaultProps,
        component: ele,
      };
    }

    setOpen(false);
  };

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
        <div className="w-250px h-200px">
          {/* <p className="m-0 text-gray text-1">基础</p>
          <div className="flex flex-row flex-wrap">
            <div
              className="widgetBtn flex-1 text-2 flex items-center"
              onClick={() => addComp('TableFormRender')}
            >
              <CodepenOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              查询表单
            </div>
            <div className="widgetBtn flex-1 text-2  flex items-center">
              <CodepenOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              弹窗表单
            </div>
          </div>
          <p className="m-0 text-gray text-1">样式</p>
          <div className="flex flex-row flex-wrap">
            <div
              className="widgetBtn flex-1 text-2 flex items-center"
              onClick={() => addComp('AntDivider')}
            >
              <FireOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              分割线
            </div>
            <div className="widgetBtn flex-1 text-2  flex items-center">
              <FireOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              栅格
            </div>
          </div> */}
          {
            globalProps.install.map((item, idx) => {
              return <div key={idx}>
                <p className="m-0 text-gray text-1">{item.typeName}</p>
                <div className="flex flex-row flex-wrap">
                  {
                    item.children.map((ele, idx2) => {
                      return <div
                        className="widgetBtn flex-1 text-2 flex items-center"
                        onClick={() => addComp({
                          ele: ele.component,
                          defaultProps: ele.defaultProps
                        })}
                        key={`${idx}-${idx2}-${ele.title || ele.component.name}`}
                      >
                        <CodepenOutlined
                          style={{ color: '#2558fb' }}
                          className="m-r-3 text-4"
                        />
                        {ele.title || ele.component.name}
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
      <div className="btn w-6 h-6 ">+</div>
    </Popover>
  );
};

export default AddWidget;
