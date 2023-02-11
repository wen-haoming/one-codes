import { IdSchema, idSchema, SchemaMap, schemaMap } from '@/store';
import { parse } from '@/utils/parse';
import { useSnapshot } from 'valtio';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

export const Code = () => {
  const idSchemaSnap = useSnapshot(idSchema);
  const schemaMapSnap = useSnapshot(schemaMap);

  return <CodeMirror theme={vscodeDark} readOnly height='100%' value={parse(idSchemaSnap as IdSchema,schemaMapSnap as SchemaMap) || ''} className="h-100%" extensions={[javascript({ jsx: true, typescript: true })]} />;
};

export default Code;
