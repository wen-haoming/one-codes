import { parse } from '@/utils/parse';
import { useSnapshot } from 'valtio';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark, } from '@uiw/codemirror-theme-vscode';
import { IdSchema, idSchemaState ,schemaMapState} from '@/store';

export const Code = () => {
  const idSchemaSnap = useSnapshot(idSchemaState);
  const schemaMapSnap = useSnapshot(schemaMapState);

  return <CodeMirror theme={vscodeDark} readOnly height='100%' value={''} className="h-100%" extensions={[javascript({ jsx: true, typescript: true })]} />;
};

export default Code;
