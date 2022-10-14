import classNames from 'classnames/bind';
import styles from './Resetpass.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/components/Button';
import { FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-header')}>
                <h1>Reset pass</h1>
                <FaLock className={cx('icon-lock')} />
                <h2>Bạn đang gặp sự cố đăng nhập?</h2>
                <p>Nhập email, số điện thoại hoặc tên người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết để truy cập lại vào tài khoản.</p>
            </div>
            <input className={cx('input-user')} placeholder='email hoặc số điện thoại' name='resetpass'/>
            <Button className={cx('btn-send')} to={ConfigRouter.Home}>Gửi</Button>
            <div className={cx('label-or')}>
                    <div className={cx('line-left')}></div>
                    <span className={cx('label-text')}>HOẶC</span>
                    <div className={cx('line-right')}></div>
                </div>
            <Button className={cx('btn-signup')} to={ConfigRouter.signup}>Tạo tài khoản mới</Button>
            <Button className={cx('btn-signin')} to={ConfigRouter.login}>Quay lại đăng nhập</Button>
        </div>
    );
}

export default Home;
