<template>
  <div class="container flex items-center justify-center py-6">
    <SanityContent class="max-w-2xl mx-auto text-center" :blocks="blocks" />
  </div>
</template>

<script>
export default {
  name: 'SiteBanner',
  props: {
    blocks: {
      type: [Array, Object],
      required: true,
    },
  },
}
</script>
