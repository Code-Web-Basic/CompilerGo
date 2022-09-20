import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Link } from 'react-router-dom';
//icon
import { ConfigRouter } from '~/config';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function Signup() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h1>Sign up</h1>
                <form className={cx('form-signup')}>
                    <input placeholder="Tên người dùng" name="username" /> <br></br>
                    <input placeholder="Số điện thoại" name="phone" /> <br></br>
                    <input placeholder="Mật khẩu" name="pass" /> <br></br>
                    <input placeholder="Xác nhận mật khẩu" name="re-pass" />
                    <p>
                        Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của
                        chúng tôi.
                    </p>
                </form>
                <Button className={cx('btn-signup')} to={ConfigRouter.Home}>
                    Đăng ký
                </Button>
                <div className={cx('social-login-label')}>
                    <div className={cx('label-or')}>
                        <div className={cx('line-left')}></div>
                        <span className={cx('label-text')}>Hoặc bạn có thể đăng ký với</span>
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
