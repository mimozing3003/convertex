import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface TranslationResources {
  [key: string]: {
    translation: {
      dashboard: {
        title: string;
        subtitle: string;
      };
      converter: {
        pdfToWord: {
          title: string;
          description: string;
          dropActive: string;
          dropInactive: string;
          supportedFormats: string;
          selectedFiles: string;
          pending: string;
          converting: string;
          completed: string;
          error: string;
          clearAll: string;
          convert: string;
        };
        wordToPdf: {
          title: string;
          description: string;
          dropActive: string;
          dropInactive: string;
          supportedFormats: string;
          selectedFiles: string;
          pending: string;
          converting: string;
          completed: string;
          error: string;
          clearAll: string;
          convert: string;
        };
        pdfEditor: {
          title: string;
          dropzone: string;
          dropzoneDescription: string;
          pages: string;
          rotateLeft: string;
          rotateRight: string;
          zoomIn: string;
          zoomOut: string;
          crop: string;
          resize: string;
          filters: string;
          save: string;
          filterType: string;
          none: string;
          grayscale: string;
          sepia: string;
          blur: string;
          invert: string;
          brightness: string;
          contrast: string;
        };
        photoCompressor: {
          title: string;
          compressionSettings: string;
          targetSize: string;
          kb: string;
          dpi: string;
          resolution: string;
          original: string;
          format: string;
          dropzone: string;
          dropzoneDescription: string;
          files: string;
          compress: string;
        };
        imageToPdf: {
          title: string;
          settings: string;
          pageSize: string;
          orientation: string;
          portrait: string;
          landscape: string;
          dropzone: string;
          dropzoneDescription: string;
          files: string;
          convert: string;
        };
        backgroundRemover: {
          title: string;
          settings: string;
          backgroundType: string;
          blur: string;
          mosaic: string;
          color: string;
          transparent: string;
          blurAmount: string;
          dropzone: string;
          dropzoneDescription: string;
          process: string;
        };
        watermarkRemover: {
          title: string;
          description: string;
          supportedFormats: string;
          dropzone: string;
          dropzoneDescription: string;
          process: string;
        };
        pdfCompressor: {
          title: string;
          compressionSettings: string;
          targetSize: string;
          kb: string;
          mb: string;
          compressionLevel: string;
          low: string;
          medium: string;
          high: string;
          dropzone: string;
          dropzoneDescription: string;
          files: string;
          compress: string;
          compressionRatio: string;
        };
      };
      settings: {
        title: string;
        language: string;
        selectLanguage: string;
        appearance: string;
        darkMode: string;
        notifications: string;
        enableNotifications: string;
        cloudStorage: string;
        used: string;
        enableCloudSync: string;
        downloadAll: string;
        clearStorage: string;
        offlineMode: string;
        enableOfflineMode: string;
        offlineModeDescription: string;
      };
    };
  };
}

const resources: TranslationResources = {
  en: {
    translation: {
      dashboard: {
        title: 'Welcome to Convertex',
        subtitle: 'Your All-in-One File & PDF Toolkit',
      },
      converter: {
        pdfToWord: {
          title: 'PDF to Word Converter',
          description: 'Convert your PDF documents to editable Word files',
          dropActive: 'Drop your PDF files here',
          dropInactive: 'Drag and drop PDF files here, or click to select',
          supportedFormats: 'Supported formats: PDF',
          selectedFiles: 'Selected Files',
          pending: 'Pending',
          converting: 'Converting',
          completed: 'Completed',
          error: 'Error',
          clearAll: 'Clear All',
          convert: 'Convert to Word',
        },
        wordToPdf: {
          title: 'Word to PDF Converter',
          description: 'Convert your Word documents to PDF format',
          dropActive: 'Drop your Word files here',
          dropInactive: 'Drag and drop Word files here, or click to select',
          supportedFormats: 'Supported formats: DOC, DOCX',
          selectedFiles: 'Selected Files',
          pending: 'Pending',
          converting: 'Converting',
          completed: 'Completed',
          error: 'Error',
          clearAll: 'Clear All',
          convert: 'Convert to PDF',
        },
        pdfEditor: {
          title: 'PDF Editor',
          dropzone: 'Drop PDF file here',
          dropzoneDescription: 'or click to select file',
          pages: 'Pages',
          rotateLeft: 'Rotate Left',
          rotateRight: 'Rotate Right',
          zoomIn: 'Zoom In',
          zoomOut: 'Zoom Out',
          crop: 'Crop',
          resize: 'Resize',
          filters: 'Filters',
          save: 'Save Changes',
          filterType: 'Filter Type',
          none: 'None',
          grayscale: 'Grayscale',
          sepia: 'Sepia',
          blur: 'Blur',
          invert: 'Invert',
          brightness: 'Brightness',
          contrast: 'Contrast',
        },
        photoCompressor: {
          title: 'Photo Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          dpi: 'DPI',
          resolution: 'Resolution',
          original: 'Original',
          format: 'Output Format',
          dropzone: 'Drag & drop photos here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
        },
        imageToPdf: {
          title: 'Image to PDF Converter',
          settings: 'Conversion Settings',
          pageSize: 'Page Size',
          orientation: 'Orientation',
          portrait: 'Portrait',
          landscape: 'Landscape',
          dropzone: 'Drag & drop images here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          convert: 'Convert to PDF',
        },
        backgroundRemover: {
          title: 'Background Remover',
          settings: 'Background Settings',
          backgroundType: 'Background Type',
          blur: 'Blur',
          mosaic: 'Mosaic',
          color: 'Color',
          transparent: 'Transparent',
          blurAmount: 'Blur Amount',
          dropzone: 'Drag & drop portrait photo here',
          dropzoneDescription: 'or click to select file',
          process: 'Remove Background',
        },
        watermarkRemover: {
          title: 'Watermark Remover',
          description: 'Remove watermarks from your PDFs and images',
          supportedFormats: 'Supported formats: PDF, JPG, JPEG, PNG, WEBP',
          dropzone: 'Drag & drop file here',
          dropzoneDescription: 'or click to select file',
          process: 'Remove Watermark',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: 'Settings',
        language: 'Language',
        selectLanguage: 'Select Language',
        appearance: 'Appearance',
        darkMode: 'Dark Mode',
        notifications: 'Notifications',
        enableNotifications: 'Enable Notifications',
        cloudStorage: 'Cloud Storage',
        used: 'used',
        enableCloudSync: 'Enable Cloud Sync',
        downloadAll: 'Download All',
        clearStorage: 'Clear Storage',
        offlineMode: 'Offline Mode',
        enableOfflineMode: 'Enable Offline Mode',
        offlineModeDescription: 'Work without internet connection. Files will sync when online.',
      },
    },
  },
  bn: {
    translation: {
      dashboard: {
        title: 'কনভার্টেক্সে স্বাগতম',
        subtitle: 'আপনার অল-ইন-ওয়ান ফাইল এবং PDF টুলকিট',
      },
      converter: {
        pdfToWord: {
          title: 'PDF থেকে Word কনভার্টার',
          description: 'আপনার PDF ডকুমেন্টগুলি সম্পাদনযোগ্য Word ফাইলে রূপান্তর করুন',
          dropActive: 'আপনার PDF ফাইলগুলি এখানে রাখুন',
          dropInactive: 'PDF ফাইলগুলি এখানে টেনে আনুন, অথবা নির্বাচন করতে ক্লিক করুন',
          supportedFormats: 'সমর্থিত ফরম্যাট: PDF',
          selectedFiles: 'নির্বাচিত ফাইলগুলি',
          pending: 'বিচারাধীন',
          converting: 'রূপান্তর করা হচ্ছে',
          completed: 'সম্পন্ন',
          error: 'ত্রুটি',
          clearAll: 'সব মুছে ফেলুন',
          convert: 'Word এ রূপান্তর করুন',
        },
        wordToPdf: {
          title: 'Word থেকে PDF কনভার্টার',
          description: 'আপনার Word ডকুমেন্টগুলি PDF ফরম্যাটে রূপান্তর করুন',
          dropActive: 'আপনার Word ফাইলগুলি এখানে রাখুন',
          dropInactive: 'Word ফাইলগুলি এখানে টেনে আনুন, অথবা নির্বাচন করতে ক্লিক করুন',
          supportedFormats: 'সমর্থিত ফরম্যাট: DOC, DOCX',
          selectedFiles: 'নির্বাচিত ফাইলগুলি',
          pending: 'বিচারাধীন',
          converting: 'রূপান্তর করা হচ্ছে',
          completed: 'সম্পন্ন',
          error: 'ত্রুটি',
          clearAll: 'সব মুছে ফেলুন',
          convert: 'PDF এ রূপান্তর করুন',
        },
        pdfEditor: {
          title: 'PDF সম্পাদক',
          dropzone: 'PDF ফাইল এখানে রাখুন',
          dropzoneDescription: 'অথবা ফাইল নির্বাচন করতে ক্লিক করুন',
          pages: 'পৃষ্ঠাগুলি',
          rotateLeft: 'বাম দিকে ঘোরান',
          rotateRight: 'ডান দিকে ঘোরান',
          zoomIn: 'জুম ইন',
          zoomOut: 'জুম আউট',
          crop: 'ক্রপ',
          resize: 'আকার পরিবর্তন',
          filters: 'ফিল্টার',
          save: 'পরিবর্তনগুলি সংরক্ষণ করুন',
          filterType: 'ফিল্টার টাইপ',
          none: 'কিছুই না',
          grayscale: 'গ্রেস্কেল',
          sepia: 'সেপিয়া',
          blur: 'ব্লার',
          invert: 'ইনভার্ট',
          brightness: 'উজ্জ্বলতা',
          contrast: 'কনট্রাস্ট',
        },
        photoCompressor: {
          title: 'ছবি কম্প্রেসর',
          compressionSettings: 'কম্প্রেশন সেটিংস',
          targetSize: 'লক্ষ্য আকার',
          kb: 'কেবি',
          dpi: 'ডিপিআই',
          resolution: 'রেজোলিউশন',
          original: 'মূল',
          format: 'আউটপুট ফরম্যাট',
          dropzone: 'এখানে ছবি টেনে আনুন',
          dropzoneDescription: 'অথবা ফাইল নির্বাচন করতে ক্লিক করুন',
          files: 'ফাইল',
          compress: 'কম্প্রেস',
        },
        imageToPdf: {
          title: 'ছবি থেকে PDF কনভার্টার',
          settings: 'রূপান্তর সেটিংস',
          pageSize: 'পৃষ্ঠার আকার',
          orientation: 'অভিমুখ',
          portrait: 'লম্বা',
          landscape: 'আড়াআড়ি',
          dropzone: 'এখানে ছবি টেনে আনুন',
          dropzoneDescription: 'অথবা ফাইল নির্বাচন করতে ক্লিক করুন',
          files: 'ফাইল',
          convert: 'PDF তে রূপান্তর করুন',
        },
        backgroundRemover: {
          title: 'পটভূমি সরানোর টুল',
          settings: 'পটভূমি সেটিংস',
          backgroundType: 'পটভূমির ধরন',
          blur: 'ব্লার',
          mosaic: 'মোজাইক',
          color: 'রঙ',
          transparent: 'স্বচ্ছ',
          blurAmount: 'ব্লার পরিমাণ',
          dropzone: 'এখানে পোর্ট্রেট ছবি টেনে আনুন',
          dropzoneDescription: 'অথবা ফাইল নির্বাচন করতে ক্লিক করুন',
          process: 'পটভূমি সরান',
        },
        watermarkRemover: {
          title: 'ওয়াটারমার্ক সরানোর টুল',
          description: 'আপনার PDF এবং ছবি থেকে ওয়াটারমার্ক সরান',
          supportedFormats: 'সমর্থিত ফরম্যাট: PDF, JPG, JPEG, PNG, WEBP',
          dropzone: 'এখানে ফাইল টেনে আনুন',
          dropzoneDescription: 'অথবা ফাইল নির্বাচন করতে ক্লিক করুন',
          process: 'ওয়াটারমার্ক সরান',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: 'সেটিংস',
        language: 'ভাষা',
        selectLanguage: 'ভাষা নির্বাচন করুন',
        appearance: 'চেহারা',
        darkMode: 'ডার্ক মোড',
        notifications: 'বিজ্ঞপ্তি',
        enableNotifications: 'বিজ্ঞপ্তি সক্রিয় করুন',
        cloudStorage: 'ক্লাউড স্টোরেজ',
        used: 'ব্যবহৃত',
        enableCloudSync: 'ক্লাউড সিঙ্ক সক্রিয় করুন',
        downloadAll: 'সব ডাউনলোড করুন',
        clearStorage: 'স্টোরেজ মুছে ফেলুন',
        offlineMode: 'অফলাইন মোড',
        enableOfflineMode: 'অফলাইন মোড সক্রিয় করুন',
        offlineModeDescription: 'ইন্টারনেট সংযোগ ছাড়াই কাজ করুন। অনলাইনে থাকলে ফাইলগুলি সিঙ্ক হবে।',
      },
    },
  },
  hi: {
    translation: {
      dashboard: {
        title: 'कन्वर्टेक्स में आपका स्वागत है',
        subtitle: 'आपका ऑल-इन-वन फ़ाइल और PDF टूलकिट',
      },
      converter: {
        pdfToWord: {
          title: 'PDF से Word कनवर्टर',
          description: 'अपने PDF दस्तावेज़ों को संपादन योग्य Word फ़ाइलों में बदलें',
          dropActive: 'अपनी PDF फ़ाइलें यहाँ छोड़ें',
          dropInactive: 'PDF फ़ाइलें यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
          supportedFormats: 'समर्थित प्रारूप: PDF',
          selectedFiles: 'चयनित फ़ाइलें',
          pending: 'लंबित',
          converting: 'कनवर्ट हो रहा है',
          completed: 'पूर्ण',
          error: 'त्रुटि',
          clearAll: 'सभी साफ़ करें',
          convert: 'Word में कनवर्ट करें',
        },
        wordToPdf: {
          title: 'Word से PDF कनवर्टर',
          description: 'अपने Word दस्तावेज़ों को PDF प्रारूप में बदलें',
          dropActive: 'अपनी Word फ़ाइलें यहाँ छोड़ें',
          dropInactive: 'Word फ़ाइलें यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
          supportedFormats: 'समर्थित प्रारूप: DOC, DOCX',
          selectedFiles: 'चयनित फ़ाइलें',
          pending: 'लंबित',
          converting: 'कनवर्ट हो रहा है',
          completed: 'पूर्ण',
          error: 'त्रुटि',
          clearAll: 'सभी साफ़ करें',
          convert: 'PDF में कनवर्ट करें',
        },
        pdfEditor: {
          title: 'PDF संपादक',
          dropzone: 'PDF फ़ाइल यहाँ छोड़ें',
          dropzoneDescription: 'या फ़ाइल चुनने के लिए क्लिक करें',
          pages: 'पृष्ठ',
          rotateLeft: 'बाईं ओर घुमाएं',
          rotateRight: 'दाईं ओर घुमाएं',
          zoomIn: 'ज़ूम इन',
          zoomOut: 'ज़ूम आउट',
          crop: 'क्रॉप',
          resize: 'आकार बदलें',
          filters: 'फ़िल्टर',
          save: 'परिवर्तन सहेजें',
          filterType: 'फ़िल्टर प्रकार',
          none: 'कोई नहीं',
          grayscale: 'ग्रेस्केल',
          sepia: 'सेपिया',
          blur: 'ब्लर',
          invert: 'इनवर्ट',
          brightness: 'चमक',
          contrast: 'कंट्रास्ट',
        },
        photoCompressor: {
          title: 'फोटो कम्प्रेसर',
          compressionSettings: 'कम्प्रेशन सेटिंग्स',
          targetSize: 'लक्ष्य आकार',
          kb: 'केबी',
          dpi: 'डीपीआई',
          resolution: 'रिज़ॉल्यूशन',
          original: 'मूल',
          format: 'आउटपुट फॉर्मेट',
          dropzone: 'यहाँ फोटो खींचें और छोड़ें',
          dropzoneDescription: 'या फ़ाइल चुनने के लिए क्लिक करें',
          files: 'फ़ाइलें',
          compress: 'कम्प्रेस',
        },
        imageToPdf: {
          title: 'छवि से PDF कनवर्टर',
          settings: 'रूपांतरण सेटिंग्स',
          pageSize: 'पृष्ठ आकार',
          orientation: 'दिशा',
          portrait: 'पोर्ट्रेट',
          landscape: 'लैंडस्केप',
          dropzone: 'यहाँ छवियाँ खींचें और छोड़ें',
          dropzoneDescription: 'या फ़ाइल चुनने के लिए क्लिक करें',
          files: 'फ़ाइलें',
          convert: 'PDF में कनवर्ट करें',
        },
        backgroundRemover: {
          title: 'पृष्ठभूमि हटाने वाला',
          settings: 'पृष्ठभूमि सेटिंग्स',
          backgroundType: 'पृष्ठभूमि प्रकार',
          blur: 'ब्लर',
          mosaic: 'मोज़ेक',
          color: 'रंग',
          transparent: 'पारदर्शी',
          blurAmount: 'ब्लर मात्रा',
          dropzone: 'यहाँ पोर्ट्रेट फोटो खींचें और छोड़ें',
          dropzoneDescription: 'या फ़ाइल चुनने के लिए क्लिक करें',
          process: 'पृष्ठभूमि हटाएं',
        },
        watermarkRemover: {
          title: 'वॉटरमार्क हटाने वाला',
          description: 'अपने PDF और छवियों से वॉटरमार्क हटाएं',
          supportedFormats: 'समर्थित प्रारूप: PDF, JPG, JPEG, PNG, WEBP',
          dropzone: 'यहाँ फ़ाइल खींचें और छोड़ें',
          dropzoneDescription: 'या फ़ाइल चुनने के लिए क्लिक करें',
          process: 'वॉटरमार्क हटाएं',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: 'सेटिंग्स',
        language: 'भाषा',
        selectLanguage: 'भाषा चुनें',
        appearance: 'दिखावट',
        darkMode: 'डार्क मोड',
        notifications: 'सूचनाएं',
        enableNotifications: 'सूचनाएं सक्षम करें',
        cloudStorage: 'क्लाउड स्टोरेज',
        used: 'उपयोग किया गया',
        enableCloudSync: 'क्लाउड सिंक सक्षम करें',
        downloadAll: 'सभी डाउनलोड करें',
        clearStorage: 'स्टोरेज साफ़ करें',
        offlineMode: 'ऑफ़लाइन मोड',
        enableOfflineMode: 'ऑफ़लाइन मोड सक्षम करें',
        offlineModeDescription: 'इंटरनेट कनेक्शन के बिना काम करें। ऑनलाइन होने पर फ़ाइलें सिंक होंगी।',
      },
    },
  },
  zh: {
    translation: {
      dashboard: {
        title: '欢迎使用 Convertex',
        subtitle: '您的一站式文件和 PDF 工具包',
      },
      converter: {
        pdfToWord: {
          title: 'PDF转Word转换器',
          description: '将PDF文档转换为可编辑的Word文件',
          dropActive: '将PDF文件拖放到此处',
          dropInactive: '拖放PDF文件到此处，或点击选择',
          supportedFormats: '支持的格式：PDF',
          selectedFiles: '已选择文件',
          pending: '等待中',
          converting: '转换中',
          completed: '已完成',
          error: '错误',
          clearAll: '清除全部',
          convert: '转换为Word',
        },
        wordToPdf: {
          title: 'Word转PDF转换器',
          description: '将Word文档转换为PDF格式',
          dropActive: '将Word文件拖放到此处',
          dropInactive: '拖放Word文件到此处，或点击选择',
          supportedFormats: '支持的格式：DOC, DOCX',
          selectedFiles: '已选择文件',
          pending: '等待中',
          converting: '转换中',
          completed: '已完成',
          error: '错误',
          clearAll: '清除全部',
          convert: '转换为PDF',
        },
        pdfEditor: {
          title: 'PDF编辑器',
          dropzone: '将PDF文件拖放到此处',
          dropzoneDescription: '或点击选择文件',
          pages: '页面',
          rotateLeft: '向左旋转',
          rotateRight: '向右旋转',
          zoomIn: '放大',
          zoomOut: '缩小',
          crop: '裁剪',
          resize: '调整大小',
          filters: '滤镜',
          save: '保存更改',
          filterType: '滤镜类型',
          none: '无',
          grayscale: '灰度',
          sepia: '复古',
          blur: '模糊',
          invert: '反相',
          brightness: '亮度',
          contrast: '对比度',
        },
        photoCompressor: {
          title: '照片压缩器',
          compressionSettings: '压缩设置',
          targetSize: '目标大小',
          kb: 'KB',
          dpi: 'DPI',
          resolution: '分辨率',
          original: '原始',
          format: '输出格式',
          dropzone: '拖放照片到这里',
          dropzoneDescription: '或点击选择文件',
          files: '文件',
          compress: '压缩',
        },
        imageToPdf: {
          title: '图片转PDF转换器',
          settings: '转换设置',
          pageSize: '页面大小',
          orientation: '方向',
          portrait: '纵向',
          landscape: '横向',
          dropzone: '拖放图片到这里',
          dropzoneDescription: '或点击选择文件',
          files: '文件',
          convert: '转换为PDF',
        },
        backgroundRemover: {
          title: '背景去除工具',
          settings: '背景设置',
          backgroundType: '背景类型',
          blur: '模糊',
          mosaic: '马赛克',
          color: '颜色',
          transparent: '透明',
          blurAmount: '模糊程度',
          dropzone: '拖放人像照片到这里',
          dropzoneDescription: '或点击选择文件',
          process: '去除背景',
        },
        watermarkRemover: {
          title: '水印去除工具',
          description: '从PDF和图片中去除水印',
          supportedFormats: '支持的格式：PDF、JPG、JPEG、PNG、WEBP',
          dropzone: '拖放文件到这里',
          dropzoneDescription: '或点击选择文件',
          process: '去除水印',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: '设置',
        language: '语言',
        selectLanguage: '选择语言',
        appearance: '外观',
        darkMode: '深色模式',
        notifications: '通知',
        enableNotifications: '启用通知',
        cloudStorage: '云存储',
        used: '已使用',
        enableCloudSync: '启用云同步',
        downloadAll: '下载全部',
        clearStorage: '清除存储',
        offlineMode: '离线模式',
        enableOfflineMode: '启用离线模式',
        offlineModeDescription: '无需互联网连接即可工作。在线时文件将同步。',
      },
    },
  },
  ja: {
    translation: {
      dashboard: {
        title: 'Convertexへようこそ',
        subtitle: 'オールインワンのファイルとPDFツールキット',
      },
      converter: {
        pdfToWord: {
          title: 'PDFからWordへの変換',
          description: 'PDF文書を編集可能なWordファイルに変換',
          dropActive: 'PDFファイルをここにドロップ',
          dropInactive: 'PDFファイルをここにドラッグ＆ドロップ、またはクリックして選択',
          supportedFormats: '対応フォーマット：PDF',
          selectedFiles: '選択されたファイル',
          pending: '保留中',
          converting: '変換中',
          completed: '完了',
          error: 'エラー',
          clearAll: 'すべてクリア',
          convert: 'Wordに変換',
        },
        wordToPdf: {
          title: 'WordからPDFへの変換',
          description: 'Word文書をPDF形式に変換',
          dropActive: 'Wordファイルをここにドロップ',
          dropInactive: 'Wordファイルをここにドラッグ＆ドロップ、またはクリックして選択',
          supportedFormats: '対応フォーマット：DOC, DOCX',
          selectedFiles: '選択されたファイル',
          pending: '保留中',
          converting: '変換中',
          completed: '完了',
          error: 'エラー',
          clearAll: 'すべてクリア',
          convert: 'PDFに変換',
        },
        pdfEditor: {
          title: 'PDFエディター',
          dropzone: 'PDFファイルをここにドロップ',
          dropzoneDescription: 'またはクリックしてファイルを選択',
          pages: 'ページ',
          rotateLeft: '左に回転',
          rotateRight: '右に回転',
          zoomIn: 'ズームイン',
          zoomOut: 'ズームアウト',
          crop: '切り取り',
          resize: 'サイズ変更',
          filters: 'フィルター',
          save: '変更を保存',
          filterType: 'フィルタータイプ',
          none: 'なし',
          grayscale: 'グレースケール',
          sepia: 'セピア',
          blur: 'ぼかし',
          invert: '反転',
          brightness: '明るさ',
          contrast: 'コントラスト',
        },
        photoCompressor: {
          title: '写真圧縮ツール',
          compressionSettings: '圧縮設定',
          targetSize: '目標サイズ',
          kb: 'KB',
          dpi: 'DPI',
          resolution: '解像度',
          original: 'オリジナル',
          format: '出力形式',
          dropzone: '写真をここにドロップ',
          dropzoneDescription: 'またはクリックしてファイルを選択',
          files: 'ファイル',
          compress: '圧縮',
        },
        imageToPdf: {
          title: '画像からPDFへの変換',
          settings: '変換設定',
          pageSize: 'ページサイズ',
          orientation: '向き',
          portrait: '縦向き',
          landscape: '横向き',
          dropzone: '画像をここにドロップ',
          dropzoneDescription: 'またはクリックしてファイルを選択',
          files: 'ファイル',
          convert: 'PDFに変換',
        },
        backgroundRemover: {
          title: '背景除去ツール',
          settings: '背景設定',
          backgroundType: '背景タイプ',
          blur: 'ぼかし',
          mosaic: 'モザイク',
          color: '色',
          transparent: '透明',
          blurAmount: 'ぼかしの強さ',
          dropzone: 'ポートレート写真をここにドロップ',
          dropzoneDescription: 'またはクリックしてファイルを選択',
          process: '背景を除去',
        },
        watermarkRemover: {
          title: '透かし除去ツール',
          description: 'PDFや画像から透かしを除去',
          supportedFormats: '対応フォーマット：PDF、JPG、JPEG、PNG、WEBP',
          dropzone: 'ファイルをここにドロップ',
          dropzoneDescription: 'またはクリックしてファイルを選択',
          process: '透かしを除去',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: '設定',
        language: '言語',
        selectLanguage: '言語を選択',
        appearance: '外観',
        darkMode: 'ダークモード',
        notifications: '通知',
        enableNotifications: '通知を有効にする',
        cloudStorage: 'クラウドストレージ',
        used: '使用済み',
        enableCloudSync: 'クラウド同期を有効にする',
        downloadAll: 'すべてダウンロード',
        clearStorage: 'ストレージをクリア',
        offlineMode: 'オフラインモード',
        enableOfflineMode: 'オフラインモードを有効にする',
        offlineModeDescription: 'インターネット接続なしで作業。オンライン時にファイルが同期されます。',
      },
    },
  },
  ru: {
    translation: {
      dashboard: {
        title: 'Добро пожаловать в Convertex',
        subtitle: 'Ваш универсальный набор инструментов для файлов и PDF',
      },
      converter: {
        pdfToWord: {
          title: 'Конвертер PDF в Word',
          description: 'Преобразуйте PDF документы в редактируемые файлы Word',
          dropActive: 'Перетащите PDF файлы сюда',
          dropInactive: 'Перетащите PDF файлы сюда или нажмите для выбора',
          supportedFormats: 'Поддерживаемые форматы: PDF',
          selectedFiles: 'Выбранные файлы',
          pending: 'В ожидании',
          converting: 'Конвертация',
          completed: 'Завершено',
          error: 'Ошибка',
          clearAll: 'Очистить все',
          convert: 'Конвертировать в Word',
        },
        wordToPdf: {
          title: 'Конвертер Word в PDF',
          description: 'Преобразуйте документы Word в формат PDF',
          dropActive: 'Перетащите Word файлы сюда',
          dropInactive: 'Перетащите Word файлы сюда или нажмите для выбора',
          supportedFormats: 'Поддерживаемые форматы: DOC, DOCX',
          selectedFiles: 'Выбранные файлы',
          pending: 'В ожидании',
          converting: 'Конвертация',
          completed: 'Завершено',
          error: 'Ошибка',
          clearAll: 'Очистить все',
          convert: 'Конвертировать в PDF',
        },
        pdfEditor: {
          title: 'PDF редактор',
          dropzone: 'Перетащите PDF файл сюда',
          dropzoneDescription: 'или нажмите для выбора файла',
          pages: 'Страницы',
          rotateLeft: 'Повернуть влево',
          rotateRight: 'Повернуть вправо',
          zoomIn: 'Приблизить',
          zoomOut: 'Отдалить',
          crop: 'Обрезать',
          resize: 'Изменить размер',
          filters: 'Фильтры',
          save: 'Сохранить изменения',
          filterType: 'Тип фильтра',
          none: 'Нет',
          grayscale: 'Оттенки серого',
          sepia: 'Сепия',
          blur: 'Размытие',
          invert: 'Инвертировать',
          brightness: 'Яркость',
          contrast: 'Контраст',
        },
        photoCompressor: {
          title: 'Сжатие фотографий',
          compressionSettings: 'Настройки сжатия',
          targetSize: 'Целевой размер',
          kb: 'КБ',
          dpi: 'DPI',
          resolution: 'Разрешение',
          original: 'Оригинал',
          format: 'Выходной формат',
          dropzone: 'Перетащите фотографии сюда',
          dropzoneDescription: 'или нажмите для выбора файлов',
          files: 'Файлы',
          compress: 'Сжать',
        },
        imageToPdf: {
          title: 'Конвертер изображений в PDF',
          settings: 'Настройки конвертации',
          pageSize: 'Размер страницы',
          orientation: 'Ориентация',
          portrait: 'Книжная',
          landscape: 'Альбомная',
          dropzone: 'Перетащите изображения сюда',
          dropzoneDescription: 'или нажмите для выбора файлов',
          files: 'Файлы',
          convert: 'Конвертировать в PDF',
        },
        backgroundRemover: {
          title: 'Удаление фона',
          settings: 'Настройки фона',
          backgroundType: 'Тип фона',
          blur: 'Размытие',
          mosaic: 'Мозаика',
          color: 'Цвет',
          transparent: 'Прозрачный',
          blurAmount: 'Степень размытия',
          dropzone: 'Перетащите портретное фото сюда',
          dropzoneDescription: 'или нажмите для выбора файла',
          process: 'Удалить фон',
        },
        watermarkRemover: {
          title: 'Удаление водяных знаков',
          description: 'Удалите водяные знаки из PDF и изображений',
          supportedFormats: 'Поддерживаемые форматы: PDF, JPG, JPEG, PNG, WEBP',
          dropzone: 'Перетащите файл сюда',
          dropzoneDescription: 'или нажмите для выбора файла',
          process: 'Удалить водяной знак',
        },
        pdfCompressor: {
          title: 'PDF Compressor',
          compressionSettings: 'Compression Settings',
          targetSize: 'Target Size',
          kb: 'KB',
          mb: 'MB',
          compressionLevel: 'Compression Level',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          dropzone: 'Drag & drop PDF files here',
          dropzoneDescription: 'or click to select files',
          files: 'Files',
          compress: 'Compress',
          compressionRatio: 'reduction',
        },
      },
      settings: {
        title: 'Настройки',
        language: 'Язык',
        selectLanguage: 'Выберите язык',
        appearance: 'Внешний вид',
        darkMode: 'Тёмная тема',
        notifications: 'Уведомления',
        enableNotifications: 'Включить уведомления',
        cloudStorage: 'Облачное хранилище',
        used: 'использовано',
        enableCloudSync: 'Включить облачную синхронизацию',
        downloadAll: 'Скачать всё',
        clearStorage: 'Очистить хранилище',
        offlineMode: 'Автономный режим',
        enableOfflineMode: 'Включить автономный режим',
        offlineModeDescription: 'Работа без подключения к интернету. Файлы синхронизируются при подключении.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 