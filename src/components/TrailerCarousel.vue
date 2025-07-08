<template>
  <div class="text-white w-7/10 mx-auto">
    <h2 class="text-3xl font-black mb-6">Trailers & Teasers</h2>
    <div class="flex overflow-x-auto gap-4 pb-2 snap-x snap-proximity">
      <div
        v-for="trailer in trailers"
        :key="trailer.id"
        class="w-96 flex-shrink-0 cursor-pointer snap-center"
      >
        <iframe
          :src="`https://www.youtube.com/embed/${trailer.key}`"
          frameborder="0"
          allowfullscreen
          class="w-full h-60 rounded-lg mb-2"
        >
        </iframe>
        <p class="text-sm text-gray-300 font-bold tracking-[.20em]">
          {{ trailer.type }}
        </p>
        <p class="text-sm text-white font-semibold">{{ trailer.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  trailers: Array,
})
</script>
