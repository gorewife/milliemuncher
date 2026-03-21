<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

definePageMeta({ middleware: 'auth' })

const title = ref('')
const subtitle = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

function addTag() {
    const val = tagInput.value.trim().replace(/,+$/, '')
    if (val && !tags.value.includes(val)) tags.value.push(val)
    tagInput.value = ''
}

function removeTag(i: number) {
    tags.value.splice(i, 1)
}

function onTagKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        addTag()
    } else if (
        e.key === 'Backspace' &&
        tagInput.value === '' &&
        tags.value.length
    ) {
        tags.value.pop()
    }
}

const editor = useEditor({
    extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: 'write something...' })
    ]
})

function setLink() {
    const url = window.prompt('URL')
    if (!url) return
    editor.value?.chain().focus().setLink({ href: url }).run()
}

onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
    <div class="new-post container">
        <form @submit.prevent>
            <div class="fields">
                <input
                    v-model="title"
                    type="text"
                    required
                    placeholder="Title"
                />
                <input v-model="subtitle" type="text" placeholder="Subtitle" />
                <div class="tags-field">
                    <span v-for="(tag, i) in tags" :key="tag" class="tag-chip">
                        {{ tag
                        }}<button
                            type="button"
                            class="tag-remove"
                            @click="removeTag(i)"
                        >
                            ×
                        </button>
                    </span>
                    <input
                        v-model="tagInput"
                        type="text"
                        placeholder="Add tag…"
                        class="tag-input"
                        @keydown="onTagKeydown"
                        @blur="addTag"
                    />
                </div>
            </div>

            <div class="editor-wrap panel">
                <div v-if="editor" class="toolbar">
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('bold') }"
                        @click="editor.chain().focus().toggleBold().run()"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('italic') }"
                        @click="editor.chain().focus().toggleItalic().run()"
                    >
                        <em>I</em>
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{
                            active: editor.isActive('heading', { level: 2 })
                        }"
                        @click="
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        "
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{
                            active: editor.isActive('heading', { level: 3 })
                        }"
                        @click="
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        "
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('bulletList') }"
                        @click="editor.chain().focus().toggleBulletList().run()"
                    >
                        &bull;
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('orderedList') }"
                        @click="
                            editor.chain().focus().toggleOrderedList().run()
                        "
                    >
                        1.
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('blockquote') }"
                        @click="editor.chain().focus().toggleBlockquote().run()"
                    >
                        "
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('link') }"
                        @click="setLink"
                    >
                        link
                    </button>
                    <button
                        type="button"
                        class="tool"
                        :class="{ active: editor.isActive('code') }"
                        @click="editor.chain().focus().toggleCode().run()"
                    >
                        code
                    </button>
                </div>

                <EditorContent class="editor" :editor="editor" />
            </div>

            <div class="actions">
                <NuxtLink to="/dashboard" class="cancel-link">Cancel</NuxtLink>
                <button type="submit">Publish</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.new-post {
    padding-top: 2rem;
    padding-bottom: 4rem;
}

.fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}

.tags-field {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(224, 24, 122, 0.4);
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    transition: border-color 0.15s;
}

.tags-field:focus-within {
    border-color: var(--color-accent-2);
}

.tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.1rem 0.4rem;
    font-size: 0.8rem;
    color: var(--color-muted);
}

.tag-remove {
    background: none;
    border: none;
    color: var(--color-muted);
    padding: 0;
    line-height: 1;
    cursor: pointer;
    transition: opacity 0.15s;
    min-width: unset;
    border-radius: 0;
}

.tag-remove:hover {
    opacity: 0.6;
}

.tag-input {
    flex: 1;
    min-width: 80px;
    background: transparent;
    border: none;
    padding: 0.1rem 0;
    font-size: 0.95rem;
    outline: none;
}

.editor-wrap {
    padding: 0;
    overflow: hidden;
}

.toolbar {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid rgba(224, 24, 122, 0.3);
    flex-wrap: wrap;
}

.tool {
    background: transparent;
    border: none;
    color: var(--color-muted);
    padding: 0.2rem 0.4rem;
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
    transition: color 0.15s;
}

.tool:hover {
    color: var(--color-text);
    opacity: 1;
}

.tool.active {
    color: var(--color-accent);
}

.editor :deep(.ProseMirror) {
    min-height: 320px;
    padding: 1.25rem 1.5rem;
    outline: none;
    line-height: 1.6;
}

.editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    color: var(--color-muted);
    pointer-events: none;
    float: left;
    height: 0;
}

.editor :deep(.ProseMirror h2),
.editor :deep(.ProseMirror h3) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
}

.editor :deep(.ProseMirror a) {
    color: var(--color-accent);
}

.editor :deep(.ProseMirror blockquote) {
    border-left: 3px solid var(--color-accent);
    margin-left: 0;
    padding-left: 1rem;
    color: var(--color-muted);
}

.editor :deep(.ProseMirror code) {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.1em 0.3em;
    border-radius: 4px;
    font-size: 0.9em;
}

.editor :deep(.ProseMirror pre) {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(224, 24, 122, 0.3);
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
}

.editor :deep(.ProseMirror pre code) {
    background: none;
    padding: 0;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.25rem;
}

.cancel-link {
    font-size: 0.9rem;
    color: var(--color-muted);
    text-decoration: none;
    transition: color 0.15s;
}

.cancel-link:hover {
    color: var(--color-text);
}
</style>
