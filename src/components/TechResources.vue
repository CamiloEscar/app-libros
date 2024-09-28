<template>
  <main class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading resources...</p>
    </div>
    
    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
    </div>
    
    <div v-if="!loading && !error">
      <!-- Search bar and filters -->
      <div class="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input 
          v-model="searchTerm"
          type="text" 
          placeholder="Search resources..." 
          class="flex-grow p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @input="resetPagination"
        >
        <select 
          v-model="filter"
          class="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @change="resetPagination"
        >
          <option value="">All tags</option>
          <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <!-- Resource cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BookCard
          v-for="resource in paginatedResources"
          :key="resource.slug"
          :resource="resource"
          @book-selected="showBookPreview"
        />
      </div>

      <!-- Load more button -->
      <div v-if="hasMoreResources" class="mt-8 text-center">
        <button 
          @click="loadMore" 
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Load more
        </button>
      </div>
    </div>

    <!-- Book Preview Modal -->
    <BookPreview
      v-if="selectedBook"
      :book="selectedBook"
      @close="closeBookPreview"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookCard from './BookCard.vue'
import BookPreview from './BookPreview.vue'

const resources = ref([])
const loading = ref(true)
const error = ref(null)
const searchTerm = ref('')
const filter = ref('')
const page = ref(1)
const resourcesPerPage = 9
const selectedBook = ref(null)

const loadResources = async () => {
  try {
    const response = await fetch('/tech-resources-database.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    resources.value = data.educationalResources
    loading.value = false
  } catch (e) {
    console.error('Error loading resources:', e)
    error.value = e.message
    loading.value = false
  }
}

onMounted(loadResources)

const filteredResources = computed(() => 
  resources.value.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    (filter.value === '' || resource.tags.includes(filter.value))
  )
)

const paginatedResources = computed(() => 
  filteredResources.value.slice(0, page.value * resourcesPerPage)
)

const hasMoreResources = computed(() => 
  paginatedResources.value.length < filteredResources.value.length
)

const uniqueTags = computed(() => 
  [...new Set(resources.value.flatMap(resource => resource.tags))]
)

const loadMore = () => {
  page.value++
}

const resetPagination = () => {
  page.value = 1
}

const showBookPreview = (book) => {
  console.log('Showing book preview:', book)
  selectedBook.value = { ...book }
}

const closeBookPreview = () => {
  console.log('Closing book preview')
  selectedBook.value = null
}
</script>