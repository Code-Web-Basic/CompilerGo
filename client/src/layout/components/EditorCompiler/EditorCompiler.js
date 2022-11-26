import classNames from 'classnames/bind';
import styles from './EditorCompiler.module.scss';
//components
import MonacoEditor from '@monaco-editor/react';
import Button from '~/components/Button/Button';
import { BsX, BsPlayFill } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
const cx = classNames.bind(styles);

function EditorCompiler({ result, setResult, err, setErr }) {
    const [chooseLanguage, setChooseLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    const [inputComp, setInputComp] = useState('');
    const [fifeType, setFifeType] = useState('cpp');
    function handleEditorChange(value) {
        setCode(value);
    }
    const handleChanelLanguage = (e) => {
        if (e.target.value === 'C++') {
            setChooseLanguage('cpp');
            setFifeType('cpp');
        }
        if (e.target.value === 'C#') {
            setChooseLanguage('cs');
            setFifeType('cs');
        }
        if (e.target.value === 'Java') {
            setChooseLanguage('java');
            setFifeType('java');
        }
        if (e.target.value === 'Python') {
            setChooseLanguage('python');
            setFifeType('py');
        }
    };
    const handleRunCode = () => {
        if (inputComp === '') {
            axios
                .post('http://localhost:3240/v1/compile', {
                    chooseLanguage: chooseLanguage,
                    code: code,
                })
                .then(function (response) {
                    //console.log(response.data.data.output);
                    setResult(response.data.data.output);
                    setErr(response.data.data.error);
                })
                .catch(function (error) {
                    setErr(error);
                });
        } else {
            axios
                .post('http://localhost:3240/v1/compile/input', {
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
