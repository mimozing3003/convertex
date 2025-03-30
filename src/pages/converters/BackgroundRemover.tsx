import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  IconButton,
  LinearProgress,
  Paper,
  Grid,
  Zoom,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AutoFixHigh as AutoFixIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ImageStatus {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  backgroundType: string;
  blurAmount: number;
  color: string;
}

const BackgroundRemover = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<ImageStatus | null>(null);
  const [backgroundType, setBackgroundType] = useState<string>('blur');
  const [blurAmount, setBlurAmount] = useState<number>(10);
  const [color, setColor] = useState<string>('#ffffff');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage({
        name: file.name,
        size: file.size,
        status: 'pending',
        progress: 0,
        backgroundType,
        blurAmount,
        color,
      });
    }
  }, [backgroundType, blurAmount, color]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxFiles: 1,
  });

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleProcess = async () => {
    if (!image) return;

    setImage(prev => prev ? { ...prev, status: 'processing', progress: 0 } : null);

    // Simulate processing time
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setImage(prev => prev ? { ...prev, progress: i } : null);
    }

    setImage(prev => prev ? { ...prev, status: 'completed', progress: 100 } : null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('converter.backgroundRemover.title')}
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('converter.backgroundRemover.settings')}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>{t('converter.backgroundRemover.backgroundType')}</InputLabel>
                <Select
                  value={backgroundType}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  label={t('converter.backgroundRemover.backgroundType')}
                >
                  <MenuItem value="blur">{t('converter.backgroundRemover.blur')}</MenuItem>
                  <MenuItem value="mosaic">{t('converter.backgroundRemover.mosaic')}</MenuItem>
                  <MenuItem value="color">{t('converter.backgroundRemover.color')}</MenuItem>
                  <MenuItem value="transparent">{t('converter.backgroundRemover.transparent')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {backgroundType === 'blur' && (
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>
                  {t('converter.backgroundRemover.blurAmount')}
                </Typography>
                <Slider
                  value={blurAmount}
                  onChange={(_, value) => setBlurAmount(value as number)}
                  min={0}
                  max={20}
                  step={1}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 10, label: '10' },
                    { value: 20, label: '20' },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Grid>
            )}
            {backgroundType === 'color' && (
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>
                  {t('converter.backgroundRemover.color')}
                </Typography>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: '100%', height: 40 }}
                />
              </Grid>
            )}
          </Grid>
        </Paper>

        <Paper
          {...getRootProps()}
          sx={{
            p: 3,
            mb: 3,
            textAlign: 'center',
            backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <Zoom in={true} timeout={500}>
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          </Zoom>
          <Typography variant="h6" gutterBottom>
            {t('converter.backgroundRemover.dropzone')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('converter.backgroundRemover.dropzoneDescription')}
          </Typography>
        </Paper>

        {image && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                {image.name}
              </Typography>
              <Box>
                {image.status === 'processing' && (
                  <Box sx={{ width: 200, mr: 2, display: 'inline-block' }}>
                    <LinearProgress variant="determinate" value={image.progress} />
                  </Box>
                )}
                {image.status === 'completed' && (
                  <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                )}
                {image.status === 'error' && (
                  <ErrorIcon color="error" sx={{ mr: 2 }} />
                )}
                <IconButton onClick={handleRemoveImage} sx={{ mr: 2 }}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleProcess}
                  disabled={image.status === 'processing'}
                  startIcon={<AutoFixIcon />}
                >
                  {t('converter.backgroundRemover.process')}
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </motion.div>
  );
};

export default BackgroundRemover; 