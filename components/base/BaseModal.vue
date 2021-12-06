<template>
  <transition @enter="enter">
    <div
      v-if="isVisible"
      ref="modal"
      class="fixed inset-0 bottom-0 z-50 sm:flex sm:items-center sm:justify-center"
      tabindex="-1"
      @keydown.esc="closeModal"
    >
      <div class="absolute inset-0 z-0 flex w-full h-full">
        <transition v-bind="transitions.fade">
          <button v-if="isSlotVisible" class="flex-1 bg-opacity-50 bg-primary-1" aria-label="Close Modal" tabindex="-1" @click="closeModal" />
        </transition>
      </div>

      <div class="relative z-10 flex flex-col items-center w-full max-h-full m-auto pointer-events-none">
        <transition v-bind="transitions.modal">
          <slot v-if="isSlotVisible" :closeModal="closeModal" />
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { transitions } from '~/mixins/Transitions'

export default {
  name: 'BaseModal',
  mixins: [transitions],
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      isSlotVisible: false,
    }
  },
  methods: {
    closeModal () {
      this.isSlotVisible = false
      // TODO: Fix using magic number from transition classes
      setTimeout(() => this.$emit('close'), 200)
    },
    enter (el, done) {
      this.isSlotVisible = true
      this.$refs.modal && this.$refs.modal.focus()
      done()
    },
  },
}
</script>
