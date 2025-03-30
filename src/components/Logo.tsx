import * as React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  }
});

const LogoText = styled(Box)({
  display: 'flex',
  gap: '2px',
  fontWeight: 700,
  letterSpacing: '1px',
});

const LogoLetter = styled(motion.span)({
  fontSize: '24px',
  background: 'linear-gradient(135deg, #2196F3 0%, #E91E63 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  cursor: 'default',
  '&:hover': {
    transform: 'scale(1.1)',
  }
});

const Logo: React.FC = () => {
  const letters = "CONVERTEX".split("");

  return (
    <LogoContainer>
      <LogoText>
        {letters.map((letter, index) => (
          <LogoLetter
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: index * 0.1
            }}
            whileHover={{ scale: 1.2 }}
          >
            {letter}
          </LogoLetter>
        ))}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo; 