<template>
  <div class="flex flex-col min-h-screen">
    <!-- <SiteNavigation
      :class="[false ? 'sticky' : 'fixed inset-x-0 max-w-none', 'z-40 top-0']"
    /> -->

    <main :class="['flex flex-col flex-grow', 'container']">
      <Nuxt />
    </main>

    <!-- <PortalTarget name="modal" /> -->
  </div>
</template>

<script>
export default {
  head: {
    htmlAttrs: {
      class: 'text-primary-8 bg-primary-1',
    },
  },
}
</script>
