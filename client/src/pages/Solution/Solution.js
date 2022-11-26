import classNames from 'classnames/bind';
import styles from './Solution.module.scss';
import axios from 'axios';
//
import { useState, useRef, useEffect } from 'react';
//component
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SolutionTestCase from '~/layout/components/SolutionTestCase/SolutionTestCase';

const cx = classNames.bind(styles);

function Solution() {
    const [practices, setPractice] = useState([]);
    const [chooseLanguage, setChooseLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    let user = useSelector((state) => state.auth.login?.currentUser);

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
    }, [id]);
    const handlechanelanguage = (e) => {
        if (e.target.value === 'C++') {
            setChooseLanguage('cpp');
        }
        if (e.target.value === 'C#') {
            setChooseLanguage('cs');
        }
        if (e.target.value === 'Java') {
            setChooseLanguage('java');
        }
        if (e.target.value === 'Python') {
            setChooseLanguage('python');
        }
    };
    function handleEditorChange(value) {
        setCode(value);
    }
    const handleSubmit = () => {
        axios
            .post('localhost:3240/v1/users/submitCode', {
                language: chooseLanguage,
                code: code,
                userId: user.user?._id,
                practiceId: id,
            })
            .then(function (response) {
                console.log(response.data);
                //setResult(response.data.data.output);
                //setErr(response.data.data.error);
            })
            .catch(function (error) {
                console.log(error);
                //setErr(error);
            });
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
                            {practices.example?.sample.map((out, index) => {
                                return <p key={index}>{out}</p>;
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
                            {practices.sampleInput?.map((out, index) => {
                                return <p key={index}>{out}</p>;
                            })}
                        </div>
                        <h3 style={{ margin: '10px' }}>Sample Output: </h3>
                        <div style={{ margin: '10px' }}>
                            Output:{' '}
                            {practices.sampleOutput?.map((out, index) => {
                                return <p key={index}>{out}</p>;
                            })}
                        </div>
                    </div>
                }
            </div>
            <div className={cx('solution')}>
                <SolutionTestCase />
            </div>
        </div>
    );
}

export default Solution;
