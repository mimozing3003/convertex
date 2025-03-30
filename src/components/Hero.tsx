import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/hero-bg.jpg") center/cover',
    opacity: 0.1,
    zIndex: 1,
  }
});

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: '#fff',
  maxWidth: '800px',
});

const FeatureGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginTop: '4rem',
});

const FeatureCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  }
});

const Hero = () => {
  return (
    <HeroContainer>
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            Transform Your Files
          </Typography>
          <Typography variant="h5" gutterBottom>
            Convert, compress, and edit your files with ease
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </Button>
        </motion.div>

        <FeatureGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h6" gutterBottom>
              PDF Tools
            </Typography>
            <Typography>
              Convert, compress, and edit PDFs with our powerful tools
            </Typography>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Typography variant="h6" gutterBottom>
              Image Processing
            </Typography>
            <Typography>
              Remove backgrounds, watermarks, and optimize images
            </Typography>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Typography variant="h6" gutterBottom>
              Cloud Integration
            </Typography>
            <Typography>
              Seamlessly work with files from your cloud storage
            </Typography>
          </FeatureCard>
        </FeatureGrid>
      </ContentContainer>
    </HeroContainer>
  );
};

export default Hero; 