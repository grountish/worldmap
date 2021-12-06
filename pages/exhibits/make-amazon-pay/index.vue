<template>
  <div class="flex flex-col flex-grow">
    <div class="overflow-hidden bleed bg-primary-2">
      <div class="container">
        <div class="bleed bg-gradient-to-b from-accent-red via-accent-red to-primary-2">
          <ConfettiRain class="absolute top-0" />

          <div class="container space-y-20 py-72">
            <ol class="grid gap-y-72 lg:grid-cols-6">
              <li
                v-for="(item, key) in [page.page.block1, page.page.block2, page.page.block3]"
                :key="item._key"
                :class="[
                  'relative',
                  'flex items-center -space-x-6',
                  'lg:col-start-2 lg:col-end-6',
                  key === 0 ? 'lg:-mx-12 text-center text-2xl' : 'lg:-mx-2 text-xl',
                ]"
              >
                <SanityContent
                  class="flex flex-col items-center justify-center w-full p-8 bg-white rounded bg-opacity-40 lg:text-3xl filter-frost"
                  :blocks="item"
                />
              </li>
            </ol>
            <div class="flex flex-col items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 lg:flex-row">
              <BaseButton variant="secondary" @click="isModalVisible = !isModalVisible">More about Amazon’s taxes</BaseButton>
              <BaseButton to="#spend-that-money" variant="primary">Spend that money!</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="spend-that-money" class="container text-center">
      <header class="py-4 bg-white bleed">
        <p class="container text-lg lg:text-xl">{{ page.meta.description }}</p>
      </header>
      <ul class="grid py-32 lg:py-64 lg:grid-cols-3 gap-11">
        <AmazonItem
          v-for="(item, key) in page.page.items"
          :key="key"
          v-bind="{ item, tag: 'li' }"
          @update="$set(cart, ...$event)"
        />
      </ul>
    </div>

    <div class="sticky bottom-0 py-2 bg-black lg:py-4 bleed text-accent-green">
      <div class="container grid gap-6 lg:grid-cols-2">
        <div class="flex items-center space-x-5">
          <img class="mx-auto -mb-4 lg:mb-0 max-h-12 lg:max-h-18 lg:mx-0" :src="page.logoAmazon" alt="">
        </div>
        <div class="flex items-baseline justify-center space-x-10 lg:items-center lg:space-x-20 lg:justify-end">
          <p class="text-3xl text-right lg:text-5xl tabular-nums">
            <AnimatedNumber :value="page.page.bezosMoney - cartTotal" v-bind="animatedNumberProps" />
          </p>
          <div class="relative flex flex-col items-end space-y-3">
            <span class="absolute right-0 -mt-4 -mr-2">
              <span class="px-1 py-0.5 text-base leading-none text-center rounded-full bg-accent-green text-primary-7 tabular-nums">{{ cartCount }}</span>
            </span>
            <svg class="w-8 h-8 fill-current text-primary-2" viewBox="0 0 30 30">
              <path d="M8.75 22.8556C7.375 22.8556 6.2625 23.9806 6.2625 25.3556C6.2625 26.7306 7.375 27.8556 8.75 27.8556C10.125 27.8556 11.25 26.7306 11.25 25.3556C11.25 23.9806 10.125 22.8556 8.75 22.8556ZM1.25 2.85559V5.35559H3.75L8.25 14.8431L6.5625 17.9056C6.3625 18.2556 6.25 18.6681 6.25 19.1056C6.25 20.4806 7.375 21.6056 8.75 21.6056H23.75V19.1056H9.275C9.1 19.1056 8.9625 18.9681 8.9625 18.7931L9 18.6431L10.125 16.6056H19.4375C20.375 16.6056 21.2 16.0931 21.625 15.3181L26.1 7.20559C26.2 7.03059 26.25 6.81809 26.25 6.60559C26.25 5.91809 25.6875 5.35559 25 5.35559H6.5125L5.3375 2.85559H1.25ZM21.25 22.8556C19.875 22.8556 18.7625 23.9806 18.7625 25.3556C18.7625 26.7306 19.875 27.8556 21.25 27.8556C22.625 27.8556 23.75 26.7306 23.75 25.3556C23.75 23.9806 22.625 22.8556 21.25 22.8556Z" />
            </svg>
          </div>
        </div>
        <!-- <div class="flex items-center justify-end space-x-5">
          <div class="flex items-baseline justify-end w-full space-x-5 cursor-pointer" @click="showTotal = !showTotal">
            <p class="flex items-center space-x-4 cursor-pointer">
              <span class="text-xl text-right text-opacity-40 text-accent-green lg:text-3xl">{{ showTotal ? 'Total Spent' : 'Remaining' }}</span>
              <span class="flex flex-col items-center justify-center space-y-1 font-black leading-none">
                <span :class="showTotal && 'text-opacity-40 text-accent-green'">·</span>
                <span :class="!showTotal && 'text-opacity-40 text-accent-green'">·</span>
              </span>
            </p>
            <p class="text-3xl text-right cursor-pointer lg:text-5xl tabular-nums">
              <AnimatedNumber :value="showTotal ? cartTotal : page.page.bezosMoney - cartTotal" v-bind="animatedNumberProps" />
            </p>
          </div>
        </div> -->
      </div>
    </div>

    <div class="flex flex-col text-sm lg:flex-row lg:text-lg bleed">
      <SiteBanner class="text-black bg-white" :blocks="page.page.block7" />
      <SiteBanner class="text-black bg-accent-green" :blocks="page.page.block8" />
    </div>

    <portal to="modal">
      <BaseModal v-slot="{ closeModal }" :isVisible="isModalVisible" @close="isModalVisible = false">
        <div class="relative z-10 overflow-y-auto pointer-events-auto bleed bg-primary-2">
          <ConfettiRain class="absolute top-0" />

          <div class="container">
            <button class="absolute top-0 right-0 z-50 m-4" @click="closeModal">
              <svg width="70" height="69" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.46234" y1="0.537661" x2="69.4623" y2="68.5377" stroke="black" stroke-width="1.30769" />
                <line y1="-0.653846" x2="96.1665" y2="-0.653846" transform="matrix(-0.707107 0.707107 0.707107 0.707107 69 1)" stroke="black" stroke-width="1.30769" />
              </svg>
            </button>

            <div class="bleed">
              <SanityContent class="container pt-32 pb-6 text-5xl lg:text-7xl" :blocks="page.page.factstitle" />
            </div>

            <div class="bleed bg-gradient-to-b from-accent-red via-accent-red to-primary-2">
              <ol class="container grid gap-44 lg:grid-cols-3 py-72">
                <li
                  v-for="(item, key) in [page.page.facts1, page.page.facts2, page.page.facts3, page.page.facts4, page.page.facts5, page.page.facts6]"
                  :key="item[0]._key"
                  :class="[
                    'relative flex items-center -space-x-8 lg:-space-x-6',
                    key % 2 === 0 ? 'lg:col-start-1 lg:col-end-3' : 'lg:col-start-2 lg:col-end-4',
                  ]"
                >
                  <div class="relative left-0 bottom-2/3 lg:bottom-1/3" aria-hidden="true">
                    <span class="font-bold leading-none text-white text-9xl text-opacity-40">{{ key + 1 }}</span>
                  </div>
                  <SanityContent
                    class="flex flex-col items-center justify-center p-8 text-xl bg-white rounded bg-opacity-40 filter-frost"
                    :blocks="item"
                  />
                </li>
              </ol>
            </div>

            <div class="flex flex-col items-center justify-center py-10 space-y-24 space-y-32">
              <img class="lg:max-h-36" :src="page.logoAmazon" alt="">
              <div class="flex flex-col items-center justify-center space-y-12 lg:space-y-32">
                <SanityContent v-for="item in [page.page.block4, page.page.block5]" :key="item[0]._key" class="text-2xl leading-tight lg:text-5xl lg:leading-tight" :blocks="item" />
                <SanityContent v-for="item in [page.page.block6]" :key="item[0]._key" class="text-base leading-tight" :blocks="item" />
              </div>
            </div>

            <div class="flex flex-col text-sm lg:flex-row lg:text-lg bleed">
              <SiteBanner class="text-black bg-white" :blocks="page.page.block7" />
              <SiteBanner class="text-black bg-accent-green" :blocks="page.page.block8" />
            </div>
          </div>
        </div>
      </BaseModal>
    </portal>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type == 'spendOffShoreCash'] {
  "logoAmazon": logoamazon.asset->url,
  "logoMomn": logomomn.asset->url,
  "page": *[_type == 'spendOffShoreCash'][0],
  meta
}[0]`

export default {
  components: { AnimatedNumber },
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ cart: {}, showTotal: false, isModalVisible: false, title: 'Make Amazon Pay' }),
  computed: {
    cartTotal () {
      return Object.entries(this.cart).reduce((a, [k, v]) => a + v * this.page.page.items.find((i) => i._key === k).price, 0)
    },
    cartCount () {
      return Object.values(this.cart).reduce((a, v) => a + v, 0)
    },
    animatedNumberProps () {
      const formatValue = (v) => this.$options.filters.currency(v, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      return { formatValue, duration: 200, round: true }
    },
  },
}
</script>

<style lang="postcss" scoped>
.text-white.text-opacity-40 {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: currentColor;
  -webkit-text-stroke-width: 2px;
  @screen lg { font-size: 200px; }
}
</style>
