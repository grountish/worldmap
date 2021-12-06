<template>
  <div ref="input" class="overflow-hidden" :style="{height:duration}">
    <NuxtLink v-if="showNext" class="fixed top-3/4 left-3/4 text-2xl p-4 border border-black" to="/exhibits">
      <h1>Next Chapter</h1>
    </NuxtLink>
    <video ref="video" :class="['fixed inset-0 w-full h-full -z-10', 'object-cover', ]" :src="vid" muted loop playsinline />
  </div>
</template>

<script>
export default {
  name: 'NavComp',
  props: {
    vid: {
      type: String,
      required: true,
    },
  },
  data: () => ({ duration: '', showNext: false }),
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.$refs.video.addEventListener('loadedmetadata', () => {
      this.duration = this.$refs.video.duration * 400 + 'px'
    })
  },
  methods: {
    handleScroll (event) {
      window.requestAnimationFrame(() => {
        this.$refs.video.currentTime = event.target.scrollingElement.scrollTop / 400
        event.target.scrollingElement.scrollTop > 5400 ? this.showNext = true : this.showNext = false
      })
    },
  },
}
</script>
