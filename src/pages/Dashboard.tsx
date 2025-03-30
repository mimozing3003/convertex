import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  PhotoCamera as CameraIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path?: string;
  details?: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: 'PDF to Word',
      description: 'Convert PDF documents to editable Word files',
      icon: <DocIcon />,
      color: '#2196f3',
      path: '/converter/pdf-to-word',
      details: [
        'Convert PDF to DOCX format',
        'Preserve formatting and layout',
        'Support for multiple pages',
        'Batch conversion available'
      ]
    },
    {
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      icon: <PdfIcon />,
      color: '#f44336',
      path: '/converter/word-to-pdf',
      details: [
        'Convert DOCX to PDF format',
        'Maintain document formatting',
        'Secure PDF output',
        'Multiple file support'
      ]
    },
    {
      title: 'PDF Editor',
      description: 'Edit and modify PDF documents',
      icon: <CameraIcon />,
      color: '#4caf50',
      path: '/converter/pdf-editor',
      details: [
        'Add/remove pages',
        'Merge PDFs',
        'Split PDFs',
        'Add annotations'
      ]
    },
    {
      title: 'PDF Compressor',
      description: 'Compress PDF files while maintaining quality',
      icon: <CameraIcon />,
      color: '#ff9800',
      path: '/converter/pdf-compress',
      details: [
        'Reduce file size',
        'Maintain quality',
        'Batch processing',
        'Custom compression levels'
      ]
    },
    {
      title: 'Photo Compressor',
      description: 'Compress images without losing quality',
      icon: <ImageIcon />,
      color: '#9c27b0',
      path: '/converter/photo-compress',
      details: [
        'Smart compression',
        'Quality control',
        'Multiple formats support',
        'Batch processing'
      ]
    },
    {
      title: 'Image Resizer',
      description: 'Resize images to any dimensions',
      icon: <CameraIcon />,
      color: '#00bcd4',
      path: '/converter/image-resize',
      details: [
        'Custom dimensions',
        'Aspect ratio lock',
        'Multiple formats',
        'Batch processing'
      ]
    },
    {
      title: 'Watermark Remover',
      description: 'Remove watermarks from images',
      icon: <CameraIcon />,
      color: '#3f51b5',
      path: '/converter/watermark-remove',
      details: [
        'AI-powered removal',
        'Multiple watermark types',
        'Preserve image quality',
        'Batch processing'
      ]
    },
    {
      title: 'Background Remover',
      description: 'Remove backgrounds from images',
      icon: <CameraIcon />,
      color: '#e91e63',
      path: '/converter/background-remove',
      details: [
        'AI-powered removal',
        'Clean edges',
        'Transparent background',
        'Multiple formats'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const handleFeatureClick = (feature: Feature) => {
    if (feature.path) {
      navigate(feature.path);
    } else {
      setSelectedFeature(feature);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to Convertex
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Your All-in-One Image Processing Toolkit
        </Typography>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={feature.title}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      '& .info-icon': {
                        opacity: 1,
                      },
                      '& .arrow-icon': {
                        opacity: 1,
                      },
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleFeatureClick(feature)}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'white',
                      background: `linear-gradient(45deg, ${feature.color}, ${feature.color}dd)`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                  {!feature.path && (
                    <IconButton
                      className="info-icon"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  )}
                  {feature.path && (
                    <IconButton
                      className="arrow-icon"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Dialog
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        TransitionComponent={Fade}
        maxWidth="sm"
        fullWidth
      >
        <AnimatePresence>
          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogTitle sx={{ m: 0, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      background: `linear-gradient(45deg, ${selectedFeature.color}, ${selectedFeature.color}dd)`,
                    }}
                  >
                    {selectedFeature.icon}
                  </Box>
                  {selectedFeature.title}
                </Box>
                <IconButton
                  aria-label="close"
                  onClick={() => setSelectedFeature(null)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="body1" paragraph>
                  {selectedFeature.description}
                </Typography>
                {selectedFeature.details && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Key Features:
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {selectedFeature.details.map((detail, index) => (
                        <li key={index}>
                          <Typography variant="body2">{detail}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedFeature(null)}>Close</Button>
              </DialogActions>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 