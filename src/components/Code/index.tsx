import { useSnapshot } from 'valtio';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark, } from '@uiw/codemirror-theme-vscode';
import { currentState } from '@/store';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';


export const Code = () => {
  const currentStateSnap = useSnapshot(currentState);

  return <CodeMirror
    style={{ fontSize: 12 }}
    theme={vscodeDark}
    readOnly
    height='100%'
    value={prettier.format(currentStateSnap.code.replace(/componentid=["'].*?["']/g,''), {
      parser: 'babel',
      plugins: [parserBabel],
    })}
    className="h-100%" extensions={[javascript({ jsx: true, typescript: true })]} />;
};

export default Code;
