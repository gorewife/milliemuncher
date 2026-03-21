<template>
    <div class="home">
        <section class="hero">
            <BalatroCard />
            <p class="counter-label">
                <span class="counter-number">{{ count }}</span>
                {{ count === 1 ? 'person has' : 'people have' }} visited this
                page
            </p>
        </section>

        <section class="insult-section">
            <button @click="randomInsult">say something mean to me</button>
            <p v-if="pressed" class="insult">{{ insult }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const { data } = await useAsyncData('visitor-count', async () => {
    if (!import.meta.server && localStorage.getItem('visited')) {
        return $fetch<{ count: number }>('/api/counter')
    }
    if (!import.meta.server) {
        localStorage.setItem('visited', '1')
    }
    return $fetch<{ count: number }>('/api/counter', { method: 'POST' })
})

const count = computed(() => data.value?.count ?? 0)

// if you're reading this ur gay
const insults = [
    'you pronounce gif wrong',
    "you've never finished a side project",
    'you type with two fingers',
    'idk what to put here',
    'hi',
    'if you died it would mean nothing to me'
]

const pressed = ref(false)
const insult = ref('')

function randomInsult() {
    pressed.value = true
    let next: string
    do {
        next = insults[Math.floor(Math.random() * insults.length)]!
    } while (next === insult.value)
    insult.value = next
}

// ── tab title ──
const defaultTitle = 'miwwiemunchaaa'
const awayMessages = ['hey. hey. hey.', 'come back bitch', 'where did you go']

useEventListener(document, 'visibilitychange', () => {
    document.title = document.hidden
        ? awayMessages[Math.floor(Math.random() * awayMessages.length)]!
        : defaultTitle
})
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
}

.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.insult-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}
</style>
