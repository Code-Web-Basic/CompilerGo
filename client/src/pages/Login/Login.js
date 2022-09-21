import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function Login() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: userName,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-login')}>
                <img src={images.connect} alt="logo"></img>
            </div>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h1>Login</h1>
                    <form className={cx('form')}>
                        <div>
                            <FaUser />
                            <input
                                placeholder="Tài khoản hoặc email"
                                name="user"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <FaLock />
                            <input
                                placeholder="Mật khẩu"
                                name="pass"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nhớ mật khẩu</span>
                        </div>
                        <Link to={ConfigRouter.resetpass} className={cx('forgetpass')}>
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <Button className={cx('btn-login')} to={ConfigRouter.Login} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')} iconBackgroundHover>
                                <FaFacebook />
                            </Button>
                            <Button className={cx('goog')} iconBackgroundHover>
                                <FaGoogle />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('con-signup')}>
                        <span>Nếu chưa có tài khoản?</span>
                        <Link to={ConfigRouter.signup} className={cx('signup')}>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
