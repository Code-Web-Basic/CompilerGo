import styles from './Solution.module.scss';
import axios from 'axios';
import classNames from 'classnames/bind';
//
import React, { useState, useRef, useEffect } from 'react';
//component

import { useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import { BsX, BsPlayFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
//icon

//component
import Button from '~/components/Button/Button';
//
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const cx = classNames.bind(styles);
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function Solution() {
    const [heightEditor, setHeightEditor] = useState('');
    const [heightConsole, setHeightConsole] = useState('');
    const [practices, setPractice] = useState([]);
    const [chooselanguage, setChooselanguage] = useState('cpp');
    const [result, setResult] = useState([]);
    const [err, setError] = useState('');
    const [code, setCode] = useState('');
    const EditorContainer = useRef(null);
    let user = useSelector((state) => state.auth.login?.currentUser);
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
    }, []);
    const handlechanelanguage = (e) => {
        if (e.target.value === 'C++') {
            setChooselanguage('cpp');
        }
        if (e.target.value === 'C#') {
            setChooselanguage('cs');
        }
        if (e.target.value === 'Java') {
            setChooselanguage('java');
        }
        if (e.target.value === 'Python') {
            setChooselanguage('python');
        }
    };
    function handleEditorChange(value) {
        setCode(value);
    }
    const handleSubmit = () => {
        axios
            .post('http://localhost:3240/v1/users/submitCode', {
                language: chooselanguage,
                code: code,
                userId: user.user._id,
                practiceId: id,
            })
            .then(function (response) {
                console.log(response);
                setResult(response.data.data);
                setError(response.data.error);
            })
            .catch(function (error) {
                setError(error);
            });
    };
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('topic')}>
                {
                    <div>
                        <h1 style={{ margin: '10px' }}>{practices.title}</h1>
                        <p style={{ margin: '10px' }}>Đề bài: {practices.task}</p>
                        <h3 style={{ margin: '10px' }}>Example:</h3>
                        <p style={{ margin: '10px' }}>{practices.example?.content}</p>
                        <div style={{ margin: '10px' }}>
                            Output:{' '}
                            {practices.example?.sample.map((out) => {
                                return <p>{out}</p>;
                            })}
                        </div>
                        <h3 style={{ margin: '10px' }}>Input format:</h3>
                        <p style={{ margin: '10px' }}>{practices.inputFormat}</p>
                        <h5 style={{ margin: '10px' }}>Constraints</h5>
                        <p style={{ margin: '10px' }}>{practices.constraints}</p>
                        <h3 style={{ margin: '10px' }}>Output format:</h3>
                        <p style={{ margin: '10px' }}>{practices.outputFormat}</p>
                        <h3 style={{ margin: '10px' }}>Sample Input: </h3>
                        <div style={{ margin: '10px' }}>
                            Input:{' '}
                            {practices.sampleInput?.map((out) => {
                                return <p>{out}</p>;
                            })}
                        </div>
                        <h3 style={{ margin: '10px' }}>Sample Output: </h3>
                        <div style={{ margin: '10px' }}>
                            Output:{' '}
                            {practices.sampleOutput?.map((out) => {
                                return <p>{out}</p>;
                            })}
                        </div>
                    </div>
                }
            </div>
            <div className={cx('solution')}>
                <div className={cx('container')} ref={EditorContainer}>
                    <div className={cx('editor')} id="editor-js" style={{ height: `${heightEditor}px` }}>
                        <div className={cx('control-fife')}>
                            <div className={cx('fife-container')}>
                                <div className={cx('item-fife', 'active')}>
                                    <div className={cx('item-content')}>Code.txt</div>
                                    <div className={cx('item-icon')}>
                                        <BsX />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('control')}>
                                <div className={cx('option-lang')}>
                                    <label>Lựa chọn ngôn ngữ:</label>
                                    <select name="languages" id="languages" onChange={handlechanelanguage}>
                                        <option>C++</option>
                                        <option>C#</option>
                                        <option>Java</option>
                                        <option>Python</option>
                                    </select>
                                </div>
                                <Button className={cx('btn-control')} iconBackgroundHover onClick={handleSubmit}>
                                    Run <BsPlayFill />
                                </Button>
                            </div>
                        </div>
                        <div className={cx('address-fife')}></div>
                        <div className={cx('editor-content')}>
                            <MonacoEditor
                                height="100%"
                                width="100%"
                                theme="vs-light"
                                language={chooselanguage} //cpp, java, python,cs
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>
                    <div className={cx('resizing-compiler')} id="resizing-compiler-js" onMouseDown={InitResize}></div>
                    <div className={cx('console')} id="console-js" style={{ height: `${heightConsole}px` }}>
                        <div className={cx('container')}>
                            <div className={cx('sub')}>
                                <div className={cx('Control-container')}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab
                                                    label="TestCase 1"
                                                    {...a11yProps(0)}
                                                    sx={{ fontSize: '15px', fontWeight: '600' }}
                                                />
                                                <Tab
                                                    label="TestCase 2"
                                                    {...a11yProps(1)}
                                                    sx={{ fontSize: '15px', fontWeight: '600' }}
                                                />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <div className={cx('testcase')}>
                                                {result.length !== 0
                                                    ? result[0].success === true
                                                        ? 'pass'
                                                        : 'no pass'
                                                    : ''}
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <div className={cx('testcase')}>
                                                {result.length !== 0
                                                    ? result[1].success === true
                                                        ? 'pass'
                                                        : 'no pass'
                                                    : ''}
                                            </div>
                                        </TabPanel>
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className={cx('control-bottom')}>.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Solution;
