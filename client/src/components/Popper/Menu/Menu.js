import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
//components
import PopperWrapper from '../Wrapper';

const cx = classNames.bind(styles);
function Menu({ data = [] }) {
    return (
        <PopperWrapper>
            <div className={cx('menu')}>
                {data.map((item, index) => {
                    return !item.span ? (
                        <div className={cx('item')} key={index}>
                            {item.title}
                        </div>
                    ) : (
                        <div className={cx('span')} key={index}></div>
                    );
                })}
            </div>
        </PopperWrapper>
    );
}

export default Menu;
Menu.propTypes = {
    data: PropTypes.array.isRequired,
};
