<template>
  <div class="min-h-screen flex flex-col">
    <Header 
      title="Colección de Recursos" 
      subtitle="Explora nuestra colección curada de materiales educativos"
    />
    <TechResources class="flex-grow" />
    <Footer companyName="Recursos Educativos Tech" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import TechResources from './components/TechResources.vue'
import Footer from './components/Footer.vue'
</script>