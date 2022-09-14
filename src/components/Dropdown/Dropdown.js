import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import Tippy from '@tippyjs/react/headless';

import PropTypes from 'prop-types';
//component
import Menu from '../Popper/Menu';

const cx = classNames.bind(styles);
function Dropdown({ children, value = [] }) {
    return (
        <div className={cx('dropdown')}>
            <Tippy
                interactive
                trigger="click"
                placement="bottom-start"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Menu data={value} />
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Dropdown;

Dropdown.protoTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.array,
};
