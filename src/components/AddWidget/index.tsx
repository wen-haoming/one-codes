import { idSchema, globalProps, schemaMap, IdSchema } from '@/store';
import { getId } from '@/utils';
import { CodepenOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { ReactElement, useState } from 'react';
import get from 'lodash.get'
import { useSnapshot } from 'valtio';
import { depsMap } from '@/store/depsMap';

const AddWidget = (props: {
  slotId?: string; // 嵌套在哪个组件的id
  children?: ReactElement
}) => {
  const { slotId } = props;
  const [open, setOpen] = useState(false);
  const depsMapSnap = useSnapshot(depsMap)


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
            Object.entries(depsMapSnap.depsConfig).map(([moduleName,depsList])=>{
             return  <div  key={moduleName}>
              <span className="m-0 text-gray text-1 text-16px">{moduleName}</span>
              <div className="flex flex-row flex-wrap">
                {
                  depsList.moduleConfig.map((dependencyItem, idx2) => {
                    return <div
                      className="widgetBtn flex-1 text-2 flex items-center"
                      onClick={() => {
                        // const id = getId();
                        // let path = '';
                        // if (slotId) {
                        //   const target = get(idSchema, schemaMap[slotId].path);
                        //   if (target) {
                        //     if (target.slot) {
                        //       target.slot.push({
                        //         id,
                        //       });
                        //     } else {
                        //       target.slot = [({
                        //         id,
                        //       })]
                        //     }
                        //   }
                        //   if (schemaMap[slotId].path) {
                        //     path = `${schemaMap[slotId].path}.slot[${target.slot.length - 1}]`;
                        //     console.log(JSON.stringify(idSchema), path);
                        //   } else {
                        //     path = `[${target.slot.length - 1}]`
                        //   }
                        // } else {
                        //   idSchema.push({
                        //     id,
                        //   });
                        //   path = `[${idSchema.length - 1}]`
                        // }
                        // schemaMap[id] = {
                        //   props: ele.defaultProps || null,
                        //   component: ele.component,
                        //   componentName: ele.componentName,
                        //   configProps: ele.configProps,
                        //   path: path
                        // };
                        // setOpen(false);
                      }
                      }
                      key={dependencyItem.moduleName}
                    >
                      <CodepenOutlined
                        style={{ color: '#2558fb' }}
                        className="m-r-3 text-4"
                      />
                      {dependencyItem.moduleName}
                    </div>
                  })
                }
              </div>
            </div>
            })
            // globalProps.install.map((item, idx) => {
            //   return 
            // })
          }
        </div>
      }
    >
      <Button size="small" className='text-brand-primary' type="link"
        icon={<PlusSquareOutlined />} />
      {/* <Button
        className='bg-brand-primary  text-white	text-10px cursor-pointer p-8px'
        type="primary"
        icon={<PlusOutlined
          style={{ fontSize: 12 }}
        />} /> */}
    </Popover>
  );
};

export default AddWidget;
