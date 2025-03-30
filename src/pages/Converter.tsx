import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container,
} from '@mui/material';
import ImageSizeChanger from '../components/ImageSizeChanger';
import BackgroundChanger from '../components/BackgroundChanger';

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
      id={`image-tool-tabpanel-${index}`}
      aria-labelledby={`image-tool-tab-${index}`}
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
    id: `image-tool-tab-${index}`,
    'aria-controls': `image-tool-tabpanel-${index}`,
  };
}

const Converter = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="image tools tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Resize Images" {...a11yProps(0)} />
            <Tab label="Change Background" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <ImageSizeChanger />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BackgroundChanger />
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Converter; 