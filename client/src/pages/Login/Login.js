import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-login')}>
                <img src={images.connect}></img>
            </div>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h1>Login</h1>
                    <form className={cx('form')}>
                        <FaUser />
                        <input placeholder="Tài khoản hoặc email" name="user" /> <br></br>
                        <FaLock />
                        <input placeholder="Mật khẩu" name="pass" />
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nhớ mật khẩu</span>
                        </div>
                        <a href="http://localhost:3000" className={cx('forgetpass')}>
                            Quên mật khẩu?
                        </a>
                    </div>
                    <Button className={cx('btn-login')} to={ConfigRouter.Home}>
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')}>
                                <FaFacebook />
                            </Button>
                            <Button className={cx('goog')}>
                                <FaGoogle />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('con-signup')}>
                        <span>Nếu chưa có tài khoản?</span>
                        <a href="http://localhost:3000/signup" className={cx('signup')}>
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
