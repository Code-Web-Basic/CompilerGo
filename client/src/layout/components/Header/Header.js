import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//icon

import { VscAccount } from 'react-icons/vsc';
//component
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import Button from '~/components/Button/Button';
import { loginGoogleUser, logOutUser } from '~/redux/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Header() {
    let user = useSelector((state) => state.auth.login?.currentUser);
    // const user = null;
    // console.log(user);
    useEffect(() => {
        async function fetchData() {
            // if (user?.success) {
            await loginGoogleUser(dispatch);
            if (user.success === false) {
                user = null;
            }
            // }
        }
        fetchData();
    }, [user?.success]);
    const id = user?.user?._id;
    const accessToken = user?.accessToken;
    // console.log(id, accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleLogOutUser = (e) => {
        logOutUser(id, dispatch, navigate, accessToken, axiosJWT);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to={ConfigRouter.Home}>
                    <img src={images.logo} alt="logo" />
                </Link>
            </div>
            <div className={cx('control')}>
                <Button className={cx('control_item')} text to={ConfigRouter.Home}>
                    Home
                </Button>
                <Button className={cx('control_item')} text to={ConfigRouter.compiler}>
                    Compiler
                </Button>
                <Button className={cx('control_item')} text to={ConfigRouter.practice}>
                    Practice
                </Button>
                {user?.user ? (
                    <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px' }}
                    >
                        <span className={cx('name-user')}>{user && `${user?.user?.email}`}</span>
                        <Button
                            className={cx('control_account')}
                            primary
                            to={'/'}
                            leftIcon={<VscAccount />}
                            onClick={handleLogOutUser}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                        <Button
                            className={cx('control_account')}
                            primary
                            to={ConfigRouter.login}
                            leftIcon={<VscAccount />}
                        >
                            Sign In
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
