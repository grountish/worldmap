<!-- eslint-disable-next-line -->
<template>
  <canvas ref="canvas" />
</template>

<script>
const defaultConfig = {
  defaultSize: 48,
  defaultDropRate: 2,
  particlesPerFrame: 0.05,
  particles: [{
    type: 'image',
    url: 'https://cdn.sanity.io/images/m76cfcma/production/dfcd419a5f472190fcf82ff84c77da682a212216-715x528.svg',
  }],
}

export default {
  name: 'ConfettiRain',
  mounted () {
    this.start()
  },
  beforeDestroy () {
    this.stop()
  },
  methods: {
    start () {
      const canvas = this.$refs.canvas

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      this.$confetti.start({ ...defaultConfig, canvasElement: canvas })
    },
    stop () {
      this.$confetti.stop()
    },
  },
}
</script>
