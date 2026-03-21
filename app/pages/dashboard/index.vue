<template>
    <div class="dashboard">
        <NuxtLink to="/dashboard/new">Write New Post</NuxtLink>
        <NuxtLink to="/dashboard/upload">Upload Photo to Gallery</NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
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
