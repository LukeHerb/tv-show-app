<template>
  <div v-if="show" class="relative h-[70vh] md:h-[90vh] overflow-hidden">
    <img
      :src="`https://image.tmdb.org/t/p/original/${show.backdrop_path}`"
      alt="Hero Banner"
      class="mask-b-from-20% mask-b-to-80% mask-l-from-50% mask-l-to-90% absolute inset-0 w-full h-full object-cover object-center"
    />

    <div
      class="bg-opacity-60 p-4 rounded-xl top-1/2 transform -translate-y-1/2 absolute px-6 md:px-8 max-w-md md:max-w-xl text-center md:text-left"
    >
      <h1 class="text-3xl md:text-4xl font-black mb-2">{{ show.name }}</h1>
      <p
        class="text-sm md:text-md text-gray-300 mb-4 line-clamp-3 md:line-clamp-3"
      >
        {{ show.overview }}
      </p>
      <div
        class="flex flex-col md:flex-row gap-2 mb-4 justify-center md:justify-start"
      >
        <button
          class="bg-gray-800 px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
          @click="$router.push(`/tv/${show.id}`)"
        >
          Details
        </button>
      </div>
      <div class="flex gap-4 items-center justify-center md:justify-start">
        <img
          v-for="provider in providers"
          :key="provider.provider_id"
          :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"
          :alt="provider.provider_name"
          class="h-10 w-10 md:h-12 md:w-12 rounded-lg object-center object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Object,
  providers: Array,
})
</script>
