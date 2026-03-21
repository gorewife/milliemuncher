<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref } from 'vue'

const text = ref('')
definePageMeta({
    middleware: 'auth'
})
</script>
<template>
    <div class="new-post">
        <form>
            <input type="text" required placeholder="Title" />
            <input type="text" placeholder="Subtitle" />
            <input type="text" placeholder="Tags" />
            <button type="submit">Publish</button>
        </form>
        <MdEditor v-model="text" />
    </div>
</template>
