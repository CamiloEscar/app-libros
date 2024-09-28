// const express = require('express');
// const cors = require('cors');
// const pdf = require('pdf-parse');
// const fs = require('fs').promises;
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// app.get('/api/book-preview/:bookId', async (req, res) => {
//   try {
//     const bookId = req.params.bookId;
//     const pdfPath = path.join(__dirname, 'books', `${bookId}.pdf`);
    
//     const dataBuffer = await fs.readFile(pdfPath);
//     const data = await pdf(dataBuffer);
    
//     // Extract the first few pages (e.g., 3 pages)
//     const previewText = data.text.split('\n').slice(0, 100).join('\n');
    
//     res.json({ preview: previewText, totalPages: data.numpages });
//   } catch (error) {
//     console.error('Error generating preview:', error);
//     res.status(500).json({ error: 'Failed to generate preview' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors');
const pdf = require('pdf-parse');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

let resourcesData = null;

async function loadResourcesData() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'public', 'tech-resources-database.json'), 'utf8');
    resourcesData = JSON.parse(data);
  } catch (error) {
    console.error('Error loading resources data:', error);
  }
}

loadResourcesData();

app.get('/api/book-preview/:bookSlug', async (req, res) => {
  try {
    if (!resourcesData) {
      await loadResourcesData();
      if (!resourcesData) {
        return res.status(500).json({ error: 'Resources data not available' });
      }
    }

    const bookSlug = req.params.bookSlug;
    const bookData = resourcesData.educationalResources.find(resource => resource.slug === bookSlug);
    
    if (!bookData) {
      return res.status(404).json({ error: 'Book not found' });
    }

    let dataBuffer;
    if (bookData.link.startsWith('http')) {
      // Fetch remote PDF
      const response = await fetch(bookData.link);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dataBuffer = await response.buffer();
    } else {
      // Load local PDF (fallback option)
      const pdfPath = path.join(__dirname, 'books', `${bookSlug}.pdf`);
      dataBuffer = await fs.readFile(pdfPath);
    }

    const data = await pdf(dataBuffer);
    
    // Extract the first few pages (e.g., 3 pages or 1000 characters, whichever comes first)
    const previewText = data.text.split('\n').slice(0, 100).join('\n').substring(0, 1000);
    
    res.json({ 
      preview: previewText, 
      totalPages: data.numpages,
      title: bookData.title,
      author: bookData.author || 'Unknown',
      link: bookData.link
    });
  } catch (error) {
    console.error('Error generating preview:', error);
    res.status(500).json({ error: 'Failed to generate preview', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});