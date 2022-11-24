import classNames from 'classnames/bind';
import styles from './Compiler.module.scss';

//
import { useState, useRef, useEffect } from 'react';
//component
import ConsoleCompiler from '~/layout/components/ConsoleCompiler';
import ControlCompiler from '~/layout/components/ControlCompiler';
import EditorCompiler from '~/layout/components/EditorCompiler';

const cx = classNames.bind(styles);

function Compiler() {
    const [heightEditor, setHeightEditor] = useState('');
    const [heightConsole, setHeightConsole] = useState('');
    const [result, setResult] = useState('');
    const [err, setErr] = useState('');
    const EditorContainer = useRef(null);
    useEffect(() => {
        setHeightEditor(EditorContainer.current.offsetHeight - 28 - 5);
        setHeightConsole(28);
    }, []);
    const InitResize = () => {
        window.addEventListener('mousemove', HandleResizing, false);
        window.addEventListener('mouseup', RemoveHandleResizing, false);
    };
    const HandleResizing = (e) => {
        setHeightEditor(e.clientY - EditorContainer.current.offsetTop);
        setHeightConsole(EditorContainer.current.offsetHeight + EditorContainer.current.offsetTop - e.clientY);

        if (EditorContainer.current.offsetHeight + EditorContainer.current.offsetTop - e.clientY < 28) {
            setHeightEditor(EditorContainer.current.offsetHeight - 28 - 5);
            setHeightConsole(28);
        }

        if (e.clientY < EditorContainer.current.offsetTop - 5) {
            RemoveHandleResizing();
            setHeightEditor(0);
            setHeightConsole(EditorContainer.current.offsetHeight);
        }
    };
    const RemoveHandleResizing = () => {
        window.removeEventListener('mousemove', HandleResizing, false);
        window.removeEventListener('mouseup', RemoveHandleResizing, false);
    };
    return (
        <div className={cx('compiler')}>
            <ControlCompiler />
            <div className={cx('container')} ref={EditorContainer}>
                <div className={cx('editor')} id="editor-js" style={{ height: `${heightEditor}px` }}>
                    <EditorCompiler result={result} setResult={setResult} err={err} setErr={setErr} />
                </div>
                <div className={cx('resizing-compiler')} id="resizing-compiler-js" onMouseDown={InitResize}></div>
                <div className={cx('console')} id="console-js" style={{ height: `${heightConsole}px` }}>
                    <ConsoleCompiler result={result} err={err} />
                </div>
            </div>
        </div>
    );
}

export default Compiler;
