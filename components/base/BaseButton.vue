<template functional>
  <span
    class="inline-flex focus:outline-none"
    :class="[props.isDisabled && 'opacity-50 cursor-not-allowed', props.isLoading && 'cursor-wait', data.class, data.staticClass]"
  >
    <component
      :is="props.to ? props.to.includes('//') ? 'a' : 'NuxtLink' : 'button'"
      v-bind="props.to ? props.to.includes('//') ? {
        href: props.to || '/',
        target: '_blank',
      } : {
        to: props.to || '/',
      } : {}"

      :class="[
        'group',
        'flex justify-center items-center w-full',
        props.size === 'md' && 'px-3 py-4',
        props.variant === 'primary' && 'bg-accent-green border-accent-green',
        props.variant === 'secondary' && 'bg-transparent border-current',
        'border text-2xl font-bold no-underline',
        'focus:outline-none focus:shadow-outline',
      ]"

      v-on="listeners"
    >
      <span v-if="slots().iconLeft" class="flex items-center w-20 h-20 mr-10">
        <slot name="iconLeft" />
      </span>

      <slot name="default" />

      <span v-if="slots().iconRight" class="flex items-center w-20 h-20 ml-10">
        <slot name="iconRight" />
      </span>
    </component>
  </span>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    to: {
      type: String,
      required: false,
      default: null,
    },
    variant: {
      type: String,
      required: false,
      default: 'secondary',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    // type: {
    //   type: String,
    //   required: false,
    //   default: 'button',
    // },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
