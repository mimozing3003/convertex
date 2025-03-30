import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Slider,
  Grid,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Compress as CompressIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { PDFDocument, PDFName } from 'pdf-lib';

interface FileStatus {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  targetSize: number;
  compressionLevel: 'low' | 'medium' | 'high';
  originalSize: number;
  compressedSize: number;
  error?: string;
  compressedFile?: Blob;
  file?: File;
}

const PdfCompressor = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [targetSize, setTargetSize] = useState<number>(1000); // Default 1000KB
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const newFiles: FileStatus[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      originalSize: file.size,
      status: 'pending',
      progress: 0,
      targetSize: targetSize * 1024, // Convert KB to bytes
      compressionLevel,
      compressedSize: 0,
      file,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, [targetSize, compressionLevel]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const compressPdf = async (file: File): Promise<Blob> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Get the number of pages
    const pageCount = pdfDoc.getPageCount();

    // Apply compression to each page
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      
      // Get page dimensions
      const { width, height } = page.getSize();
      
      // Get all images on the page
      const resources = page.node.Resources();
      if (resources) {
        const xObject = resources.lookup(PDFName.of('XObject'));
        if (xObject) {
          const dict = xObject as any;
          const imageRefs = Object.keys(dict);
          
          for (const ref of imageRefs) {
            const imageObj = await pdfDoc.context.lookup(dict[ref]);
            if (imageObj && typeof imageObj === 'object' && 'getSize' in imageObj) {
              const maxDimension = Math.max(width, height);
              const scale = maxDimension / 2000; // Limit maximum dimension to 2000px
              
              if (scale < 1) {
                // Apply compression to the image
                const imageData = (imageObj as any).getImageData?.();
                if (imageData) {
                  const compressedImage = await pdfDoc.embedJpg(imageData);
                  dict.set(PDFName.of(ref), compressedImage);
                }
              }
            }
          }
        }
      }
    }

    // Save the compressed PDF with optimized settings
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
      updateFieldAppearances: true,
    });

    return new Blob([compressedPdfBytes], { type: 'application/pdf' });
  };

  const handleCompress = async () => {
    setError(null);
    setFiles(prevFiles =>
      prevFiles.map(file => ({
        ...file,
        status: 'processing' as const,
        progress: 0,
        error: undefined,
      }))
    );

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const targetSizeBytes = targetSize * 1024; // Convert KB to bytes

      try {
        if (!file.file) {
          throw new Error('File not found');
        }

        // Check if target size is achievable
        if (targetSizeBytes < file.originalSize * 0.1) {
          throw new Error('Target size too small. Minimum size is 10% of original.');
        }

        // Update progress to 20%
        setFiles(prevFiles =>
          prevFiles.map((f, index) =>
            index === i ? { ...f, progress: 20 } : f
          )
        );

        // Compress the PDF
        const compressedBlob = await compressPdf(file.file);

        // Update progress to 80%
        setFiles(prevFiles =>
          prevFiles.map((f, index) =>
            index === i ? { ...f, progress: 80 } : f
          )
        );

        // Update file status with compressed result
        setFiles(prevFiles =>
          prevFiles.map((f, index) =>
            index === i
              ? {
                  ...f,
                  progress: 100,
                  status: 'completed' as const,
                  compressedSize: compressedBlob.size,
                  compressedFile: compressedBlob,
                }
              : f
          )
        );
      } catch (err) {
        setFiles(prevFiles =>
          prevFiles.map((f, index) =>
            index === i
              ? {
                  ...f,
                  status: 'error' as const,
                  error: err instanceof Error ? err.message : 'Compression failed',
                }
              : f
          )
        );
      }
    }
  };

  const handleDownload = (file: FileStatus) => {
    if (file.compressedFile) {
      const url = URL.createObjectURL(file.compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateCompressionRatio = (original: number, compressed: number) => {
    return ((original - compressed) / original * 100).toFixed(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('converter.pdfCompressor.title')}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('converter.pdfCompressor.compressionSettings')}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                {t('converter.pdfCompressor.targetSize')} (KB)
              </Typography>
              <TextField
                type="number"
                value={targetSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if (value >= 100) { // Minimum 100KB
                    setTargetSize(value);
                  }
                }}
                inputProps={{ min: 100, max: 10000 }}
                sx={{ width: '100%' }}
                helperText="Enter target size in KB (100-10000)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                {t('converter.pdfCompressor.compressionLevel')}
              </Typography>
              <Slider
                value={compressionLevel === 'low' ? 0 : compressionLevel === 'medium' ? 1 : 2}
                onChange={(_, value) => {
                  const levels = ['low', 'medium', 'high'] as const;
                  setCompressionLevel(levels[value as number]);
                }}
                min={0}
                max={2}
                step={1}
                marks={[
                  { value: 0, label: t('converter.pdfCompressor.low') },
                  { value: 1, label: t('converter.pdfCompressor.medium') },
                  { value: 2, label: t('converter.pdfCompressor.high') },
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </Box>
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
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {t('converter.pdfCompressor.dropzone')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('converter.pdfCompressor.dropzoneDescription')}
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              {t('converter.pdfCompressor.files')}
            </Typography>
            <Button
              variant="contained"
              onClick={handleCompress}
              disabled={files.some(f => f.status === 'processing')}
              startIcon={<CompressIcon />}
            >
              {t('converter.pdfCompressor.compress')}
            </Button>
          </Box>

          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        {formatFileSize(file.originalSize)} → {formatFileSize(file.compressedSize)}
                      </Typography>
                      {file.status === 'completed' && (
                        <Typography variant="body2" color="success.main">
                          {calculateCompressionRatio(file.originalSize, file.compressedSize)}% {t('converter.pdfCompressor.compressionRatio')}
                        </Typography>
                      )}
                      {file.error && (
                        <Typography variant="body2" color="error">
                          {file.error}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {file.status === 'processing' && (
                    <Box sx={{ width: 100, mr: 2 }}>
                      <LinearProgress variant="determinate" value={file.progress} />
                    </Box>
                  )}
                  {file.status === 'completed' && (
                    <>
                      <IconButton
                        edge="end"
                        onClick={() => handleDownload(file)}
                        sx={{ mr: 1 }}
                        color="primary"
                      >
                        <DownloadIcon />
                      </IconButton>
                      <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                    </>
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

export default PdfCompressor; 