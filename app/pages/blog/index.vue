<template>
    <div>
        <h1>Blog</h1>
    </div>
</template>

<script setup lang="ts"></script>

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
