import classNames from 'classnames/bind';
import Button from '~/components/Button';
import axios from 'axios';
import styles from './Practice.module.scss';
import {useState} from 'react'
import { ConfigRouter } from '~/config';
const cx = classNames.bind(styles);

function Practice() {
    const [title, setTitle] = useState([]);
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((req) => {
      setTitle(req.data);
    })
    .catch((err) => {
      console.log(err);
    });
    return (
        <div className={cx('practice')}>
            <div className={cx('tag-prac')}>
                <Button className={cx('tag')}>if-else <span>5</span></Button>
                <Button className={cx('tag')}>Vòng lặp <span>5</span></Button>
                <Button className={cx('tag')}>Mảng <span>5</span></Button>
                <Button className={cx('tag')}>Sắp xếp <span>5</span></Button>
                <Button className={cx('tag')}>Chuỗi <span>5</span></Button>
                <Button className={cx('tag')}>struct <span>5</span></Button>
            </div>
            <div>
                <Button className={cx('btn-all')}>tất cả</Button>
            </div>
            <div>
            <table className={cx('list-ex')}>
                <tr>
                    <th>Status</th>
                    <th className={cx('title')}>Title</th>
                    <th>Solution</th>
                    <th>Acceptable</th>
                    <th>Difficulty</th>
                    <th>Frequency</th>
                </tr>
                {
                    title.map((ti) => {
                        return (
                            <tr>
                                <td>No</td>
                                <td><Button className={cx('btn-ex')} to={ConfigRouter.solution}>{ti.title}</Button></td>
                                <td>no</td>
                                <td>50%</td>
                                <td>Medium</td>
                                <td>No</td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
        </div>
    );
}

export default Practice;
