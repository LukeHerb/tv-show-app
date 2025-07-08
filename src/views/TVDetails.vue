<template>
  <div class="relative min-h-screen text-white overflow-x-hidden" v-if="loaded">
    <div class="flex flex-col gap-24">
      <DetailsHero :show="show" :trailer="trailer" />

      <ShowSummary :show="show" :providers="providers" :credits="credits" />

      <div class="relative flex flex-col gap-24">
        <TrailerCarousel :trailers="trailers" />

        <div v-if="recommendations.length">
          <Recommendations :shows="recommendations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  getTvDetails,
  getTrailers,
  getRecommendations,
  getWatchProviders,
  getTvCredits,
} from '@/services/tmdb'
import DetailsHero from '@/components/DetailsHero.vue'
import ShowSummary from '@/components/ShowSummary.vue'
import TrailerCarousel from '@/components/TrailerCarousel.vue'
import Recommendations from '@/components/Recommendations.vue'
import { useRoute } from 'vue-router'

const trailer = ref(null)
const show = ref(null)
const route = useRoute()
const trailers = ref([])
const providers = ref(null)
const loaded = ref(false)
const credits = ref(null)
const recommendations = ref([])

const loadData = async (id) => {
  try {
    show.value = await getTvDetails(id)
    trailers.value = await getTrailers(id)
    providers.value = await getWatchProviders(id)
    credits.value = await getTvCredits(id)
    recommendations.value = await getRecommendations(id)
    trailer.value =
      trailers.value.find((t) => t.type === 'Trailer') || trailers.value[0]
    loaded.value = true
  } catch (error) {
    console.error('Error loading TV details:', error)
  }
}

onMounted(() => {
  console.log('Mounted TVDetails component with ID:', route.params.id)
  loadData(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    loadData(newId)
  }
)
</script>
