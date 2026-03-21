<template>
    <div
        class="card-scene"
        ref="scene"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
    >
        <div class="card" :style="cardStyle">
            <img src="/card.png" alt="Millie card" draggable="false" />
        </div>

        <Transition name="tooltip">
            <div v-if="hovered" class="tooltip">
                <slot>
                    <p class="tooltip-name">Millie</p>
                    <hr class="tooltip-divider" />
                    <p class="tooltip-desc">
                        This joker gains +1 Mult and +15 Chips every time
                        they/them pronouns are used correctly. 1 out of 1000
                        chance to fall asleep.
                    </p>
                    <p class="tooltip-flavour">
                        "they're kinda gay and filipino"
                    </p>
                </slot>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useMouseInElement, useElementBounding, useRafFn } from '@vueuse/core'

const scene = useTemplateRef<HTMLElement>('scene')
const hovered = ref(false)

const { elementX, elementY, elementWidth, elementHeight } =
    useMouseInElement(scene)
const { x: cardX, width: cardW } = useElementBounding(scene)

// lerped state
const rotX = ref(0)
const rotY = ref(0)
const scale = ref(1)
const bobY = ref(0)
const bobRot = ref(0)
let time = 0

useRafFn(({ delta }) => {
    time += delta / 1000

    if (hovered.value) {
        const cx = elementWidth.value / 2
        const cy = elementHeight.value / 2
        const targetRX = ((elementY.value - cy) / cy) * -14
        const targetRY = ((elementX.value - cx) / cx) * 14

        rotX.value += (targetRX - rotX.value) * 0.12
        rotY.value += (targetRY - rotY.value) * 0.12
        scale.value += (1.08 - scale.value) * 0.14
        bobY.value += (0 - bobY.value) * 0.1
        bobRot.value += (0 - bobRot.value) * 0.1
    } else {
        rotX.value += (0 - rotX.value) * 0.08
        rotY.value += (0 - rotY.value) * 0.08
        scale.value += (1 - scale.value) * 0.1
        bobY.value = Math.sin(time * 1.6) * 8
        bobRot.value = Math.sin(time * 1.6) * 1.5
    }
})

const cardStyle = computed(() => {
    const cardCenterX = cardX.value + cardW.value / 2
    const vpCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const shadowX = ((cardCenterX - vpCenterX) / (vpCenterX || 1)) * -18
    const shadowY = hovered.value ? 18 : 12

    return {
        transform: `translateY(${bobY.value}px) rotate(${bobRot.value}deg) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg) scale(${scale.value})`,
        boxShadow: `${shadowX}px ${shadowY}px 0px rgba(0,0,0,0.85)`
    }
})

function onEnter() {
    hovered.value = true
}
function onLeave() {
    hovered.value = false
}
</script>

<style scoped>
.card-scene {
    perspective: 700px;
    display: inline-block;
    position: relative;
}

.card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    will-change: transform;
    cursor: pointer;
}

.card img {
    display: block;
    width: 260px;
    height: auto;
    user-select: none;
}

/* ── tooltip ── */
.tooltip {
    position: absolute;
    top: 0;
    right: calc(100% + 16px);
    width: 200px;
    background: #323c4c;
    border-radius: 6px;
    padding: 0.6rem 0.75rem;
    pointer-events: none;
    z-index: 20;
    font-family: 'Arvo', serif;
    filter: drop-shadow(0px 4px 0px #000000ba);
    outline: 2px solid #4a5568;
}

.tooltip-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #f0e060;
    margin-bottom: 0.4rem;
}

.tooltip-divider {
    border: none;
    border-top: 2px solid #4a5568;
    margin: 0.3rem 0;
}

.tooltip-desc {
    font-size: 0.72rem;
    color: #d0d8e8;
    line-height: 1.5;
    margin-bottom: 0.4rem;
}

.tooltip-flavour {
    font-size: 0.68rem;
    color: #8898aa;
    font-style: italic;
}

.tooltip-enter-active,
.tooltip-leave-active {
    transition:
        opacity 0.12s,
        translate 0.12s;
}

.tooltip-enter-from,
.tooltip-leave-to {
    opacity: 0;
    translate: 6px 0;
}
</style>
