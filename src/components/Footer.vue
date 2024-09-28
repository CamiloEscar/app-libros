<template>
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ new Date().getFullYear() }} {{ companyName }}. Todos los derechos reservados.</p>
      </div>
    </footer>
  </template>
  
  <script setup>
  defineProps({
    companyName: {
      type: String,
      default: 'Recursos Educativos'
    }
  })
  </script>