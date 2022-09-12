import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);
function Sidebar() {
    return <div className={cx('wrapper')}></div>;
}

export default Sidebar;
