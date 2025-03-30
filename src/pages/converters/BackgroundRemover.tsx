import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';

const BackgroundRemover: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image_file', selectedFile);

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'YOUR_REMOVE_BG_API_KEY', // Replace with your API key
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `removed_bg_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error removing background:', error);
      setError('Failed to remove background. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Background Remover
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
          id="background-remover-upload"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="background-remover-upload">
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleRemoveBackground}
        disabled={!selectedFile || processing}
        startIcon={processing ? <CircularProgress size={20} /> : <Download />}
        fullWidth
      >
        {processing ? 'Removing Background...' : 'Remove Background & Download'}
      </Button>

      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        Note: This feature requires a remove.bg API key. Please replace 'YOUR_REMOVE_BG_API_KEY' with your actual API key.
      </Typography>
    </Paper>
  );
};

export default BackgroundRemover; 