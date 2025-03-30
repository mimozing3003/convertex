import React, { useState } from 'react';
import { Box, Button, Slider, Typography, Paper, CircularProgress, Alert, LinearProgress } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';

interface ImageCompressorProps {
  onCompress: (file: File, quality: number) => Promise<File>;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({ onCompress }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file (JPG, PNG, WebP)');
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    
    setCompressing(true);
    setError(null);
    setProgress(0);

    try {
      setProgress(30);
      const compressedFile = await onCompress(selectedFile, quality);
      setProgress(100);

      const url = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 1000);
    } catch (error) {
      console.error('Error compressing image:', error);
      setError('Failed to compress image. Please try again.');
    } finally {
      setCompressing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Image Compressor
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
            disabled={compressing}
          >
            Select Image
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {selectedFile.name}
            <br />
            Size: {(selectedFile.size / 1024).toFixed(2)} KB
          </Typography>
        )}
      </Box>

      {preview && (
        <Box sx={{ mb: 3 }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
          />
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Quality: {quality}%
        </Typography>
        <Slider
          value={quality}
          onChange={(_, value) => setQuality(value as number)}
          min={1}
          max={100}
          marks
          valueLabelDisplay="auto"
          disabled={compressing}
        />
      </Box>

      {compressing && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Progress: {progress}%
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCompress}
        disabled={!selectedFile || compressing}
        startIcon={compressing ? <CircularProgress size={20} /> : <Download />}
        fullWidth
      >
        {compressing ? 'Compressing...' : 'Compress & Download'}
      </Button>
    </Paper>
  );
};

export default ImageCompressor; 