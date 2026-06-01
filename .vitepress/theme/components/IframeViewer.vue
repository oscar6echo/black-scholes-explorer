<template>
  <div class="iframe-viewer-container" :class="{ fullscreen: isFullscreen }" ref="containerEl">
    <div class="toolbar">
      <span class="toolbar-title">{{ title }}</span>
      <div class="toolbar-actions">
        <button class="btn" @click="reloadIframe" title="Reload Widget">⟳ Reload</button>
        <button class="btn fs-btn" @click="toggleFullscreen" :title="isFullscreen ? 'Exit Maximize' : 'Maximize to Page'">
          <span v-if="isFullscreen">Exit ⛶</span>
          <span v-else>Maximize ⛶</span>
        </button>
      </div>
    </div>
    <div class="iframe-viewport">
      <iframe 
        ref="iframeEl" 
        :src="withBase(src)" 
        class="iframe-element" 
        :style="{ height: isFullscreen ? '100%' : height }" 
        scrolling="no" 
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  src: { type: String, required: true },
  height: { type: String, default: '500px' },
  title: { type: String, default: 'Interactive Widget' }
})

const isFullscreen = ref(false)
const containerEl = ref(null)
const iframeEl = ref(null)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden' // prevent outer page scrolling
  } else {
    document.body.style.overflow = ''
  }
}

function reloadIframe() {
  if (iframeEl.value) {
    iframeEl.value.src = withBase(props.src)
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.iframe-viewer-container {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.iframe-viewer-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  margin: 0;
  border: none;
  background: #0f172a;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
  flex-shrink: 0;
}

.toolbar-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.btn {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  font-family: inherit;
  transition: all 0.15s ease-in-out;
}

.btn:hover {
  background: #334155;
  border-color: #38bdf8;
  color: #38bdf8;
}

.iframe-viewport {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #0f172a;
}

.iframe-element {
  width: 100%;
  display: block;
  transition: height 0.25s ease-in-out;
  background: transparent;
}
</style>
