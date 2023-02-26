import React, { ReactNode, useMemo, useState } from 'react';
import { Button, Dropdown, Tree } from 'antd';
import { useSnapshot } from 'valtio';
import { currentState, IdSchema, idSchemaState, schemaMapState } from '@/store';
import { DeleteOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';


const ComponentTree: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const idSchemaStateSnap = useSnapshot(idSchemaState).idSchema
  const schemaMapSnap = useSnapshot(schemaMapState).schemaMap;

  const treeData = useMemo(() => {
    const getTree: any = (schemaList: typeof idSchemaStateSnap) => {
      return schemaList.map(item => {
        const { id, slot } = item;
        const { componentName, libraryName } = schemaMapSnap[id]
        return {
          title: componentName,
          key: id,
          ...schemaMapSnap[id],
          children: slot ? getTree(slot) : []
        }
      })
    }
    const getTreeData = getTree(idSchemaStateSnap);
    return getTreeData
  }, [idSchemaStateSnap, schemaMapSnap])

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      blockNode
      showLine
      titleRender={(node) => {
        return <div className='group flex justify-between align-middle' onClick={() => {
          if (node.key) {
            currentState.id = String(node.key);
          }
        }} >{node.title as ReactNode}
          <Dropdown menu={{
            items: [
              { label: '往上增加', key: '往下上增加', icon: <PlusOutlined style={{ fontSize: 16 }} /> },
              { label: '往里增加', key: '往里增加', icon: <PlusOutlined style={{ fontSize: 16 }} /> },
              { label: '往下增加', key: '往下增加', icon: <PlusOutlined style={{ fontSize: 16 }} /> },
              {
                label: '删除', key: '删除', icon: <DeleteOutlined style={{ fontSize: 16, }} />, danger: true, onClick() {
                  setTimeout(() => {
                    console.log(node, 'node')
                    const searchId: any = (idSchema2: IdSchema) => {
                      return idSchema2.find((schema, idx) => {
                        if (schema.id === node.key) {
                          idSchema2.splice(idx, 1);
                          return true
                        } else if (schema.slot) {
                          return searchId(schema.slot)
                        }
                        return false
                      })
                    }
                    searchId(idSchemaState.idSchema)
                    delete schemaMapState.schemaMap[node.key];
                    currentState.id = ''
                  })
                }
              }
            ]
          }} placement="bottomLeft" arrow={false}>
            <Button className='hidden group-hover:inline-block' size="small" type="text" icon={<EllipsisOutlined className='font-semibold text-gray' />}></Button>
          </Dropdown>
        </div>
      }}
      autoExpandParent={autoExpandParent}
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}

    />
  );
};

export default ComponentTree;
