import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageWithPreview extends File {
  preview?: string;
  status?: 'pending' | 'processing' | 'success' | 'error';
  backgroundColor?: string;
}

const BackgroundChanger = () => {
  const [files, setFiles] = useState<ImageWithPreview[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [backgroundType, setBackgroundType] = useState<'color' | 'transparent'>('color');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });

  const handleBackgroundChange = async (file: ImageWithPreview) => {
    setProcessing(true);
    // Simulate background removal
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFiles(prev =>
      prev.map(f =>
        f === file
          ? { ...f, status: 'success' as const, backgroundColor }
          : f
      )
    );
    setProcessing(false);
  };

  const handleRemove = (fileToRemove: ImageWithPreview) => {
    setFiles(prev => prev.filter(file => file !== fileToRemove));
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(backgroundColor);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Background Changer
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop images here, or click to select
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supported formats: PNG, JPG, JPEG, WEBP
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Background Options
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Background Type</InputLabel>
              <Select
                value={backgroundType}
                label="Background Type"
                onChange={(e) => setBackgroundType(e.target.value as 'color' | 'transparent')}
              >
                <MenuItem value="color">Solid Color</MenuItem>
                <MenuItem value="transparent">Transparent</MenuItem>
              </Select>
            </FormControl>

            {backgroundType === 'color' && (
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Background Color</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    size="small"
                  />
                  <Tooltip title="Copy color code">
                    <IconButton onClick={handleCopyColor} size="small">
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: 40,
                    backgroundColor: backgroundColor,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    mt: 1,
                  }}
                />
              </Box>
            )}

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Images to Process
            </Typography>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              <AnimatePresence>
                {files.map((file: ImageWithPreview) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        mb: 2,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ImageIcon color="primary" />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                      </Box>

                      {file.status === 'success' && (
                        <Alert severity="success" sx={{ mt: 1 }}>
                          Background removed successfully
                        </Alert>
                      )}

                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        {file.status === 'pending' && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleBackgroundChange(file)}
                            disabled={processing}
                            startIcon={<PaletteIcon />}
                          >
                            {processing ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              'Remove Background'
                            )}
                          </Button>
                        )}
                        {file.status === 'success' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<DownloadIcon />}
                          >
                            Download
                          </Button>
                        )}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemove(file)}
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BackgroundChanger; 