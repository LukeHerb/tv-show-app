<template>
  <div
    class="bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl border border-white/10 w-full max-w-7/10 mx-auto"
  >
    <div
      class="flex flex-col md:flex-row gap-8 items-center justify-between w-full"
    >
      <h2 class="text-2xl md:text-3xl font-black mb-3 text-center md:text-left">
        {{ show.name }}
      </h2>
      <div class="flex gap-4 items-center justify-center md:justify-start">
        <img
          v-for="provider in providers"
          :key="provider.id"
          :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"
          class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-center object-contain"
        />
      </div>
    </div>

    <div
      class="flex flex-wrap items-center gap-2 text-sm text-gray-300 mb-4 justify-center md:justify-start"
    >
      <div class="w-full md:w-auto text-center md:text-left">
        <span>{{ show.last_air_date.slice(0, 4) }}</span>
      </div>
      <div class="w-full md:w-auto text-center md:text-left">
        <span
          >{{ show.seasons?.length }} Season{{
            show.seasons?.length > 1 ? 's' : ''
          }}</span
        >
      </div>
      <div class="w-full md:w-auto text-center md:text-left">
        <span>{{ show.genres[0].name }}</span>
      </div>
      <div class="w-full md:w-auto text-center md:text-left">
        <i
          class="fas fa-star text-yellow-400"
          v-for="n in Math.floor(roundedVoteAverage)"
          :key="n"
        ></i>
        <i
          class="fas fa-star-half-alt text-yellow-400"
          v-if="roundedVoteAverage % 1 !== 0"
        ></i>
        <i
          class="fa-regular fa-star text-yellow-400"
          v-for="n in 5 - Math.ceil(roundedVoteAverage)"
          :key="n + 'empty'"
        ></i>
        <span class="text-gray-400"
          >{{ roundedVoteAverage.toFixed(1) }} / 5</span
        >
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row items-start justify-between gap-6 h-full"
    >
      <div
        class="w-full md:w-6/12 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6"
      >
        <p
          class="text-gray-200 xl:text-base font-light text-center md:text-left lg:text-xs"
        >
          {{ show.overview }}
        </p>
      </div>
      <div class="w-full md:w-6/12 pt-6 md:pt-0 md:pl-6">
        <p v-if="actors.length" class="text-center md:text-left">
          <strong>Starring:</strong> {{ actors }}
        </p>
        <p v-if="creators.length" class="text-center md:text-left">
          <strong>Created by:</strong> {{ creators.join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  show: Object,
  providers: Object,
  credits: Object,
})

const roundedVoteAverage = computed(() => {
  return Math.round(props.show.vote_average.toFixed(1)) / 2
})

const creators = computed(
  () => props.show.created_by?.map((creator) => creator.name) || []
)

const actors = computed(() => {
  return props.credits.cast
    .slice(0, 3)
    .map((actor) => actor.name)
    .join(', ')
})
</script>
