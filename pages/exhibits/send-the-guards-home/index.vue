<template>
  <div class="flex flex-col flex-grow py-20">
    <div class="">
      <img class="w-auto max-h-40" :src="page.logos" :alt="`${title} logo`">
    </div>

    <div class="mt-20 lg:mt-24" />

    <div class="w-full max-w-4xl mx-auto">
      <SanityContent :blocks="page.section1" class="text-2xl lg:text-3xl" />
    </div>

    <div class="mt-24 lg:mt-44" />

    <div class="bg-primary-2 bleed">
      <div class="container grid grid-rows-2 gap-5 lg:grid-cols-2 lg:grid-rows-none">
        <div class="grid grid-cols-2 gap-8 p-6 lg:pb-20 lg:p-14">
          <div class="col-span-2">
            <SanityContent :blocks="page.section2" class="text-lg lg:text-xl" />
          </div>
          <div class="flex flex-col items-center justify-end space-y-4 cursor-pointer" @click="expenses[0].count = randomInteger(0, 40)">
            <img class="w-full" :src="page.img" alt="">
            <p class="max-w-full text-lg text-center whitespace-nowrap">Staff Funds</p>
          </div>
          <div class="flex flex-col items-center justify-end space-y-4 cursor-pointer" @click="expenses[1].count = randomInteger(0, 40)">
            <img class="w-full" :src="page.img" alt="">
            <p class="max-w-full text-lg text-center whitespace-nowrap">Resource Funds</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 p-6 bg-white lg:pb-20 lg:p-14">
          <GuardsExpense v-for="(item, key) in expenses" :key="key" v-bind="{ item }">
            <img class="invisible w-full" :src="page.img">
          </GuardsExpense>
        </div>
      </div>
    </div>

    <div class="mt-8 lg:mt-0" />

    <div class="flex items-center justify-center bg-black text-accent-green bleed">
      <SanityContent :blocks="page.section3" class="container py-24 text-3xl font-bold banner lg:py-52 lg:text-5xl lg:leading-tight" />
    </div>

    <div class="mt-20 lg:mt-40" />

    <div class="w-full max-w-3xl mx-auto">
      <SanityContent :blocks="page.section4" class="text-xl lg:text-2xl" />
    </div>

    <div class="mt-12 lg:mt-12" />

    <!-- <stghMobile class="" /><stghDesktop class="" /> -->
    <div class="-space-y-1 text-4xl font-bold leading-none lg:text-7xl text-accent-red text-stroke lg:-space-y-5 lg:text-center" aria-hidden="true">
      <p v-for="i in 5" :key="i" :class="i === 3 ? 'text-fill-current text-stroke-transparent' : 'text-fill-transparent text-stroke-current'">
        one in seven <br class="lg:hidden"> tax collectors lost.
      </p>
    </div>

    <div class="mt-24 lg:mt-24" />

    <div class="flex items-center justify-center text-black bg-accent-green bleed">
      <SanityContent :blocks="page.learnMore" class="container py-8 text-xl text-center lg:py-10" />
    </div>
    <!-- <div class="flex flex-col items-center justify-between w-full py-6 lg:flex-row">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>prev</h4>
      </NuxtLink>
      <img :src="page.footerlogo" alt="">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>next</h4>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

// import stghMobile from '~/assets/images/stgh-mobile.svg?inline'
// import stghDesktop from '~/assets/images/stgh-desktop.svg?inline'

const query = groq`*[_type == 'sendtheguardshome'][0] {
    section1, section2, section3, section4, meta,learnMore,
    "logos": meta.logo.asset->url,
    "img": meta.image.asset->url,
    "footerlogo": footerlogo.asset->url
}`

export default {
  // components: {
  //   stghMobile,
  //   stghDesktop,
  // },
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({
    title: 'Send The Guards Home',
    expenses: [
      { label: 'Mansions', count: 3, icon: '🏰' },
      { label: 'Nurses', count: 5, icon: '🏥' },
    ],
  }),
  methods: {
    randomInteger (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>

<style lang="postcss" >
.banner strong { @apply text-accent-red font-bold; }
</style>
