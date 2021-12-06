
<template>
  <div class="flex flex-col flex-grow">
    <div class="flex-grow py-20 space-y-10">
      <BaseBrowser class="sticky z-50 lg:static top-14" :url="page.url" />

      <div class="space-y-8">
        <!-- <div class="flex items-center space-x-5">
          <img class="w-20 h-20 rounded-full bg-gray" :src="page.avatar" alt="">
          <p class="text-2xl font-bold">{{ page.name }}</p>
        </div> -->
        <SanityContent v-if="page.whois" :blocks="page.whois" class="text-xl space-y-9" />
      </div>
    </div>

    <div v-if="page.checkOut || page.findMore" class="bleed">
      <div class="flex flex-col text-sm lg:flex-row lg:text-lg">
        <SiteBanner v-if="page.checkOut" class="text-white bg-black" :blocks="page.checkOut" />
        <SiteBanner v-if="page.findMore" class="text-black bg-accent-green" :blocks="page.findMore" />
      </div>
    </div>

    <!-- <div class="flex flex-col items-center justify-between w-full py-6 lg:flex-row">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>prev</h4>
      </NuxtLink>
      <img :src="page.momnLogo" alt="">
      <NuxtLink to="/exhibits/around-the-world" class="px-4 text-xl font-bold">
        <h4>next</h4>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type == 'nurseInResidence'][0] {
  ...,
  "avatar": avatar.asset->url,
  "logo": logo.asset->url,
  "momnLogo": momnLogo.asset->url,
}`

export default {
  mixins: [meta],

  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Health Workers Respond To Tax Abuse' }),
}
</script>
