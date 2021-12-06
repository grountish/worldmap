<template>
  <div class="bleed">
    <ol class="max-h-screen overflow-y-scroll">
      <template v-for="page in exhibits">
        <li :key="page._id" :class="['relative container ', 'grid gap-4 lg:gap-28 grid-cols-1 lg:grid-cols-2', 'min-h-screen py-24']">
          <NuxtLink class="absolute inset-0 z-30 w-full h-full" :to="`/exhibits/${page.slug}`" />

          <div class="relative z-20 self-start max-w-xl space-y-8 lg:self-center">
            <div class="flex flex-col space-y-6">
              <SanityImage v-if="page.meta.logo" class="w-full h-auto" :assetId="page.meta.logo.asset._ref" auto="format" :alt="page.meta.title" />
              <h1 :class="['text-2xl font-bold text-accent-green', page.meta.logo && 'sr-only']">{{ page.meta.title }}</h1>
              <p class="text-xl">{{ page.meta.description }}</p>
            </div>
            <div class="flex flex-col space-y-0">
              <div class="w-24 h-24 ml-auto text-primary-8 bg-accent-green">
                <svg class="w-full fill-current" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.621 41.25H15.5835V48.75H60.621V60L75.5835 45L60.621 30V41.25Z" />
                </svg>
              </div>
            </div>
          </div>

          <figure class="relative z-10 self-end order-first w-full h-auto max-w-sm mx-auto lg:max-w-none lg:order-none lg:self-center">
            <figure class="max-h-full m-auto aspect-w-1 aspect-h-1">
              <SanityImage
                v-if="page.meta.image"
                class="object-contain transform translate-y-16 lg:translate-y-0"
                :assetId="page.meta.image.asset._ref"
                auto="format"
              />
            </figure>
          </figure>
        </li>
      </template>
    </ol>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`{

  '4': *[_type in ['spendOffShoreCash']][0] { _id, _type, meta, 'slug': 'make-amazon-pay' },
  '5': *[_type in ['nurseInResidence']][0] { _id, _type, meta, 'slug': 'nurse-in-residence' },
  '6': *[_type in ['aroundTheWorld']][0] { _id, _type, meta, 'slug': 'around-the-world' },
}`

export default {
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { exhibits: await $sanity.fetch(query) }
  },
  data: () => ({ title: 'Exhibits' }),
  // head: {
  //   htmlAttrs: { class: 'snap snap-y snap-mandatory' },
  // },
}
</script>
