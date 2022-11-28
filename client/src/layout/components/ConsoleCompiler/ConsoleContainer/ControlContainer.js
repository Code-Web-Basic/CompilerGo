import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './ControlContainer.module.scss';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const cx = classNames.bind(styles);
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function ControlContainer({ result, err }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={cx('Control-container')}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="OUTPUT" {...a11yProps(0)} sx={{ fontSize: '15px', fontWeight: '600' }} />
                        <Tab label="PROBLEM" {...a11yProps(1)} sx={{ fontSize: '15px', fontWeight: '600' }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className={cx('output')}>{result}</div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className={cx('problem')}>{err}</div>
                </TabPanel>
            </Box>
        </div>
    );
}

export default ControlContainer;
