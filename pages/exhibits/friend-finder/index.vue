<template>
  <div class="flex flex-col flex-grow py-20">
    <div class="pt-20 -mt-20 text-white bg-blue-600 bleed">
      <div class="container py-9 lg:py-16">
        <h1 class="text-4xl lg:text-5xl font-facebook">{{ page.meta.title }} </h1>
      </div>
    </div>

    <div class="mt-14 lg:mt-24" />

    <div class="w-full max-w-5xl mx-auto overflow-hidden bg-white divide-y shadow-md rounded-2xl divide-primary-3">
      <SanityContent :blocks="page.page.section2" class="px-5 py-10 text-xl lg:px-16 lg:text-3xl" />
      <SanityContent :blocks="page.page.section3" class="px-5 py-10 text-xl font-medium text-blue-600 lg:px-16 lg:text-3xl lg:text-center lg:bg-bg-grey" />
    </div>

    <div class="mt-14 lg:mt-20" />

    <div class="w-full max-w-5xl mx-auto overflow-hidden bg-white divide-y shadow-md rounded-2xl divide-primary-3">
      <SanityContent :blocks="page.page.section4" class="px-5 py-10 text-xl lg:px-16 lg:text-2xl" />
      <SanityContent :blocks="page.page.section5" class="px-5 py-10 text-xl lg:px-16 lg:text-2xl text-primary-4" />
    </div>

    <div class="mt-14 lg:mt-20" />

    <BaseBrowser :url="page.page.url" />

    <div class="mt-14 lg:mt-20" />

    <div class="mt-24 text-current bg-accent-red bleed">
      <div class="relative z-10 flex items-center justify-center -mt-24 -mb-8 overflow-x-hidden text-center">
        <SanityContent :blocks="page.page.section6" class="absolute text-2xl font-bold text-blue-500 uppercase lg:text-3xl" />
        <figure class="-mx-20">
          <img :src="page.backgroundtag" aria-hidden="true">
        </figure>
      </div>
      <div class="container max-w-5xl py-16 space-y-8 lg:py-20 lg:space-y-14">
        <SanityContent :blocks="page.page.section7a" class="space-y-8 text-2xl lg:space-y-12 lg:text-4xl" />
        <SanityContent :blocks="page.page.section7b" class="space-y-8 text-xl lg:space-y-12 lg:text-2xl" />
      </div>
    </div>
    <div class="text-white bg-black bleed">
      <div class="container py-8 space-y-8 lg:py-20 lg:space-y-14">
        <SanityContent :blocks="page.page.section8" class="space-y-8 text-xl lg:text-2xl lg:space-y-12 lg:text-center" />
        <div class="aspect-w-16 aspect-h-9">
          <iframe src="https://www.youtube-nocookie.com/embed/d2HOESxeC5g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        </div>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center justify-between w-full py-6 lg:flex-row">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>Prev</h4>
      </NuxtLink>
      <img :src="page.momnlogo" alt="">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>Next</h4>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type == 'friendFinder'] {
  "momnlogo": momnlogo.asset->url,
  "backgroundtag": backgroundtag.asset->url,
  "page": *[_type == 'friendFinder'][0],
  meta
}[0]`

export default {
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Friend Finder' }),
}
</script>
