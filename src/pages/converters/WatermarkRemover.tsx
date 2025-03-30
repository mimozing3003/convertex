import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Alert, Slider } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';

const WatermarkRemover: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<number>(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      setError('Please select a valid image file (JPG, PNG)');
    }
  };

  const removeWatermark = (image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw original image
    ctx.drawImage(image, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply threshold-based watermark removal
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];

      // Apply threshold to remove watermark
      if (r > threshold && g > threshold && b > threshold) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = alpha; // Preserve original alpha
      }
    }

    // Put modified image data back to canvas
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL('image/png');
  };

  const handleRemoveWatermark = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = preview;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const processedImageData = removeWatermark(img);
      if (!processedImageData) {
        throw new Error('Failed to process image');
      }

      // Convert base64 to blob
      const response = await fetch(processedImageData);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `removed_watermark_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error removing watermark:', error);
      setError('Failed to remove watermark. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Watermark Remover
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
          id="watermark-remover-upload"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="watermark-remover-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
            disabled={processing}
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
          <Typography variant="subtitle1" gutterBottom>
            Preview:
          </Typography>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Threshold: {threshold}%
        </Typography>
        <Slider
          value={threshold}
          onChange={(_, value) => setThreshold(value as number)}
          min={0}
          max={100}
          marks
          valueLabelDisplay="auto"
          disabled={processing}
        />
        <Typography variant="body2" color="text.secondary">
          Adjust the threshold to control watermark removal intensity. Higher values will remove more light-colored areas.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRemoveWatermark}
        disabled={!selectedFile || processing}
        startIcon={processing ? <CircularProgress size={20} /> : <Download />}
        fullWidth
      >
        {processing ? 'Removing Watermark...' : 'Remove Watermark & Download'}
      </Button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Paper>
  );
};

export default WatermarkRemover; 