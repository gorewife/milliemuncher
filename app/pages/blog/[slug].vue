<template></template>

<script setup lang="ts"></script>

<style scoped>
.post-header {
    margin-bottom: 2.5rem;
}

.back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--color-muted);
    text-decoration: none;
    transition: color 0.15s;
}

.back-link:hover {
    color: var(--color-text);
}

.post-date {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-muted);
}

.not-found {
    color: var(--color-muted);
}

.prose :deep(h2),
.prose :deep(h3) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
}

.prose :deep(p) {
    margin-bottom: 1rem;
}

.prose :deep(a) {
    color: var(--color-accent);
}

.prose :deep(code) {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.1em 0.3em;
    border-radius: 4px;
    font-size: 0.9em;
}

.prose :deep(pre) {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(224, 24, 122, 0.3);
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
}

.prose :deep(pre code) {
    background: none;
    padding: 0;
}

.prose :deep(blockquote) {
    border-left: 3px solid var(--color-accent);
    margin-left: 0;
    padding-left: 1rem;
    color: var(--color-muted);
}

.prose :deep(hr) {
    border: none;
    border-top: 1px solid rgba(224, 24, 122, 0.3);
    margin: 2rem 0;
}
</style>
