import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ru', name: 'Русский (Russian)' },
];

const Settings = ({ darkMode, setDarkMode }: SettingsProps) => {
  const { t, i18n } = useTranslation();
  const [cloudSync, setCloudSync] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [storageUsed, setStorageUsed] = useState(2.5); // GB
  const [storageTotal] = useState(10); // GB

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleCloudSyncToggle = () => {
    setCloudSync(!cloudSync);
    // Implement cloud sync logic here
  };

  const handleOfflineModeToggle = () => {
    setOfflineMode(!offlineMode);
    // Implement offline mode logic here
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // Implement notifications logic here
  };

  const handleClearStorage = () => {
    // Implement storage clearing logic here
    setStorageUsed(0);
  };

  const handleDownloadAll = () => {
    // Implement download all files logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('settings.title')}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.language')}
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>{t('settings.selectLanguage')}</InputLabel>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            label={t('settings.selectLanguage')}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.appearance')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              color="primary"
            />
          }
          label={t('settings.darkMode')}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.notifications')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={handleNotificationsToggle}
              color="primary"
            />
          }
          label={t('settings.enableNotifications')}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.cloudStorage')}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StorageIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {storageUsed.toFixed(1)} GB / {storageTotal} GB {t('settings.used')}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(storageUsed / storageTotal) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={cloudSync}
              onChange={handleCloudSyncToggle}
              color="primary"
            />
          }
          label={t('settings.enableCloudSync')}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadAll}
            sx={{ mr: 1 }}
          >
            {t('settings.downloadAll')}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearStorage}
          >
            {t('settings.clearStorage')}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.offlineMode')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={offlineMode}
              onChange={handleOfflineModeToggle}
              color="primary"
            />
          }
          label={t('settings.enableOfflineMode')}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {t('settings.offlineModeDescription')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings; 