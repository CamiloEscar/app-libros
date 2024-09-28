<template>
    <header class="relative bg-blue-600 text-white py-16 overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl font-bold mb-2">{{ title }}</h1>
        <p class="text-xl">{{ subtitle }}</p>
      </div>
      <div class="absolute inset-0 overflow-hidden">
        <div class="book-animation"></div>
      </div>
    </header>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .book-animation {
    position: absolute;
    width: 100px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    top: -75px;
    left: -50px;
    transform: rotate(45deg);
    animation: float 6s ease-in-out infinite;
  }
  
  .book-animation::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  @keyframes float {
    0% {
      transform: rotate(45deg) translate(0, 0);
    }
    50% {
      transform: rotate(45deg) translate(20px, -20px);
    }
    100% {
      transform: rotate(45deg) translate(0, 0);
    }
  }
  </style>