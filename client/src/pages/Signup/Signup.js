import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Link, useNavigate } from 'react-router-dom';
//icon
import { ConfigRouter } from '~/config';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { registerUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

const cx = classNames.bind(styles);
function Signup() {
    const { enqueueSnackbar } = useSnackbar();
    const [firstNameUser, setFirstNameUser] = useState('');
    const [lastNameUser, setLastNameUser] = useState('');
    const [EmailUser, setEmailUser] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const checkRegister = useSelector((state) => state.auth.register);
    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            email: EmailUser,
            password: password,
            firstName: firstNameUser,
            lastName: lastNameUser,
            createdAt: 1663756014035,
            updatedAt: null,
            authGoogleId: null,
            authFacebookId: null,
            authType: 'local',
        };
        await registerUser(newUser, dispatch, navigate, enqueueSnackbar);
    };
    useEffect(() => {});

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h1>Sign up</h1>
                <form className={cx('form-signup')}>
                    <input
                        placeholder="First Name"
                        name="FirstName"
                        onChange={(e) => {
                            setFirstNameUser(e.target.value);
                        }}
                    />{' '}
                    <br></br>
                    <input
                        placeholder="Last Name"
                        name="LatsName"
                        onChange={(e) => {
                            setLastNameUser(e.target.value);
                        }}
                    />{' '}
                    <br></br>
                    <input
                        placeholder="Email"
                        name="name"
                        onChange={(e) => {
                            setEmailUser(e.target.value);
                        }}
                    />{' '}
                    <br></br>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="pass"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />{' '}
                    <br></br>
                    <input type="password" placeholder="Xác nhận mật khẩu" name="re-pass" />
                    <p>
                        Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của
                        chúng tôi.
                    </p>
                </form>
                <Button className={cx('btn-signup')} to={ConfigRouter.Home} onClick={handleRegister}>
                    Đăng ký
                </Button>
                <div className={cx('con-signin')}>
                    <span>Nếu bạn đã có tài khoản?</span>
                    <Link to={ConfigRouter.login} className={cx('signin')}>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
