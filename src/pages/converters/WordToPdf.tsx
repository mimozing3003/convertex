import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
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
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress: number;
}

const WordToPdf = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      status: 'pending' as const,
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    multiple: true,
  });

  const handleConvert = async () => {
    setIsConverting(true);
    // Simulate conversion process
    for (let i = 0; i < files.length; i++) {
      setFiles(prev => prev.map((file, index) => 
        index === i ? { ...file, status: 'converting', progress: 0 } : file
      ));

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setFiles(prev => prev.map((file, index) => 
          index === i ? { ...file, progress } : file
        ));
      }

      // Simulate completion
      setFiles(prev => prev.map((file, index) => 
        index === i ? { ...file, status: 'completed', progress: 100 } : file
      ));
    }
    setIsConverting(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('converter.wordToPdf.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {t('converter.wordToPdf.description')}
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive
            ? t('converter.wordToPdf.dropActive')
            : t('converter.wordToPdf.dropInactive')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('converter.wordToPdf.supportedFormats')}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('converter.wordToPdf.selectedFiles')}
          </Typography>
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {file.status === 'converting' && (
                        <CircularProgress size={16} value={file.progress} />
                      )}
                      {file.status === 'completed' && (
                        <CheckCircleIcon color="success" fontSize="small" />
                      )}
                      {file.status === 'error' && (
                        <ErrorIcon color="error" fontSize="small" />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {file.status === 'converting'
                          ? `${file.progress}%`
                          : file.status === 'completed'
                          ? t('converter.wordToPdf.completed')
                          : file.status === 'error'
                          ? t('converter.wordToPdf.error')
                          : t('converter.wordToPdf.pending')}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setFiles([])}
              disabled={isConverting}
            >
              {t('converter.wordToPdf.clearAll')}
            </Button>
            <Button
              variant="contained"
              onClick={handleConvert}
              disabled={isConverting || files.length === 0}
            >
              {isConverting
                ? t('converter.wordToPdf.converting')
                : t('converter.wordToPdf.convert')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WordToPdf; 