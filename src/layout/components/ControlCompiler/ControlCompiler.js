import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './ControlCompiler.module.scss';
import { BsFillBellFill } from 'react-icons/bs';
import { BsChevronLeft, BsChevronRight, BsHouseFill, BsThreeDotsVertical } from 'react-icons/bs';
import { ConfigRouter } from '~/config';
const cx = classNames.bind(styles);

function ControlCompiler() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('header-chid')}>
                        <div className={cx('logo')}> Compiler App</div>
                        <Button iconBackgroundHover className={cx('btn-header')}>
                            <BsChevronLeft style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} />
                        </Button>
                        <Button iconBackgroundHover className={cx('btn-header')}>
                            <BsChevronRight
                                style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                            />
                        </Button>
                        <Button to={ConfigRouter.Home} iconBackgroundHover className={cx('btn-header')}>
                            <BsHouseFill style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} />
                        </Button>
                    </div>

                    <div className={cx('header-chid')}>
                        <Button to={ConfigRouter.practice} outline className={cx('btn-outline')}>
                            Interactive Course
                        </Button>
                        <div className={cx('drop-control')}>
                            <div className={cx('drop-control-target')}>
                                <div className={cx('btn-icon')}>
                                    <i className={cx('fa-solid fa-gear')}></i>
                                </div>
                                <div className={cx('drop-control-popper right')}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('header-sub')}>
                    <div className={cx('header-chid')}>
                        <div className={cx('header-item')}>Fife</div>
                        <div className={cx('header-item')}>Edit</div>
                        <div className={cx('header-item')}>View</div>
                        <div className={cx('header-item')}>Terminal</div>
                        <div className={cx('header-item')}>Help</div>
                    </div>
                    <div className={cx('header-chid')}>
                        <Button iconBackgroundHover className={cx('btn-header')}>
                            <BsFillBellFill
                                style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                            />
                        </Button>
                        <Button iconBackgroundHover className={cx('btn-header')}>
                            <BsThreeDotsVertical
                                style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlCompiler;
