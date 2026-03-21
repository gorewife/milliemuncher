<template>
  <div>
    <h1>Blog</h1>

    <ul v-if="posts?.length" class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <NuxtLink :to="`/blog/${post.slug}`" class="post-link">
          <span class="post-title">{{ post.title }}</span>
          <span v-if="post.description" class="post-description">{{ post.description }}</span>
          <time v-if="post.published_at" class="post-date">{{ formatDate(post.published_at) }}</time>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="empty">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: posts } = await useAsyncData('blog-list', async () => {
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, description, published_at')
    .order('published_at', { ascending: false })
  return data
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
h1 {
  margin-bottom: 2.5rem;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.post-item {
  border-top: 1px solid var(--color-border);
}

.post-item:last-child {
  border-bottom: 1px solid var(--color-border);
}

.post-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem 0;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.15s;
}

.post-link:hover {
  opacity: 0.7;
}

.post-title {
  font-size: 1.15rem;
  font-weight: 600;
}

.post-description {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.post-date {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.empty {
  color: var(--color-muted);
}
</style>
