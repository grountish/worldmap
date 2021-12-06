<template>
  <div class="flex flex-col items-center justify-end space-y-4">
    <figure class="relative" aria-hidden="true">
      <slot />

      <transition-group
        v-bind="transitions.notification" tag="div"
        :class="[
          // 'absolute inset-0 grid items-end content-end w-full grid-cols-4 gap-x-1 gap-y-2', // with grid
          'absolute inset-0 top-auto flex flex-wrap-reverse justify-center mx-auto w-full gap-1', // with flexbox
        ]"
      >
        <p v-for="i in item.count" :key="i" class="text-5xl">{{ item.icon }}</p>
      </transition-group>
    </figure>

    <p class="max-w-full text-lg text-center whitespace-nowrap">{{ item.label }}</p>
  </div>
</template>

<script>
import { transitions } from '~/mixins/Transitions'

export default {
  name: 'GuardsExpense',
  mixins: [transitions],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
