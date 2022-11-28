import classNames from 'classnames/bind';
import styles from './EditorCompiler.module.scss';
//components
import MonacoEditor from '@monaco-editor/react';
import Button from '~/components/Button/Button';
import { BsX, BsPlayFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import * as compilerService from '~/services/CompilerService';
import axios from 'axios';

const cx = classNames.bind(styles);

function EditorCompiler({ result, setResult, err, setErr }) {
    const cpp =
        '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout<<"hello world";\n    return 0;\n}';
    const cs =
        'using System;\r\n\r\nnamespace Main {\r\n    class Program {\r\n        static void Main(string[] args) {\r\n            Console.WriteLine("Hello World!");\r\n        }\r\n    }\r\n}';
    const java =
        'public class Main {\r\n    public static void main(String[] args) {\r\n        System.out.println("Hello World!");\r\n    }\r\n}';
    const py = 'print("hello world!");';
    const [chooseLanguage, setChooseLanguage] = useState('cpp');
    const [code, setCode] = useState(cpp);
    const [inputComp, setInputComp] = useState('');
    const [fifeType, setFifeType] = useState('cpp');
    const [value, setvalue] = useState(
        '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout<<"hello world";\n    return 0;\n}',
    );
    function handleEditorChange(value) {
        setCode(value);
    }
    const handleChanelLanguage = (e) => {
        if (e.target.value === 'C++') {
            setChooseLanguage('cpp');
            setFifeType('cpp');
            setvalue(cpp);
            setCode(cpp);
        }
        if (e.target.value === 'C#') {
            setChooseLanguage('cs');
            setFifeType('cs');
            setvalue(cs);
            setCode(cs);
        }
        if (e.target.value === 'Java') {
            setChooseLanguage('java');
            setFifeType('java');
            setvalue(java);
            setCode(java);
        }
        if (e.target.value === 'Python') {
            setChooseLanguage('python');
            setFifeType('py');
            setvalue(py);
            setCode(py);
        }
    };
    const handleRunCode = async () => {
        if (inputComp === '') {
            console.log('test');
            console.log('value: ' + value);
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/compile`, {
                    chooseLanguage: chooseLanguage,
                    code: code,
                })
                .then(function (response) {
                    //console.log(response.data.data.output);
                    console.log(response);
                    setResult(response.data.data.output);
                    setErr(response.data.data.error);
                })
                .catch(function (error) {
                    setErr(error);
                });

            // const res = await compilerService.compilerRun({
            //     chooseLanguage: chooseLanguage,
            //     code: code,
            // });
            // if (res) {
            //     setResult(res?.data?.output);
            //     setErr(res?.data?.error);
            // }
        } else {
            // const res = await compilerService.compilerRunInput({
            //     chooseLanguage: chooseLanguage,
            //     code: code,
            //     input: inputComp,
            // });
            // setResult(res?.data?.output);
            // setErr(res?.data?.error);
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/compile/input`, {
                    chooseLanguage: chooseLanguage,
                    code: code,
                    input: inputComp,
                })
                .then(function (response) {
                    //console.log(response.data.data.output);
                    setResult(response.data.data.output);
                    setErr(response.data.data.error);
                })
                .catch(function (error) {
                    //console.log('error');
                    setErr(error);
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control-fife')}>
                <div className={cx('fife-container')}>
                    <div className={cx('item-fife', 'active')}>
                        <div className={cx('item-content')}>Code.{fifeType}</div>
                        <div className={cx('item-icon')}>
                            <BsX />
                        </div>
                    </div>
                </div>
                <div className={cx('control')}>
                    <div className={cx('option-lang')}>
                        <label>Lựa chọn ngôn ngữ:</label>
                        <select name="languages" id="languages" onChange={handleChanelLanguage}>
                            <option>C++</option>
                            <option>C#</option>
                            <option>Java</option>
                            <option>Python</option>
                        </select>
                    </div>
                    <Button className={cx('btn-control')} iconBackgroundHover onClick={handleRunCode}>
                        Run <BsPlayFill />
                    </Button>
                </div>
            </div>
            {/* <div className={cx('address-fife')}></div> */}
            <div className={cx('editor-content')}>
                <MonacoEditor
                    height="100%"
                    width="100%"
                    theme="vs-light"
                    language={chooseLanguage} //cpp, java, python,cs
                    value={value}
                    onChange={handleEditorChange}
                />
                <div className={cx('input-compiler')}>
                    <div className={cx('field')}>
                        <Typography variant="h6" sx={{ fontSize: '20px', padding: '10px' }}>
                            Enter input
                        </Typography>
                        <div id="note-input" className={cx('textbox')}>
                            <textarea
                                placeholder="Enter input"
                                className={cx('component')}
                                onChange={(e) => setInputComp(e.target.value)}
                            ></textarea>
                            <span className={cx('caret')}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditorCompiler;
