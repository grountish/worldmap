/* eslint-disable vue/html-indent */
<template>
  <div class="flex flex-col flex-grow bleed">
    <div class="flex flex-col lg:flex-row">
      <div class="flex items-center justify-start w-full lg:w-1/2">
        <div class="max-w-2xl mr-auto text-center">
          <img :src="page.logoPage" alt="">
        </div>
      </div>
      <div class="flex items-center justify-start w-full ">
        <!-- Are there classes that belong to SanityContent and not to father div -->
        <SanityContent :blocks="page.instructions" class="max-w-xl px-8 mx-auto text-left text-black" />
      </div>
    </div>
    <div class="flex flex-col pb-4 lg:flex-row bg-accent-blue">
      <div class="flex items-center justify-center w-full" @click="playPhone(page.items[0])">
        <div class="max-w-2xl mx-auto text-center">
          <img class="cursor-pointer" :src="page.image" alt="">
        </div>
      </div>
      <div class="flex items-center justify-center w-full" @click="playPhone(page.items[1])">
        <div class="max-w-2xl mx-auto text-center">
          <img class="cursor-pointer" :src="page.image" alt="">
        </div>
      </div>
      <div class="flex items-center justify-center w-full" @click="playPhone(page.items[2])">
        <div class="max-w-2xl mx-auto text-center">
          <img class="cursor-pointer" :src="page.image" alt="">
        </div>
      </div>
    </div>
    <div class="container flex items-center justify-center w-full text-4xl py-7 text-accent-green bg-accent-red">
      <!-- Are there classes that belong to SanityContent and not to father div -->
      <SanityContent :blocks="page.wantToContact" class="mx-auto text-center" />
    </div>
    <div class="container flex items-center justify-center w-full py-6 text-black">
      <p class="py-3">{{ page.leaveMessage }}</p>
    </div>
    <div id="iframe-container">
      <iframe :src="page.url" scrolling="no" frameborder="0" />
    </div>
    <div class="flex flex-col items-center justify-between w-full py-6 lg:flex-row">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>prev</h4>
      </NuxtLink>
      <img :src="page.MoMNLogo" alt="">
      <NuxtLink to="/exhibits" class="px-4 text-xl font-bold">
        <h4>next</h4>
      </NuxtLink>
    </div>
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
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Fone-A-Financier' }),
  methods: {
    playPhone (phone) {
      if (phone) {
        const audio = new Audio(phone)
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      }
    },
  },
}
</script>

<style scoped>
#iframe-container {
  overflow: hidden;
  height: 380px !important;
  margin-left: 0;
}

iframe {
  width: 70vw;
  height: 241vh;
  transform: translateY(-1325px);
  position: relative;
  margin: auto;
  top: 0;
  overflow: hidden;
}
</style>
