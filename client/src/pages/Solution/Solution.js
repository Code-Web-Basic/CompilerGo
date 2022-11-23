import classNames from 'classnames/bind';
import styles from './Solution.module.scss';
import axios from 'axios';
//
import { useState, useRef, useEffect } from 'react';
//component
import ConsoleCompiler from '~/layout/components/ConsoleCompiler';
import ControlCompiler from '~/layout/components/ControlCompiler';
import EditorCompiler from '~/layout/components/EditorCompiler';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function Solution() {
    const [heightEditor, setHeightEditor] = useState('');
    const [heightConsole, setHeightConsole] = useState('');
    const [practices, setPractice] = useState([]);
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
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:3240/v1/practice/findOneById/${id}`)
            .then(function (response) {
                //console.log(response.data);
                setPractice(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('topic')}>
                {
                    <div>
                        <p>{practices.task}</p>
                        <p>{practices.inputFormat}</p>
                    </div>
                }
            </div>
            <div className={cx('solution')}>
                <ControlCompiler />
                <div className={cx('container')} ref={EditorContainer}>
                    <div className={cx('editor')} id="editor-js" style={{ height: `${heightEditor}px` }}>
                        <EditorCompiler />
                    </div>
                    <div className={cx('resizing-compiler')} id="resizing-compiler-js" onMouseDown={InitResize}></div>
                    <div className={cx('console')} id="console-js" style={{ height: `${heightConsole}px` }}>
                        <ConsoleCompiler />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solution;
