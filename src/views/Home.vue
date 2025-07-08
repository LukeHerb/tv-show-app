<template>
  <div class="text-white h-[80vh]">
    <div class="relative">
      <HeroBanner :show="featuredShow" :providers="watchProviders" />

      <div class="absolute left-0 right-0 bottom-0 px-6 floating-card">
        <h2 class="text-4xl font-black mb-6">Trending Shows</h2>
        <TrendingCarousel :shows="trendingShows" @select="setFeaturedShow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getTrendingTv, getWatchProviders } from '@/services/tmdb'
import HeroBanner from '@/components/HeroBanner.vue'
import TrendingCarousel from '@/components/TrendingCarousel.vue'

const data = ref(null)
const trendingShows = ref(null)
const watchProviders = ref(null)
const recommendations = ref(null)
const featuredShow = ref(null)

const fetchTrending = async () => {
  try {
    const response = await getTrendingTv()
    trendingShows.value = response.slice(0, 10)
    setFeaturedShow(response[0])
  } catch (error) {
    console.error('Error fetching trending shows:', error)
  }
}

const setFeaturedShow = async (show) => {
  featuredShow.value = show
  watchProviders.value = await getWatchProviders(show.id)
}

onMounted(fetchTrending)
</script>

<style scoped>
.floating-card {
  transform: translateY(60%);
}
</style>
