<template>
  <div class="flex flex-col items-center justify-center flex-grow py-32 space-y-12">
    <video :class="['fixed inset-0 w-full h-full -z-10', 'object-cover', 'opacity-50']" :src="page.videoUrl" autoplay muted loop playsinline />

    <div class="flex flex-col items-center justify-center m-auto space-y-8 text-center">
      <h1 class="text-4xl font-bold lg:text-8xl lg:whitespace-nowrap">{{ page.meta.title }}</h1>

      <div class="max-w-4xl px-6 py-12 -mx-2 bg-opacity-50 rounded lg:mx-0 lg:px-24 bg-primary-0 filter-frost">
        <p class="max-w-2xl text-lg text-left lg:text-3xl">{{ page.text }}</p>
      </div>

      <!-- <div class="flex items-center justify-center w-full max-w-2xl space-x-8">
        <NuxtLink to="/exhibits" class="w-24 h-24 text-primary-8 bg-accent-green">
          Enter the Museum
          <svg class="w-full fill-current" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60.621 41.25H15.5835V48.75H60.621V60L75.5835 45L60.621 30V41.25Z" />
          </svg>
        </NuxtLink>
      </div> -->
      <div class="flex flex-col items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 lg:flex-row">
        <BaseButton variant="secondary" @click="isModalVisible = !isModalVisible">Tell me more</BaseButton>
        <NuxtLink to="/exhibits">
          <BaseButton variant="primary">Enter the museum</BaseButton>
        </NuxtLink>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center justify-center w-full space-y-8 text-center">
      <SanityContent class="max-w-2xl space-y-2 text-base text-left" :blocks="page.about" />
    </div> -->

    <div class="container inset-x-0 bottom-0 py-4 max-w-none lg:fixed">
      <div class="flex items-center max-w-2xl mr-auto space-x-8">
        <a class="mr-auto" href="https://publicservices.international/"><img :src="page.psilogo"></a>
      </div>
    </div>

    <portal to="modal">
      <BaseModal v-slot="{ closeModal }" :isVisible="isModalVisible" @close="isModalVisible = false">
        <div class="relative z-10 flex flex-col items-center justify-center overflow-y-auto pointer-events-auto">
          <div class="container p-8 text-xl bg-white rounded filter-frost">
            <button class="absolute top-0 right-0 z-50 m-4" @click="closeModal">
              <svg class="w-8 h-8" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.46234" y1="0.537661" x2="69.4623" y2="68.5377" stroke="black" stroke-width="1.30769" />
                <line y1="-0.653846" x2="96.1665" y2="-0.653846" transform="matrix(-0.707107 0.707107 0.707107 0.707107 69 1)" stroke="black" stroke-width="1.30769" />
              </svg>
            </button>

            <SanityContent class="max-w-2xl space-y-2 text-base text-left" :blocks="page.about" />
          </div>
        </div>
      </BaseModal>
    </portal>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type=="landingPage"][0] {
  data, text, about, meta, title,
  "logo": meta.logo.asset->url,
  "psilogo": psilogo.asset->url,
  "videoUrl": data.asset->url,
}`

export default {
  mixins: [meta],
  async asyncData ({ $sanity }) {
    return { page: await $sanity.fetch(query) }
  },
  data: () => ({ isModalVisible: false, title: 'Museum of Missing Nurses' }),
}
</script>
