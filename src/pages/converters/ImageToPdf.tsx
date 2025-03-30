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
  IconButton,
  LinearProgress,
  Paper,
  Grid,
  Zoom,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Fade,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FileStatus {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  targetSize: string;
  orientation: 'portrait' | 'landscape';
}

const ImageToPdf = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [targetSize, setTargetSize] = useState<string>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileStatus[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
      targetSize,
      orientation,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, [targetSize, orientation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
  });

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    setFiles(prevFiles =>
      prevFiles.map(file => ({
        ...file,
        status: 'processing' as const,
        progress: 0,
      }))
    );

    // Simulate conversion process
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('converter.imageToPdf.title')}
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('converter.imageToPdf.settings')}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>{t('converter.imageToPdf.pageSize')}</InputLabel>
                <Select
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                  label={t('converter.imageToPdf.pageSize')}
                >
                  <MenuItem value="a4">A4</MenuItem>
                  <MenuItem value="letter">Letter</MenuItem>
                  <MenuItem value="legal">Legal</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>{t('converter.imageToPdf.orientation')}</InputLabel>
                <Select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                  label={t('converter.imageToPdf.orientation')}
                >
                  <MenuItem value="portrait">{t('converter.imageToPdf.portrait')}</MenuItem>
                  <MenuItem value="landscape">{t('converter.imageToPdf.landscape')}</MenuItem>
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
            {t('converter.imageToPdf.dropzone')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('converter.imageToPdf.dropzoneDescription')}
          </Typography>
        </Paper>

        {files.length > 0 && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                {t('converter.imageToPdf.files')}
              </Typography>
              <Button
                variant="contained"
                onClick={handleConvert}
                disabled={files.some(f => f.status === 'processing')}
                startIcon={<PdfIcon />}
              >
                {t('converter.imageToPdf.convert')}
              </Button>
            </Box>

            <List>
              {files.map((file, index) => (
                <Fade in={true} timeout={500} key={index}>
                  <ListItem>
                    <ListItemText
                      primary={file.name}
                      secondary={`${formatFileSize(file.size)} → PDF ${file.targetSize.toUpperCase()} ${file.orientation}`}
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
                </Fade>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </motion.div>
  );
};

export default ImageToPdf; 