<template>
    <div>
        <ul class="masonry">
            <li v-for="item in items" :key="item.slug" @click="open(item)">
                <NuxtImg :src="item.image" :alt="item.artist" width="400" />
            </li>
        </ul>

        <dialog ref="dialog" @click.self="close">
            <NuxtImg
                v-if="selected"
                :src="selected.image"
                :alt="selected.artist"
            />
            <h1>{{ selected?.artist }}</h1>
            <p>{{ selected?.description }}</p>
            <button @click="close">Close</button>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import type { GalleryItem } from '~/utils/gallery'

const items = galleryItems
const selected = ref<GalleryItem | null>(null)
const dialog = useTemplateRef<HTMLDialogElement>('dialog')

function open(item: GalleryItem) {
    selected.value = item
    dialog.value?.showModal()
}

function close() {
    dialog.value?.close()
    selected.value = null
}
</script>

<style scoped>
.masonry {
    columns: 3 200px;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
}

.masonry li {
    break-inside: avoid;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

.masonry img {
    display: block;
    width: 100%;
}
</style>
