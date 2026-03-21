<template>
    <div>
        <button v-if="!user" @click="signInWithOAuth">
            Sign in with GitHub
        </button>
        <button v-else @click="signOut">Sign out</button>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/confirm'
        }
    })
    if (error) console.log(error)
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
    await navigateTo('/login')
}

const user = useSupabaseUser()
</script>

<style scoped></style>
