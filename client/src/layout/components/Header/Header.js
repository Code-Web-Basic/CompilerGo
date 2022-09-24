import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
//icon

import { VscAccount } from 'react-icons/vsc';
//component
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Header() {
    const google = () => {
        window.open('http://localhost:3240/v1/users/auth/google/', '_self');
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
                <Button
                    onClick={google}
                    className={cx('control_account')}
                    primary
                    to={ConfigRouter.Home}
                    leftIcon={<VscAccount />}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default Header;
