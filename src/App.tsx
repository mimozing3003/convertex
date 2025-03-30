import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import i18n from './i18n';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PdfToWord from './pages/converters/PdfToWord';
import WordToPdf from './pages/converters/WordToPdf';
import PdfEditor from './pages/converters/PdfEditor';
import Settings from './pages/Settings';
import PhotoCompressor from './pages/converters/PhotoCompressor';
import ImageToPdf from './pages/converters/ImageToPdf';
import BackgroundRemover from './pages/converters/BackgroundRemover';
import WatermarkRemover from './pages/converters/WatermarkRemover';
import './index.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
            boxShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
    },
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/converter/pdf-to-word" element={<PdfToWord />} />
                <Route path="/converter/word-to-pdf" element={<WordToPdf />} />
                <Route path="/converter/pdf-editor" element={<PdfEditor />} />
                <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/photo-compressor" element={<PhotoCompressor />} />
                <Route path="/converter/image-to-pdf" element={<ImageToPdf />} />
                <Route path="/converter/background-remover" element={<BackgroundRemover />} />
                <Route path="/converter/watermark-remover" element={<WatermarkRemover />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App; 