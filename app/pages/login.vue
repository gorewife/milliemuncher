<template>
    <div class="login-wrap">
        <div class="panel login-box">
            <h1>Login</h1>

            <form @submit.prevent="login">
                <div class="field">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        autocomplete="email"
                        required
                    />
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        required
                    />
                </div>

                <p v-if="error" class="error">{{ error }}</p>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Signing in…' : 'Sign in' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
    loading.value = true
    error.value = ''
    const { error: err } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    loading.value = false
    if (err) {
        error.value = err.message
    } else {
        await navigateTo('/dashboard')
    }
}
</script>

<style scoped>
.login-wrap {
    display: flex;
    justify-content: center;
    padding-top: 4rem;
}

.login-box {
    width: 100%;
    max-width: 420px;
}

h1 {
    margin-top: 0;
    margin-bottom: 1.75rem;
    font-size: 1.6rem;
}

.field {
    margin-bottom: 1.25rem;
}

button {
    width: 100%;
    margin-top: 0.5rem;
}

.error {
    color: #ff6b9d;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
}
</style>
