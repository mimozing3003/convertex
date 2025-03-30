import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{
          width: 40,
          height: 40,
          background: 'linear-gradient(45deg, #2196f3, #f50057)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          C
        </Typography>
      </motion.div>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2196f3, #f50057)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Convertex
      </Typography>
    </Box>
  );
};

export default Logo; 