# Convertex - Modern File Conversion Suite

A modern, sleek web application for converting and processing various file formats with a beautiful Apple-inspired design.

![Convertex Logo](src/assets/logo.png)

## Features

### PDF Tools
- 📄 PDF to Word Converter
- 📝 Word to PDF Converter
- ✏️ PDF Editor
- 📦 PDF Compressor

### Image Tools
- 🖼️ Image Compressor
- 📸 Image to PDF Converter
- 🎨 Background Remover
- 🧹 Watermark Remover

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Build Tool:** Vite
- **PDF Processing:** PDF-Lib
- **Internationalization:** i18next

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mimozing3003/convertex.git
cd convertex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Local: http://localhost:3000
- Network: http://your-ip:3000

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
convertex/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── converters/    # File conversion tools
│   ├── assets/        # Static assets
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Public assets
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## Features in Detail

### PDF Tools
- **PDF to Word:** Convert PDF documents to editable Word files
- **Word to PDF:** Transform Word documents into PDF format
- **PDF Editor:** Edit PDF files with basic tools
- **PDF Compressor:** Compress PDF files while maintaining quality

### Image Tools
- **Image Compressor:** Compress images with quality control
- **Image to PDF:** Convert images to PDF documents
- **Background Remover:** Remove image backgrounds (requires API key)
- **Watermark Remover:** Remove watermarks from images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material-UI](https://mui.com/) for the beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [PDF-Lib](https://pdf-lib.js.org/) for PDF processing
- [React Router](https://reactrouter.com/) for routing
- [Vite](https://vitejs.dev/) for the build tool

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [mimozing3003](https://github.com/mimozing3003) 