<template>
  <nav :class="['container grid grid-cols-3 gap-6 w-full py-4 text-lg', !['/', '/credits'].includes($route.path) && 'bg-opacity-75 bg-primary-1 filter-frost']">
    <div class="text-left">
      <NuxtLink to="/" class="font-medium">
        <span class="block md:hidden">MoMN</span>
        <span class="hidden md:block">Museum of Missing Nurses</span>
      </NuxtLink>
    </div>
    <div class="text-center">
      <NuxtLink to="/exhibits">Exhibits</NuxtLink>
    </div>
    <div class="text-right">
      <!-- <NuxtLink to="/">About</NuxtLink> -->
      <NuxtLink to="/credits">Credits</NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNavigation',
}
</script>
