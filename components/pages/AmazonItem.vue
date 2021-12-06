<template>
  <component :is="tag" class="grid items-end grid-cols-2 gap-3 text-left lg:grid-cols-1 lg:text-center">
    <SanityImage
      v-if="item.image"
      v-bind="{
        w: 360, h: 360,
        class: 'w-full h-auto',
        assetId: item.image.asset._ref,
        auto: 'format',
        fit: 'crop',
        alt: item.title,
        // crop: 'entropy',
      }"
    />

    <div class="space-y-4 lg:space-y-6">
      <div class="space-y-2">
        <p class="leading-tight ">{{ item.title }}</p>
        <p class="font-bold leading-tight">{{ item.price|currency({ minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</p>
      </div>
      <div class="flex justify-start -space-x-px text-accent-red lg:justify-center">
        <button
          class="px-4 py-2 font-bold border lg:px-8 lg:py-4 border-accent-red hover:bg-accent-red focus:bg-accent-red hover:text-white focus:text-white focus:outline-none"
          @click="count && count--"
        >
          -
        </button>
        <input
          v-model="count" class="w-16 px-2 py-2 pr-0 text-center border lg:w-20 lg:pr-0 lg:px-4 lg:py-4 border-accent-red focus:outline-none"
          type="number" min="0"
        >
        <button
          class="px-4 py-2 font-bold border lg:px-8 lg:py-4 border-accent-red hover:bg-accent-red focus:bg-accent-red hover:text-white focus:text-white focus:outline-none"
          @click="count++"
        >
          +
        </button>
      </div>
    </div>

    </li>
  </component>
</template>

<script>
export default {
  name: 'AmazonItem',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({ count: 0 }),
  watch: {
    count (newValue, oldValue) {
      this.$emit('update', [this.item._key, newValue])
    },
  },
}
</script>
