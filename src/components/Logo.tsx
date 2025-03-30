import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
});

const LogoText = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const LogoLetter = styled(motion.span)({
  display: 'inline-block',
  fontSize: '28px',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #2196f3 0%, #f50057 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(135deg, #2196f3 0%, #f50057 100%)',
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },
});

const Logo = () => {
  const letters = "CONVERTEX".split("");

  return (
    <LogoContainer>
      <LogoText>
        {letters.map((letter, index) => (
          <LogoLetter
            key={index}
            initial={{ y: -20, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            whileHover={{
              scale: 1.2,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            {letter}
          </LogoLetter>
        ))}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo; 