<template>
  <div
    :class="[
      type === 'bar' && 'flex overflow-hidden text-black bg-black bg-opacity-20',
      type === 'ring' && 'relative inline-flex items-center justify-center',
    ]"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
    role="progressbar"
  >
    <div
      v-if="type === 'bar'"
      :class="['flex justify-center items-center', 'bg-current', 'transition-all duration-500 ease-in-out']"
      :style="{ width: `${percentage}%`, height: `${1 / 16 * strokeWidth}rem` }"
    />

    <svg v-else-if="type === 'ring'" class="w-full" :viewBox="`0 0 ${size} ${size}`">
      <circle class="text-black stroke-current text-opacity-20" v-bind="{ ...ringStylesCommon }" />
      <circle class="text-black text-opacity-100 stroke-current" v-bind="{ ...ringStylesCommon, ...ringStyles }" />
    </svg>

    <!-- TODO: Add support for `:indeterminate` when no value is provided. Should probably animate -->
    <span class="text-center text-white whitespace-no-wrap select-none sr-only">
      <slot>{{ value ? $options.filters.percent(value) : ':indeterminate' }}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseProgress',
  props: {
    value: {
      type: Number,
      required: true,
      default: null,
    },
    max: {
      type: Number,
      required: false,
      default: 1,
    },
    type: {
      type: String,
      required: false,
      default: 'bar',
    },
  },
  data () {
    return {
      size: 100,
      strokeWidth: 5,
    }
  },
  computed: {
    center () {
      return this.size / 2
    },
    radius () {
      return this.center - this.strokeWidth * 2
    },
    circumference () {
      return this.radius * 2 * Math.PI
    },
    percentage () {
      return this.value / this.max * 100
    },

    ringStyles () {
      return {
        'class': 'origin-center transform -rotate-90',
        'stroke-dasharray': `${this.circumference} ${this.circumference}`,
        'stroke-dashoffset': this.circumference - (this.percentage / 100) * this.circumference,
      }
    },
    ringStylesCommon () {
      return {
        'fill': 'transparent',
        'stroke-width': this.strokeWidth,
        'stroke-linecap': 'round',
        // 'vector-effect': 'non-scaling-stroke',
        'r': this.radius,
        'cx': this.center,
        'cy': this.center,
      }
    },
  },
}
</script>
