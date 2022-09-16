import classNames from 'classnames/bind';
import styles from './ControlCompiler.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
//icon
import { BsFillBellFill, BsChevronLeft, BsChevronRight, BsHouseFill, BsThreeDotsVertical } from 'react-icons/bs';
//component
import { ConfigRouter } from '~/config';
import Button from '~/components/Button/Button';
import Dropdown from '~/components/Dropdown/Dropdown';
const cx = classNames.bind(styles);

const ITEM_FIFES = [
    {
        id: 1,
        title: 'New File',
        icon: '',
    },
    {
        id: 2,
        title: 'New Text File',
        icon: '',
    },
    {
        id: 3,
        span: true,
    },
    {
        id: 4,
        title: 'Open Fife',
        icon: '',
    },
    {
        id: 5,
        title: 'Open Folder',
        icon: '',
    },
    {
        id: 6,
        span: true,
    },
    {
        id: 7,
        title: 'Save',
        icon: '',
    },
    {
        id: 8,
        title: 'Save As',
        icon: '',
    },
];
const ITEM_EDITS = [
    {
        id: 1,
        title: 'Undo',
    },
    {
        id: 2,
        title: 'Redo',
    },
    {
        id: 3,
        span: true,
    },
    {
        id: 4,
        title: 'Cut',
    },
    {
        id: 5,
        title: 'Copy',
    },
    {
        id: 6,
        title: 'Paste',
    },
    {
        id: 7,
        span: true,
    },
    {
        id: 8,
        title: 'Find',
    },
    {
        id: 9,
        title: 'Replace',
    },
];
const ITEM_VIEWS = [
    {
        id: 1,
        title: 'Terminal',
    },
    {
        id: 3,
        title: 'Problem',
    },
    {
        id: 4,
        title: 'Debug Console',
    },
    {
        id: 5,
        title: 'Out Put',
    },
    {
        id: 6,
        span: true,
    },
    {
        id: 7,
        title: 'Minimap',
    },
];
const ITEM_HELPS = [
    {
        id: 1,
        title: 'Source Code',
    },
    {
        id: 2,
        title: 'About',
    },
];
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
                        <Dropdown value={ITEM_FIFES}>
                            <div className={cx('header-item')}>Fife</div>
                        </Dropdown>
                        <Dropdown value={ITEM_EDITS}>
                            <div className={cx('header-item')}>Edit</div>
                        </Dropdown>
                        <Dropdown value={ITEM_VIEWS}>
                            <div className={cx('header-item')}>View</div>
                        </Dropdown>
                        <div className={cx('header-item')}>Terminal</div>
                        <Dropdown value={ITEM_HELPS}>
                            <div className={cx('header-item')}>Help</div>
                        </Dropdown>
                    </div>
                    <div className={cx('header-chid')}>
                        <Tippy content="Notification" placement="auto-start">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button iconBackgroundHover className={cx('btn-header')}>
                                    <BsFillBellFill
                                        style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                                    />
                                </Button>
                            </div>
                        </Tippy>
                        <Tippy content="Setting">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button iconBackgroundHover className={cx('btn-header')}>
                                    <BsThreeDotsVertical
                                        style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                                    />
                                </Button>
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlCompiler;
