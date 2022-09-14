import classNames from 'classnames/bind';
// import { useRef } from 'react';
import styles from './ConsoleCompiler.module.scss';
//icon
import { BsXCircleFill, BsExclamationOctagonFill } from 'react-icons/bs';
//component
import Button from '~/components/Button/Button';
const cx = classNames.bind(styles);
function ConsoleCompiler() {
    // const ContainerDiv = useRef(null);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sub')}></div>
            </div>
            <div className={cx('control-bottom')}>
                <div className={cx('problem-console')}>
                    <Button className={cx('problem-console_item')} leftIcon={<BsXCircleFill />} iconBackgroundHover>
                        0
                    </Button>
                    <Button
                        className={cx('problem-console_item')}
                        leftIcon={<BsExclamationOctagonFill />}
                        iconBackgroundHover
                    >
                        0
                    </Button>
                </div>
                <div className={cx('problem-console')}>
                    <Button className={cx('problem-console_item')} iconBackgroundHover>
                        Ln 36, Col 39
                    </Button>
                    <Button className={cx('problem-console_item')} iconBackgroundHover>
                        lang
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConsoleCompiler;
