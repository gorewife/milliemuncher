<template>
  <canvas ref="canvas" class="shader-bg" />
</template>

<script setup lang="ts">
import { fragmentShader, vertexShader } from '~/utils/shader.glsl'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const el = canvas.value!
  const gl = el.getContext('webgl')
  if (!gl) return

  function compile(type: number, src: string) {
    const shader = gl!.createShader(type)!
    gl!.shaderSource(shader, src)
    gl!.compileShader(shader)
    return shader
  }

  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader))
  gl.linkProgram(program)
  gl.useProgram(program)

  // fullscreen quad
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const uTime = gl.getUniformLocation(program, 'iTime')
  const uRes = gl.getUniformLocation(program, 'iResolution')

  let raf: number
  const start = performance.now()

  function resize() {
    el.width = window.innerWidth
    el.height = window.innerHeight
    gl!.viewport(0, 0, el.width, el.height)
  }

  function draw() {
    gl!.uniform1f(uTime, (performance.now() - start) / 1000)
    gl!.uniform2f(uRes, el.width, el.height)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    raf = requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  resize()
  draw()

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.shader-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
