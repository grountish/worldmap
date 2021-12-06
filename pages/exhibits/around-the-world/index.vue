<template>
  <div class="flex flex-col flex-grow bleed">
    <ClientOnly>
      <template #placeholder>
        <div class="flex-grow">this will be the maps placehodler</div>
      </template>
      <template #default>
        <BaseMap class="flex-grow" :center="[0,25]" :zoom="2.25" mapStyle="mapbox://styles/hacknug/cj3ndlpf9002r2spku7ju0a57">
          <template v-if="page.data.length" #default="{ MapboxMarker }">
            <component :is="MapboxMarker" v-for="(item, key) in page.data" :key="key" :lngLat="item.Coordinates" popup>
              <svg class="w-6" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21.5" cy="21.5" r="19.9074" fill="#F04932" stroke="black" stroke-width="3.18519" />
              </svg>
              <template #popup>
                <dl class="flex flex-col-reverse items-center justify-center space-y-1 space-y-reverse text-center">
                  <dt class="text-base leading-tight">Total Nurse Salaries Lost to Tax Dodging per Year</dt>
                  <dd class="text-4xl leading-tight">{{ item.Total_loss_Nurses|number({ maximumFractionDigits: 0 }) }}</dd>
                  <dd class="text-sm leading-tight text-accent-green">{{ item.Country_name }}</dd>
                </dl>
              </template>
            </component>
          </template>
        </BaseMap>
      </template>
    </ClientOnly>

    <div class="flex flex-col text-sm lg:flex-row lg:text-lg hidden">
      <SiteBanner class="text-black bg-white" :blocks="page.fullPage.section1" />
      <SiteBanner class="text-black bg-accent-green" :blocks="page.fullPage.section2" />
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { meta } from '~/mixins/Meta'

const query = groq`*[_type == 'aroundTheWorld'][0] {
  section1, section2,
  "data": data.asset->url
}`

export default {
  mixins: [meta],
  async asyncData ({ $sanity }) {
    const fullPage = await $sanity.fetch(query)
    return { page: { data: await fetch(fullPage.data).then((response) => response.json()), fullPage } }
  },
  data: () => ({ title: 'The Map of Missing Nurses' }),
}
</script>

<style lang="postcss" scoped>
>>> .mapboxgl-popup {
  @apply max-w-xs !important;

  & .mapboxgl-popup-tip { border-top-color: currentColor; }
  & .mapboxgl-popup-content { @apply text-primary-0 bg-primary-8 px-4 lg:px-10 py-6; }
  & .mapboxgl-popup-close-button { @apply w-8 h-8 m-3 text-2xl; }
}
</style>
