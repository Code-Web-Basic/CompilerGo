import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './ControlContainer.module.scss';
const cx = classNames.bind(styles);
function ControlContainer() {
    return (
        <div className={cx('Control-container')}>
            <div className={cx('header')}>
                <Button className={cx('btn-control', 'active')} text>
                    PROBLEM
                </Button>
                <Button className={cx('btn-control')} text>
                    DEBUG CONSOLE
                </Button>
                <Button className={cx('btn-control')} text>
                    TERMINAL
                </Button>
            </div>
            <div className={cx('content')}></div>
        </div>
    );
}

export default ControlContainer;
