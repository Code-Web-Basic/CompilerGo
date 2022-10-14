import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';

import styles from './Practice.module.scss';
import Button from '~/components/Button';
import { ConfigRouter } from '~/config';
//component style
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
const cx = classNames.bind(styles);

function Practice() {
    const [value, setValue] = useState('1');

    const [title, setTitle] = useState([]);
    axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((req) => {
            setTitle(req.data);
        })
        .catch((err) => {
            console.log(err);
        });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={cx('practice')}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="if-else" value="1" />
                        <Tab label="Vòng lặp" value="2" />
                        <Tab label="Mảng" value="3" />
                        <Tab label="Sắp xếp" value="4" />
                        <Tab label="Chuỗi" value="5" />
                        <Tab label="struct" value="6" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div>
                        <Button className={cx('btn-all')}>tất cả</Button>
                    </div>
                    <table className={cx('list-ex')}>
                        <tr>
                            <th>Status</th>
                            <th className={cx('title')}>Title</th>
                            <th>Solution</th>
                            <th>Acceptable</th>
                            <th>Difficulty</th>
                            <th>Frequency</th>
                        </tr>
                        {title.map((ti) => {
                            return (
                                <tr>
                                    <td>No</td>
                                    <td>
                                        <Button className={cx('btn-ex')} to={ConfigRouter.solution}>
                                            {ti.title}
                                        </Button>
                                    </td>
                                    <td>no</td>
                                    <td>50%</td>
                                    <td>Medium</td>
                                    <td>No</td>
                                </tr>
                            );
                        })}
                    </table>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>
                <TabPanel value="5">Item Three</TabPanel>
                <TabPanel value="6">Item Three</TabPanel>
            </TabContext>

            <div></div>
        </div>
    );
}

export default Practice;
