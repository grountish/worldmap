<template>
  <div class="flex flex-col">
    <div class="flex flex-col flex-grow shadow-lg rounded-xl">
      <div class="flex flex-col flex-grow rounded-xl ring-1 ring-black ring-opacity-5">
        <div
          class="grid items-center gap-6 px-4 py-2 rounded-t-xl bg-gradient-to-b from-primary-6 to-primary-7"
          style="grid-template-columns: 1fr minmax(min-content, 640px) 1fr;"
        >
          <div class="flex space-x-1.5">
            <div class="w-3 h-3 rounded-full bg-primary-3" />
            <div class="w-3 h-3 rounded-full bg-primary-3" />
            <div class="w-3 h-3 rounded-full bg-primary-3" />
          </div>
          <div class="overflow-hidden border rounded-md shadow-sm border-primary-8 border-opacity-5">
            <div class="bg-gradient-to-b from-primary-0 to-primary-1 text-sm py-1.5 text-center leading-none cursor-default">{{ host }}</div>
          </div>
        </div>
        <div class="relative flex-grow bg-primary-1 rounded-b-xl" :class="'aspect-w-3 aspect-h-4 lg:aspect-w-16 lg:aspect-h-9 overflow-hidden'">
          <iframe class="absolute inset-0 w-full h-full rounded-inherit" :src="url" frameborder="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBrowser',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    host () {
      return new URL(this.url).host
    },
  },
}
</script>
