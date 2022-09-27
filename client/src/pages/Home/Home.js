import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
//icon
import { BsCheck2Circle } from 'react-icons/bs';
//component
import Button from '~/components/Button/Button';
import images from '~/asset/images';
//routes
import { ConfigRouter } from '~/config';
import * as httpRequest from '~/utils/httpRequest';
const cx = classNames.bind(styles);
function Home() {
    useEffect(() => {
        const getUser = async () => {
            const res = await httpRequest.get('users/signIn/success');

            console.log(res);
        };
        getUser();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <img src={images.backgroundHome} className={cx('backgroundImage')} alt="Background" />
            <div className={cx('container')}>
                <div className={cx('content-left')}>
                    <div className={cx('description')}>
                        <div>
                            <h5>LEARN TO CODE:</h5>
                            <br />
                            <h1 className={cx('text')}>FROM ZERO TO HERO</h1>
                            <p>Easier to get started with coding on Website</p>
                        </div>
                        <ul className={cx('convinient')}>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Learn code very easy
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Convenient environment
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Practice from easy to difficult
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Compiler online use very easy and convenient
                            </li>
                        </ul>
                        <Button className={cx('start')} to={ConfigRouter.compiler}>
                            Started with compiler
                        </Button>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('card_language_1')}>
                        <div className={cx('card', 'one')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/bf4dca390c5742bda4dbf6344e859eb9.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice C++</h2>
                                <p>
                                    Khóa học lập trình C++ cơ bản cho người mới bắt đầu. Khóa học này sẽ cung cấp những
                                    kiến thức cơ bản, dễ hiểu nhất về ngôn ngữ lập trình C++.
                                </p>
                            </div>
                        </div>
                        {/* card_two */}
                        <div className={cx('card', 'two')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/3aa5f5e3e4cb4cb381288840a93c99eb.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice C#</h2>
                                <p>
                                    Khóa học lập trình C# kèm thực hành, khóa học sẽ giúp bạn làm quen với lập trình
                                    cũng như tạo nền tảng tư duy và kỹ năng cơ bản khi giải các bài tập.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('card_language_2')}>
                        <div className={cx('card', 'one')}>
                            <img
                                src="https://cafedev.vn/wp-content/uploads/2020/03/cafedev_series_learn_java.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice Java</h2>
                                <p>
                                    Khóa học lập trình Java, khóa học này sẽ là nền tảng cho khóa Java nâng cao để tiến
                                    tới Java Web hay lập trình Android, ...
                                </p>
                            </div>
                        </div>
                        <div className={cx('card', 'two')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/cf55489ccd434e8c81c61e6fffc9433f.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice Python</h2>
                                <p>
                                    Khóa học lập trình Python cơ bản với các bài tập và lý thuyết dễ hiểu, học xong bạn
                                    có thể tự tin để tới với các chủ đề nâng cao hơn của Python.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
