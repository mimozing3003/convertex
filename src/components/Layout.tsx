import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Dashboard, PictureAsPdf, Image, Settings, ChevronLeft } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'PDF to Word', icon: <PictureAsPdf />, path: '/converter/pdf-to-word' },
    { text: 'Word to PDF', icon: <PictureAsPdf />, path: '/converter/word-to-pdf' },
    { text: 'PDF Editor', icon: <PictureAsPdf />, path: '/converter/pdf-editor' },
    { text: 'PDF Compressor', icon: <PictureAsPdf />, path: '/converter/pdf-compressor' },
    { text: 'Image Compressor', icon: <Image />, path: '/converter/image-compressor' },
    { text: 'Image to PDF', icon: <Image />, path: '/converter/image-to-pdf' },
    { text: 'Background Remover', icon: <Image />, path: '/converter/background-remover' },
    { text: 'Watermark Remover', icon: <Image />, path: '/converter/watermark-remover' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: '#ffffff',
      }}
    >
      <Toolbar>
        <Logo />
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <ListItem
              button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '12px',
                mx: 1,
                mb: 1,
                '&.Mui-selected': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#2196f3',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {item.icon}
              </ListItemIcon>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItemText 
                      primary={item.text}
                      sx={{
                        '& .MuiTypography-root': {
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: location.pathname === item.path ? 600 : 400,
                        }
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </ListItem>
          </motion.div>
        ))}
      </List>
      {!isMobile && (
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            position: 'absolute',
            bottom: 20,
            left: collapsed ? 10 : drawerWidth - 30,
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#ffffff',
            },
          }}
        >
          <ChevronLeft sx={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
        </IconButton>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          ml: { sm: `${collapsed ? 80 : drawerWidth}px` },
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: collapsed ? 80 : drawerWidth, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 80 : drawerWidth,
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          mt: '64px',
          minHeight: '100vh',
          background: '#000000',
          color: '#ffffff',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Layout; 