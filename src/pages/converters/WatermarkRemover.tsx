import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AutoFixHigh as AutoFixIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FileStatus {
  name: string;
  size: number;
  type: 'pdf' | 'image';
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

const WatermarkRemover = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<FileStatus | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
      setFile({
        name: file.name,
        size: file.size,
        type: fileType,
        status: 'pending',
        progress: 0,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxFiles: 1,
  });

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleProcess = async () => {
    if (!file) return;

    setFile(prev => prev ? { ...prev, status: 'processing', progress: 0 } : null);

    // Simulate processing time
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFile(prev => prev ? { ...prev, progress: i } : null);
    }

    setFile(prev => prev ? { ...prev, status: 'completed', progress: 100 } : null);
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
          {t('converter.watermarkRemover.title')}
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('converter.watermarkRemover.description')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t('converter.watermarkRemover.supportedFormats')}
          </Typography>
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
          <Typography variant="h6" gutterBottom>
            {t('converter.watermarkRemover.dropzone')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('converter.watermarkRemover.dropzoneDescription')}
          </Typography>
        </Paper>

        {file && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h6">
                  {file.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(file.size)} • {file.type.toUpperCase()}
                </Typography>
              </Box>
              <Box>
                {file.status === 'processing' && (
                  <Box sx={{ width: 200, mr: 2, display: 'inline-block' }}>
                    <LinearProgress variant="determinate" value={file.progress} />
                  </Box>
                )}
                {file.status === 'completed' && (
                  <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                )}
                {file.status === 'error' && (
                  <ErrorIcon color="error" sx={{ mr: 2 }} />
                )}
                <IconButton onClick={handleRemoveFile} sx={{ mr: 2 }}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleProcess}
                  disabled={file.status === 'processing'}
                  startIcon={<AutoFixIcon />}
                >
                  {t('converter.watermarkRemover.process')}
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </motion.div>
  );
};

export default WatermarkRemover; 