import classNames from 'classnames/bind';
import styles from './EditorCompiler.module.scss';
//components
import MonacoEditor from '@monaco-editor/react';
import Button from '~/components/Button/Button';
import { BsX, BsPlayFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

function EditorCompiler() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('control-fife')}>
                <div className={cx('fife-container')}>
                    <div className={cx('item-fife', 'active')}>
                        <div className={cx('item-content')}>textAlign.module.scss</div>
                        <div className={cx('item-icon')}>
                            <BsX />
                        </div>
                    </div>
                    <div className={cx('item-fife')}>
                        <div className={cx('item-content')}>textAlign.module.scss</div>
                        <div className={cx('item-icon')}>
                            <BsX />
                        </div>
                    </div>
                    <div className={cx('item-fife')}>
                        <div className={cx('item-content')}>textAlign.module.scss</div>
                        <div className={cx('item-icon')}>
                            <BsX />
                        </div>
                    </div>
                </div>
                <div className={cx('control')}>
                    <Button className={cx('btn-control')} iconBackgroundHover>
                        <BsPlayFill />
                    </Button>
                </div>
            </div>
            <div className={cx('address-fife')}></div>
            <div className={cx('editor-content')}>
                <MonacoEditor height="100%" width="100%" theme="vs-light" language="javascript" />
            </div>
        </div>
    );
}
export default EditorCompiler;
