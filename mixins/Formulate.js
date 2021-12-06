export const InputMixin = {
  props: {
    context: {
      type: Object,
      required: true,
    },
    icon: {
      type: [Object, Function],
      required: false,
      default: null,
    },
  },
  computed: {
    type () {
      return this.context.type
    },
    attributes () {
      return this.context.attributes || {}
    },
    hasValue () {
      return this.context.hasValue
    },
  },
}
