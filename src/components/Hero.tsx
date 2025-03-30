import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { CloudUpload, PictureAsPdf, Image } from '@mui/icons-material';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
  color: '#ffffff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/hero-bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2,
    zIndex: 1,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '800px',
}));

const FeatureGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(8),
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-5px)',
  },
}));

const Hero = () => {
  const features = [
    {
      icon: <PictureAsPdf sx={{ fontSize: 48, color: '#2196f3' }} />,
      title: 'PDF Tools',
      description: 'Convert, compress, and edit PDFs with ease',
    },
    {
      icon: <Image sx={{ fontSize: 48, color: '#f50057' }} />,
      title: 'Image Processing',
      description: 'Enhance, compress, and transform images',
    },
    {
      icon: <CloudUpload sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Cloud Integration',
      description: 'Seamlessly sync with cloud storage',
    },
  ];

  return (
    <HeroContainer>
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              marginBottom: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Transform Your Files
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 4,
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
            }}
          >
            Professional-grade file conversion and processing tools at your fingertips
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #2196f3 0%, #f50057 100%)',
              borderRadius: '30px',
              padding: '12px 32px',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
              },
            }}
          >
            Get Started
          </Button>
        </motion.div>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {feature.icon}
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </ContentContainer>
    </HeroContainer>
  );
};

export default Hero; 