import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageWithPreview extends File {
  preview?: string;
  status?: 'pending' | 'processing' | 'success' | 'error';
  width?: number;
  height?: number;
}

const ImageSizeChanger = () => {
  const [files, setFiles] = useState<ImageWithPreview[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);

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

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(event.target.value);
    setWidth(newWidth);
    if (maintainAspectRatio) {
      setHeight(Math.round((newWidth * height) / width));
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(event.target.value);
    setHeight(newHeight);
    if (maintainAspectRatio) {
      setWidth(Math.round((newHeight * width) / height));
    }
  };

  const handleResize = async (file: ImageWithPreview) => {
    setProcessing(true);
    // Simulate image resizing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFiles(prev =>
      prev.map(f =>
        f === file
          ? { ...f, status: 'success' as const, width, height }
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

  const handleCopyDimensions = () => {
    navigator.clipboard.writeText(`${width}x${height}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Image Size Changer
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
              Resize Options
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Width (px)"
                type="number"
                value={width}
                onChange={handleWidthChange}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Height (px)"
                type="number"
                value={height}
                onChange={handleHeightChange}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    />
                  }
                  label="Maintain aspect ratio"
                />
                <Tooltip title="Copy dimensions">
                  <IconButton onClick={handleCopyDimensions} size="small">
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

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
                          Resized to {width}x{height}px
                        </Alert>
                      )}

                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        {file.status === 'pending' && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleResize(file)}
                            disabled={processing}
                          >
                            {processing ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              'Resize'
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

export default ImageSizeChanger; 