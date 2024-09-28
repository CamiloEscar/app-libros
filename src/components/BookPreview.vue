<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-4">{{ book.title }}</h2>
      
      <div class="bg-gray-100 p-4 rounded-lg mb-4">
        <p><strong>Type:</strong> {{ book.type }}</p>
        <p><strong>Language:</strong> {{ book.language }}</p>
        <p><strong>Date:</strong> {{ formatDate(book.date) }}</p>
        <p><strong>Tags:</strong> {{ book.tags.join(', ') }}</p>
      </div>

      <div v-if="loading" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p class="mt-2 text-gray-600">Loading preview...</p>
      </div>
      
      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>
      
      <canvas v-if="!loading && !error && pdfRendered" ref="pdfCanvas" class="w-full h-auto mb-4"></canvas>

      <div v-if="!loading && !error && pdfText" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-bold mb-2">Preview:</h3>
        <p>{{ pdfText }}</p>
      </div>

      <div v-if="!loading && !error && !pdfRendered && !pdfText" class="mt-4 p-4 bg-yellow-100 rounded">
        <p class="text-yellow-700">No preview available. Please click "View Full Resource" to access the content.</p>
      </div>

      <div class="flex justify-between mt-4">
        <button 
          @click="$emit('close')" 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <a 
          :href="book.link" 
          target="_blank" 
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View Full Resource
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const pdfCanvas = ref(null);
const loading = ref(true);
const error = ref(null);
const pdfText = ref('');
const pdfRendered = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const renderPdf = async (url) => {
  console.log('Attempting to render PDF:', url);
  if (!url) {
    error.value = 'No PDF URL provided';
    loading.value = false;
    return;
  }

  try {
    // If the URL is relative, prepend the base URL
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    const loadingTask = pdfjsLib.getDocument(fullUrl);
    const pdf = await loadingTask.promise;
    console.log('PDF loaded successfully');
    
    const page = await pdf.getPage(1);
    console.log('First page retrieved');

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = pdfCanvas.value;
    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext);
    console.log('PDF rendered successfully');
    pdfRendered.value = true;

    const textContent = await page.getTextContent();
    pdfText.value = textContent.items.map(item => item.str).join(' ').substring(0, 500) + '...';
  } catch (err) {
    console.error('Error rendering PDF:', err);
    error.value = `Failed to load PDF preview: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

let renderTimeout;

onMounted(() => {
  console.log('BookPreview component mounted');
  renderTimeout = setTimeout(() => {
    console.log('Initiating PDF render');
    renderPdf(props.book.link);
  }, 100);
});

onUnmounted(() => {
  console.log('BookPreview component unmounted');
  if (renderTimeout) {
    clearTimeout(renderTimeout);
  }
});
</script>