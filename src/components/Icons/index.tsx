import { Button ,Modal} from "antd"
import {useBoolean} from 'ahooks';

function Icons({value,onChangex}){
  const [open,{setTrue,setFalse}] = useBoolean()

  return <>
  <Button>
      
  </Button>
  <Modal >

  </Modal>
  </>
}

export default Icons
