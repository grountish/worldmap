<template>
  <div class="grid flex-grow py-48 gap-y-48 gap-x-24 lg:grid-cols-3 max-w-none">
    <!-- <video :class="['fixed inset-0 w-full h-full -z-10', 'object-cover object-bottom']" :src="page.videoUrl" autoplay muted loop /> -->

    <SanityContent
      class="space-y-10 text-5xl font-bold leading-none lg:col-span-3 lg:text-7xl text-accent-green"
      :blocks="page.section1"
    />
    <div class="flex justify-center">
      <a :class="['focus:outline-none focus:shadow-outline', 'transition duration-300 ease-in-out']" href="https://publicservices.international/">
        <img :src="page.PSIlogo" alt="PSI logo">
      </a>
    </div>

    <SanityContent
      class="space-y-10 text-3xl font-bold leading-none lg:text-5xl text-primary-0 lg:col-span-2"
      :blocks="page.section2"
    />
    <div class="flex justify-center w-40 m-auto">
      <a :class="['focus:outline-none focus:shadow-outline', 'transition duration-300 ease-in-out']" href="https://publicservices.international/">
        <img :src="page.wtyslLogo" alt="wtysl logo">
      </a>
    </div>

    <SanityContent
      class="space-y-10 text-3xl font-bold leading-none lg:text-5xl text-primary-0 lg:col-span-2"
      :blocks="page.section3"
    />
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`{
  "page": *[_type=="credits"][0] {
    text, meta, section1, section2,section3, "videoUrl": data.asset->url, "PSIlogo": psilogo.asset->url, "wtyslLogo": wtyslLogo.asset->url,
  },
}`

export default {
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { ...await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Credits' }),
  head: {
    htmlAttrs: { class: 'bg-primary-8' },
    bodyAttrs: { class: 'text-primary-1' },
  },
}
</script>
