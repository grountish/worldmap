/* eslint-disable vue/html-indent */
<template>
  <div class="flex flex-col flex-grow py-20 m-1">
    <div class="">
      <img class="w-auto max-h-40" :src="page.logoPage" :alt="`${title} logo`">
    </div>

    <div class="mt-8 lg:mt-12" />

    <div class="w-full max-w-4xl mx-auto">
      <SanityContent :blocks="page.instructions" class="text-2xl lg:text-3xl" />
    </div>

    <div class="mt-8 lg:mt-16" />

    <div class="lg:bg-accent-blue bleed">
      <div class="container grid grid-cols-5 gap-5 lg:grid-cols-9">
        <FoneBooth
          v-for="(item, key) in page.items" :key="key"
          v-bind="{ item }"
          class="col-span-3 lg:col-end-auto"
          :class="key % 2 ? 'col-end-6' : 'col-end-4'"
        >
          <img class="w-full" :src="page.image" alt="">
        </FoneBooth>
      </div>
    </div>

    <div class="mt-8 lg:mt-0" />

    <div class="flex items-center justify-center text-accent-green bg-accent-red bleed">
      <SanityContent :blocks="page.wantToContact" class="container py-8 text-3xl text-center lg:py-10 lg:text-5xl lg:leading-tight" />
    </div>

    <div class="mt-8" />

    <div class="grid gap-10 py-4 lg:py-8">
      <div class="flex items-center justify-center space-x-2 text-xl text-center lg:text-2xl animate-bounce">
        <span>▼</span>
        <span>▼</span>
        <p>{{ page.leaveMessage.split('▼').join('') }}</p>
        <span>▼</span>
        <span>▼</span>
      </div>
      <BaseBrowser class="" :url="page.url" />
      <div class="text-lg lg:text-xl lg:text-center">
        <p class="">(If you have a decent chat, upload the recording to us here and we’ll add it to our conversation gallery below)</p>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center justify-between w-full py-6 lg:flex-row">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>prev</h4>
      </NuxtLink>
      <img :src="page.MoMNLogo" alt="">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>next</h4>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type=="foneAFinancer"][1]{
    meta,
    instructions,
    wantToContact,
    leaveMessage,
    url,
    "logoPage": logoPage.asset->url,
    "MoMNLogo": MoMNLogo.asset->url,
    "image": meta.image.asset->url,
    "logo": meta.logo.asset->url,
    "items": items[].file.asset->url
}`

export default {
  mixins: [meta],
  // middleware ({ redirect }) {
  //   return redirect('/exhibits')
  // },
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Fone-A-Financier' }),
}
</script>
