<template>
  <div class="bg-gray-900 text-white min-h-screen p-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Form Column -->
      <form @submit.prevent="submitPost" class="space-y-4">
        <!-- Title Input -->
        <div>
          <label class="block text-sm font-semibold mb-1">Title</label>
          <input
            v-model="newPost.title"
            type="text"
            class="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            placeholder="Post title"
            required
          />
        </div>

        <!-- Content Input -->
        <div>
          <label class="block text-sm font-semibold mb-1">Content</label>
          <textarea
            v-model="newPost.content"
            rows="4"
            class="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            placeholder="Write something..."
            required
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 transition"
        >
          Submit Post
        </button>
      </form>

      <!-- Blog Posts Column -->
      <div>
        <h1 class="text-3xl font-bold mb-6">Blog Posts</h1>
        <ul>
          <li v-for="post in posts" :key="post.id" class="mb-6 border-b border-gray-700 pb-4">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
            <p class="text-gray-400">{{ post.content }}</p>
            <button
              @click="deletePost(post.id)"
              class="mt-2 text-sm text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const posts = ref([])
const loading = ref(true)

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://api.simostack.com/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
}
const deletePost = async (id) => {
  try {
    await axios.delete(`https://api.simostack.com/posts/${id}`)
    fetchPosts() // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}
onMounted(fetchPosts)
const newPost = ref({
  title: '',
  content: '',
})

const submitPost = async () => {
  if (!newPost.value.title || !newPost.value.content) return

  try {
    await axios.post('https://api.simostack.com/posts', newPost.value)
    newPost.value.title = ''
    newPost.value.content = ''
    fetchPosts() // refresh list
  } catch (error) {
    console.error('Error submitting post:', error)
  }
}
</script>
