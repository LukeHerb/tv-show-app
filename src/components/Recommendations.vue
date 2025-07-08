<template>
  <div class="text-white w-7/10 mx-auto mb-10">
    <h2 class="text-3xl font-black mb-6">You Might Also Like</h2>
    <div class="flex gap-2 overflow-x-auto snap-x snap-proximity">
      <div
        v-for="show in shows"
        :key="show.id"
        class="flex-shrink-0 w-60 cursor-pointer snap-center"
        @click="navigateToShow(show.id)"
      >
        <div class="h-full overflow-hidden rounded-lg">
          <img
            :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
            :alt="show.name"
            class="rounded-lg w-full object-cover hover:scale-105 transition-transform duration-300 overflow-hidden"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shows: Array,
})

function navigateToShow(id) {
  window.location.href = `/tv/${id}`
}
</script>
