import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Crop as CropIcon,
  Filter as FilterIcon,
  AspectRatio as ResizeIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface PdfPage {
  id: number;
  image: string;
  rotation: number;
  zoom: number;
  filter: string;
  brightness: number;
  contrast: number;
}

const PdfEditor = () => {
  const { t } = useTranslation();
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate PDF to image conversion
    const newPages: PdfPage[] = acceptedFiles.map((file, index) => ({
      id: index,
      image: URL.createObjectURL(file),
      rotation: 0,
      zoom: 100,
      filter: 'none',
      brightness: 100,
      contrast: 100,
    }));
    setPages(newPages);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const handleRotation = (direction: 'left' | 'right') => {
    if (selectedPage === null) return;
    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, rotation: page.rotation + (direction === 'left' ? -90 : 90) }
        : page
    ));
  };

  const handleZoom = (delta: number) => {
    if (selectedPage === null) return;
    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, zoom: Math.max(50, Math.min(200, page.zoom + delta)) }
        : page
    ));
  };

  const handleFilterChange = (filter: string) => {
    if (selectedPage === null) return;
    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, filter }
        : page
    ));
  };

  const handleBrightnessChange = (value: number) => {
    if (selectedPage === null) return;
    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, brightness: value }
        : page
    ));
  };

  const handleContrastChange = (value: number) => {
    if (selectedPage === null) return;
    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, contrast: value }
        : page
    ));
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving PDF with modifications...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('converter.pdfEditor.title')}
      </Typography>

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
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h6" gutterBottom>
          {t('converter.pdfEditor.dropzone')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('converter.pdfEditor.dropzoneDescription')}
        </Typography>
      </Paper>

      {pages.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ position: 'relative', minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {selectedPage !== null && pages[selectedPage] && (
                  <Box
                    component="img"
                    src={pages[selectedPage].image}
                    alt={`Page ${selectedPage + 1}`}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '500px',
                      transform: `rotate(${pages[selectedPage].rotation}deg) scale(${pages[selectedPage].zoom / 100})`,
                      filter: `${pages[selectedPage].filter} brightness(${pages[selectedPage].brightness}%) contrast(${pages[selectedPage].contrast}%)`,
                    }}
                  />
                )}
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Tooltip title={t('converter.pdfEditor.rotateLeft')}>
                <IconButton onClick={() => handleRotation('left')}>
                  <RotateLeftIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.rotateRight')}>
                <IconButton onClick={() => handleRotation('right')}>
                  <RotateRightIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.zoomIn')}>
                <IconButton onClick={() => handleZoom(10)}>
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.zoomOut')}>
                <IconButton onClick={() => handleZoom(-10)}>
                  <ZoomOutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.crop')}>
                <IconButton onClick={() => setIsCropping(!isCropping)}>
                  <CropIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.resize')}>
                <IconButton onClick={() => setIsResizing(!isResizing)}>
                  <ResizeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('converter.pdfEditor.filters')}>
                <IconButton onClick={() => setShowFilters(!showFilters)}>
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ ml: 'auto' }}
              >
                {t('converter.pdfEditor.save')}
              </Button>
            </Box>

            {showFilters && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('converter.pdfEditor.filters')}
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>{t('converter.pdfEditor.filterType')}</InputLabel>
                  <Select
                    value={selectedPage !== null ? pages[selectedPage].filter : 'none'}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    label={t('converter.pdfEditor.filterType')}
                  >
                    <MenuItem value="none">{t('converter.pdfEditor.none')}</MenuItem>
                    <MenuItem value="grayscale">{t('converter.pdfEditor.grayscale')}</MenuItem>
                    <MenuItem value="sepia">{t('converter.pdfEditor.sepia')}</MenuItem>
                    <MenuItem value="blur(2px)">{t('converter.pdfEditor.blur')}</MenuItem>
                    <MenuItem value="invert(1)">{t('converter.pdfEditor.invert')}</MenuItem>
                  </Select>
                </FormControl>

                <Typography gutterBottom>
                  {t('converter.pdfEditor.brightness')}
                </Typography>
                <Slider
                  value={selectedPage !== null ? pages[selectedPage].brightness : 100}
                  onChange={(_, value) => handleBrightnessChange(value as number)}
                  min={0}
                  max={200}
                  valueLabelDisplay="auto"
                  sx={{ mb: 2 }}
                />

                <Typography gutterBottom>
                  {t('converter.pdfEditor.contrast')}
                </Typography>
                <Slider
                  value={selectedPage !== null ? pages[selectedPage].contrast : 100}
                  onChange={(_, value) => handleContrastChange(value as number)}
                  min={0}
                  max={200}
                  valueLabelDisplay="auto"
                />
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {t('converter.pdfEditor.pages')}
              </Typography>
              <Grid container spacing={1}>
                {pages.map((page) => (
                  <Grid item xs={6} sm={4} key={page.id}>
                    <Paper
                      sx={{
                        p: 1,
                        cursor: 'pointer',
                        border: selectedPage === page.id ? '2px solid' : 'none',
                        borderColor: 'primary.main',
                      }}
                      onClick={() => setSelectedPage(page.id)}
                    >
                      <Box
                        component="img"
                        src={page.image}
                        alt={`Page ${page.id + 1}`}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          transform: `rotate(${page.rotation}deg)`,
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PdfEditor; 