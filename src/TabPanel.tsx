import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import About from './tabs/About';
import View from './tabs/View';
import Upload from './tabs/Upload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile={true}
        aria-label="scrollable auto tabs example"
        >
          <Tab label="zkPhoto" {...a11yProps(0)} disabled />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Capture" {...a11yProps(2)} />
          <Tab label="Upload" {...a11yProps(3)} />
          <Tab label="Verify" {...a11yProps(4)} />
          <Tab label="View" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        <Container><About /></Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Capture
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Upload />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Verify
      </TabPanel>
      <TabPanel value={value} index={5}>
        <View />
      </TabPanel>
    </Box>
  );
}
