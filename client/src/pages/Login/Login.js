//library
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

//icon
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { ConfigRouter } from '~/config';
import Button from '~/components/Button';
import { loginUser, loginGoogleUser } from '~/redux/apiRequest';
import { useSelect } from '@mui/base';
import { Alert } from '@mui/material';
// import * as httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);
function Login() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginCheck = useSelect((state) => state.auth.login);
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            email: userName,
            password: password,
        };
        console.log(newUser);

        loginUser(newUser, dispatch, navigate);
        // if (!loginCheck.error) {
        // }
    };

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        window.open('http://localhost:3240/v1/users/auth/google/', '_self');
        loginGoogleUser(dispatch);
    };
    const handleLoginWithFacebook = () => {};
    useEffect(() => {}, []);

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
                    <Button className={cx('btn-login')} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')} iconBackgroundHover onClick={handleLoginWithFacebook}>
                                <FaFacebook />
                            </Button>
                            <Button className={cx('goog')} iconBackgroundHover onClick={handleLoginWithGoogle}>
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
            {/* {!loginCheck.error && <Alert severity="success">This is a success message!</Alert>} */}
        </div>
    );
}

export default Login;
