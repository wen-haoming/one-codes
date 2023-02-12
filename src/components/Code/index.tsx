import { store } from '@/store';
import { parse } from '@/utils/parse';
import { useSnapshot } from 'valtio';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark, } from '@uiw/codemirror-theme-vscode';
import { IdSchema } from '@/store/idSchema';
import { SchemaMap } from '@/store/schemaMap';

export const Code = () => {
  const idSchemaSnap = useSnapshot(store.idSchema);
  const schemaMapSnap = useSnapshot(store.schemaMap);

  return <CodeMirror theme={vscodeDark} readOnly height='100%' value={parse(idSchemaSnap as IdSchema,schemaMapSnap as SchemaMap) || ''} className="h-100%" extensions={[javascript({ jsx: true, typescript: true })]} />;
};

export default Code;
