<template>
  <div class="dashboard">
    <div class="dash-header">
      <h1>Dashboard</h1>
      <button class="secondary" @click="logout">Sign out</button>
    </div>

    <!-- ── new post form ── -->
    <section class="panel new-post">
      <h2>{{ editing ? 'Edit Post' : 'New Post' }}</h2>

      <form @submit.prevent="savePost">
        <div class="field">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="form.title"
            @input="maybeAutoSlug"
            required
          />
        </div>

        <div class="field">
          <label for="slug">Slug (URL)</label>
          <input id="slug" v-model="form.slug" required />
        </div>

        <div class="field">
          <label for="description">Description (optional)</label>
          <input id="description" v-model="form.description" />
        </div>

        <div class="field">
          <label for="body">Body (Markdown)</label>
          <textarea id="body" v-model="form.body" rows="14" required />
        </div>

        <p v-if="formError" class="form-error">{{ formError }}</p>

        <div class="form-actions">
          <button type="submit" :disabled="saving">
            {{ saving ? 'Saving…' : editing ? 'Update post' : 'Publish post' }}
          </button>
          <button v-if="editing" type="button" class="secondary" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </form>
    </section>

    <!-- ── posts list ── -->
    <section class="posts-section">
      <h2>Posts</h2>

      <p v-if="!posts?.length" class="empty">No posts yet.</p>

      <ul v-else class="posts-list">
        <li v-for="post in posts" :key="post.id" class="post-row">
          <div class="post-info">
            <span class="post-title">{{ post.title }}</span>
            <span class="post-slug">/blog/{{ post.slug }}</span>
          </div>
          <div class="post-actions">
            <button class="secondary" @click="startEdit(post)">Edit</button>
            <button class="secondary danger" @click="deletePost(post.id)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const supabase = useSupabaseClient()

// ── posts ──
const { data: posts, refresh } = await useAsyncData('dashboard-posts', async () => {
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, published_at')
    .order('published_at', { ascending: false })
  return data
})

// ── form ──
const blankForm = () => ({ title: '', slug: '', description: '', body: '' })
const form = reactive(blankForm())
const editing = ref<string | null>(null) // post id being edited
const saving = ref(false)
const formError = ref('')
let autoSlugEnabled = true

function maybeAutoSlug() {
  if (!autoSlugEnabled) return
  form.slug = form.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

async function savePost() {
  saving.value = true
  formError.value = ''

  const payload = {
    title: form.title,
    slug: form.slug,
    description: form.description || null,
    body: form.body
  }

  const { error } = editing.value
    ? await supabase.from('posts').update(payload).eq('id', editing.value)
    : await supabase.from('posts').insert(payload)

  saving.value = false

  if (error) {
    formError.value = error.message
  } else {
    Object.assign(form, blankForm())
    editing.value = null
    autoSlugEnabled = true
    await refresh()
  }
}

function startEdit(post: { id: string; title: string; slug: string }) {
  editing.value = post.id
  autoSlugEnabled = false
  // load full post body
  supabase
    .from('posts')
    .select('*')
    .eq('id', post.id)
    .single()
    .then(({ data }) => {
      if (data) Object.assign(form, {
        title: data.title,
        slug: data.slug,
        description: data.description ?? '',
        body: data.body
      })
    })
}

function cancelEdit() {
  editing.value = null
  Object.assign(form, blankForm())
  autoSlugEnabled = true
}

async function deletePost(id: string) {
  if (!confirm('Delete this post?')) return
  await supabase.from('posts').delete().eq('id', id)
  await refresh()
}

async function logout() {
  await supabase.auth.signOut()
  await navigateTo('/')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dash-header h1 {
  margin: 0;
}

.new-post h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.field {
  margin-bottom: 1.25rem;
}

textarea {
  resize: vertical;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.form-error {
  color: #ff6b9d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

/* ── posts list ── */
.posts-section h2 {
  margin-bottom: 1rem;
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.post-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(224, 24, 122, 0.25);
}

.post-row:last-child {
  border-bottom: 1px solid rgba(224, 24, 122, 0.25);
}

.post-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.post-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-slug {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.post-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.danger {
  border-color: rgba(255, 80, 80, 0.5);
  color: #ff8080;
}

.danger:hover {
  border-color: #ff8080;
}

.empty {
  color: var(--color-muted);
}
</style>
