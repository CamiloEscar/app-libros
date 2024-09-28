<template>
    <div 
      class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      @click="$emit('book-selected', resource)"
    >
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <img
          v-if="imageLoaded"
          :src="resource.link"
          :alt="resource.title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        >
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-300">
          <span class="text-gray-600 text-lg font-semibold">{{ resource.title }}</span>
        </div>
      </div>
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2 text-gray-800">{{ resource.title }}</h2>
        <p class="text-sm text-gray-600 mb-4">{{ resource.type }} - {{ resource.language }}</p>
        <div class="mb-4 flex flex-wrap">
          <span 
            v-for="tag in resource.tags" 
            :key="tag"
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <p v-if="resource.date" class="text-sm text-gray-500 mb-4">Date: {{ formatDate(resource.date) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    resource: {
      type: Object,
      required: true
    }
  });
  
  const imageLoaded = ref(true);
  
  const handleImageError = () => {
    imageLoaded.value = false;
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  </script>