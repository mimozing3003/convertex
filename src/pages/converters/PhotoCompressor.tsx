import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface FileStatus {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  targetSize: number;
  dpi: number;
  resolution: string;
  format: string;
}

const PhotoCompressor = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [targetSize, setTargetSize] = useState<number>(500); // Default 500KB
  const [dpi, setDpi] = useState<number>(300);
  const [resolution, setResolution] = useState<string>('original');
  const [format, setFormat] = useState<string>('jpeg');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileStatus[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
      targetSize,
      dpi,
      resolution,
      format,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, [targetSize, dpi, resolution, format]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
    },
  });

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompress = async () => {
    setFiles(prevFiles =>
      prevFiles.map(file => ({
        ...file,
        status: 'processing' as const,
        progress: 0,
      }))
    );

    // Simulate compression process
    for (let i = 0; i < files.length; i++) {
      setFiles(prevFiles =>
        prevFiles.map((f, index) =>
          index === i
            ? {
                ...f,
                progress: 100,
                status: 'completed' as const,
              }
            : f
        )
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('converter.photoCompressor.title')}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('converter.photoCompressor.compressionSettings')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>
              {t('converter.photoCompressor.targetSize')} ({t('converter.photoCompressor.kb')})
            </Typography>
            <TextField
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              inputProps={{ min: 100, max: 5000 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>
              {t('converter.photoCompressor.dpi')}
            </Typography>
            <Slider
              value={dpi}
              onChange={(_, value) => setDpi(value as number)}
              min={72}
              max={600}
              step={1}
              marks={[
                { value: 72, label: '72' },
                { value: 300, label: '300' },
                { value: 600, label: '600' },
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>{t('converter.photoCompressor.resolution')}</InputLabel>
              <Select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                label={t('converter.photoCompressor.resolution')}
              >
                <MenuItem value="original">{t('converter.photoCompressor.original')}</MenuItem>
                <MenuItem value="1920x1080">1920x1080</MenuItem>
                <MenuItem value="1280x720">1280x720</MenuItem>
                <MenuItem value="800x600">800x600</MenuItem>
                <MenuItem value="640x480">640x480</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>{t('converter.photoCompressor.format')}</InputLabel>
              <Select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                label={t('converter.photoCompressor.format')}
              >
                <MenuItem value="jpeg">JPEG</MenuItem>
                <MenuItem value="png">PNG</MenuItem>
                <MenuItem value="webp">WebP</MenuItem>
                <MenuItem value="gif">GIF</MenuItem>
                <MenuItem value="bmp">BMP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {t('converter.photoCompressor.dropzone')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('converter.photoCompressor.dropzoneDescription')}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              {t('converter.photoCompressor.files')}
            </Typography>
            <Button
              variant="contained"
              onClick={handleCompress}
              disabled={files.some(f => f.status === 'processing')}
            >
              {t('converter.photoCompressor.compress')}
            </Button>
          </Box>

          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={file.name}
                  secondary={`${formatFileSize(file.size)} → ${formatFileSize(file.targetSize * 1024)}`}
                />
                <ListItemSecondaryAction>
                  {file.status === 'processing' && (
                    <Box sx={{ width: 100, mr: 2 }}>
                      <LinearProgress variant="determinate" value={file.progress} />
                    </Box>
                  )}
                  {file.status === 'completed' && (
                    <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                  )}
                  {file.status === 'error' && (
                    <ErrorIcon color="error" sx={{ mr: 2 }} />
                  )}
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default PhotoCompressor; 