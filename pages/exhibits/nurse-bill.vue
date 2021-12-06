<template>
  <div id="showScroll" class="container">
    <ReceiptTicket v-bind="{ name, country, nurses }" />
    <div>
      <button @click="printRecipt">Print Me!</button>
    </div>
    <div>
      <img ref="image" :src="output">
    </div>
  </div>
</template>

<script>
import { meta } from '~/mixins/Meta'

export default {
  mixins: [meta],
  data () {
    return {
      title: 'Nurse Bill',

      name: 'John Doe',
      country: 'United Kingdom',
      nurses: 2,

      output: null,
    }
  },
  methods: {
    printRecipt () {
      const el = this.$refs.printMe
      this.$html2canvas(el, {
        type: 'dataURL',
      }).then((canvas) => {
        this.output = canvas.toDataURL('image/jpeg', 0.1)
      })
    },
  },
}
</script>
