<template>
    <div>
        <p>Logging in...</p>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(
    user,
    () => {
        if (user.value) {
            return navigateTo('/dashboard')
        }
    },
    { immediate: true }
)
</script>
