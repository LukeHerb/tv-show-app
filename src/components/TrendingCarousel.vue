<template>
  <div
    class="flex gap-12 overflow-x-auto pb-2 px-8 h-full items-center snap-x snap-proximity"
  >
    <div
      v-for="(show, index) in shows"
      :key="show.id"
      class="flex-shrink-0 w-60 cursor-pointer snap-center relative"
      @click="$emit('select', show)"
    >
      <div class="relative h-full overflow-hidden rounded-lg">
        <img
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          :alt="show.name"
          class="mask-l-from-50% mask-l-to-90% rounded-lg w-full object-cover background-blur hover:scale-110 tranisition-transform duration-300 overflow-hidden"
        />
        <span
          class="absolute bottom-2 -left-3 text-8xl px-2 py-1 rounded z-10 font-black gradient-text"
        >
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shows: Array,
})
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(128, 128, 128, 1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
