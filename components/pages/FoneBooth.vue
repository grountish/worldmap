<template>
  <div
    class="group relative flex flex-col lg:justify-center lg:items-center py-1.5 cursor-pointer group px-9 bg-accent-blue"
    @click="playPhone(item)"
  >
    <slot />

    <BaseButton
      :class="[
        'mt-1.5 -mb-1.5 -mx-9',
        'lg:absolute lg:m-auto',
        currentState === 'play' ? 'lg:opacity-100' : 'lg:opacity-0',
        'group-hover:opacity-100 transition-opacity'
      ]"
      variant="primary"
    >
      <span class="block lg:hidden">{{ currentState === 'play' ? 'Tap to pause': 'Tap to listen' }}</span>
      <span class="hidden lg:block ">{{ currentState === 'play' ? 'Click to pause': 'Click to listen' }}</span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'FoneBooth',
  props: {
    item: {
      type: String,
      required: true,
    },
  },
  data: () => ({ audio: null, currentState: false }),
  watch: {
    item: {
      immediate: true,
      handler (newValue) {
        if (!process.client || !newValue) { return }
        this.audio = new Audio(newValue)
        this.removeEventsBinding(this.audio)
        this.audio.addEventListener('play', this.handlePlaybackChange)
        this.audio.addEventListener('pause', this.handlePlaybackChange)
        this.audio.addEventListener('ended', this.handlePlaybackChange)
      },
    },
  },
  beforeDestroy () {
    this.removeEventsBinding(this.audio)
  },
  methods: {
    playPhone (phone) {
      if (!this.audio) { return }
      this.audio[this.currentState === 'play' ? 'pause' : 'play']()
    },
    handlePlaybackChange ($event) {
      this.currentState = $event.type
    },
    removeEventsBinding (audio) {
      audio.removeEventListener('play', this.handlePlaybackChange)
      audio.removeEventListener('pause', this.handlePlaybackChange)
      audio.removeEventListener('ended', this.handlePlaybackChange)
    },
  },
}
</script>
