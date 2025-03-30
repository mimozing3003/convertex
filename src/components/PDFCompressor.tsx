import React, { useState } from 'react';
import { Box, Button, Slider, Typography, Paper, CircularProgress, Alert, LinearProgress } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';
import { PDFDocument } from 'pdf-lib';

interface PDFCompressorProps {
  onCompress?: (file: File, quality: number) => Promise<File>;
}

const PDFCompressor: React.FC<PDFCompressorProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    
    setCompressing(true);
    setError(null);
    setProgress(0);

    try {
      // Read the PDF file
      setProgress(20);
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Load the PDF document
      setProgress(40);
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Apply compression settings
      setProgress(60);
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      // Create a new file from the compressed PDF
      setProgress(80);
      const compressedFile = new File(
        [compressedPdfBytes],
        `compressed_${selectedFile.name}`,
        { type: 'application/pdf' }
      );

      // Download the compressed file
      setProgress(100);
      const url = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = compressedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 1000);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      setError('Failed to compress PDF. Please try again.');
    } finally {
      setCompressing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        PDF Compressor
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="pdf-upload"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="pdf-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
            disabled={compressing}
          >
            Select PDF
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

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Compression Level: {quality}%
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

export default PDFCompressor; 