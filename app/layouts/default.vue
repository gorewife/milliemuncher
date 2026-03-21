<template>
  <div class="site">
    <ShaderBackground />
    <div class="crt" aria-hidden="true" />
    <header class="site-header">
      <div class="container">
        <NuxtLink to="/" class="brand">Miwwiemunchaaa</NuxtLink>
        <nav>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/gallery">Gallery</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard">Dashboard</NuxtLink>
        </nav>
      </div>
    </header>

    <div class="site-marquee">
      <div class="marquee-track">
        <span class="marquee-content">{{ marqueeText }}</span>
        <span class="marquee-content" aria-hidden="true">{{ marqueeText }}</span>
      </div>
    </div>

    <main class="site-main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ year }} hystericca. All rights reserved bitch</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const user = useSupabaseUser()
const marqueeText =
  '✦ I hate you fuck you ✦ check the gallery ✦ miwwiemunchaaa ✦ they/them btw ✦ this is the best motherfucking website ✦ have you checked out the gallery yet? ✦\u00a0'
</script>

<style scoped>
/* ── crt overlay ── */
.crt {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.06) 3px,
    rgba(0, 0, 0, 0.06) 4px
  );
}

.crt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 55%,
    rgba(0, 0, 0, 0.45) 100%
  );
}

/* ── layout ── */
.site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: var(--border);
  background: var(--color-panel);
  backdrop-filter: blur(12px);
  padding: 0.75rem 0;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.6rem;
  color: var(--color-accent);
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.5rem;
  border: 2px solid transparent;
  transition:
    border-color 0.1s,
    color 0.1s;
}

nav a:hover,
nav a.router-link-active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* ── marquee ── */
.site-marquee {
  background: var(--color-accent);
  color: #fff;
  font-size: 1rem;
  padding: 0.2rem 0;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 18s linear infinite;
}

.marquee-content {
  white-space: nowrap;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ── main ── */
.site-main {
  flex: 1;
  padding: 2rem 0;
}

/* ── footer ── */
.site-footer {
  border-top: var(--border);
  background: var(--color-panel);
  backdrop-filter: blur(12px);
  padding: 1rem 0;
  font-size: 0.85rem;
  color: var(--color-muted);
  text-align: center;
}
</style>
