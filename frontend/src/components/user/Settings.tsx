import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BACKEND_URL } from '@/utils/backend';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profiledata = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile data tabs">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          
        </Tabs> 
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Profile/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChangePassword />
      </CustomTabPanel>
      
    </Box>
  );
};

export default Profiledata;
