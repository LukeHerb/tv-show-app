<template>
  <div class="absolute top-4 left-4 z-20 bg-white">
    <a
      href="/"
      class="bg-white text-black font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >Back to Home</a
    >
  </div>

  <div class="relative w-full" v-if="show && trailer">
    <div class="fixed inset-0 z-0 overflow-hidden">
      <div ref="backgroundPlayer" class="w-full h-full object-cover"></div>
      <div class="absolute inset-0 backdrop-blur-2xl bg-black/80" />
    </div>

    <div class="relative z-10 w-8/10 mx-auto text-white mt-16 rounded-4xl">
      <div class="backdrop-blur-lg rounded-4xl border border-white/10">
        <div class="aspect-video w-full rounded-4xl overflow-hidden relative">
          <div ref="foregroundPlayer" class="w-full h-full rounded-4xl"></div>
          <a
            :href="show.homepage"
            target="_blank"
            class="absolute bottom-4 left-2 transform bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg"
          >
            Watch Now
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="relative w-full" v-else>
    <div class="fixed inset-0 z-0 overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original/${show.poster_path}`"
        alt="backdrop image"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 backdrop-blur-2xl bg-black/80" />
    </div>

    <div class="relative z-10 max-w-xl mx-auto text-white mt-16">
      <div
        class="bg-white/5 backdrop-blur-lg rounded-4xl border border-white/10"
      >
        <div class="w-full h-auto rounded-4xl overflow-hidden relative">
          <img
            :src="`https://image.tmdb.org/t/p/original/${show.poster_path}`"
            alt="poster image"
            class="w-full h-full object-cover object-center rounded-4xl"
          />
          <a
            :href="show.homepage"
            target="_blank"
            class="absolute bottom-4 left-2 transform bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg"
          >
            Watch Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  show: Object,
  trailer: Object,
})

const backgroundPlayer = ref(null)
const foregroundPlayer = ref(null)

let backgroundPlayerInstance = null
let foregroundPlayerInstance = null

onMounted(() => {
  if (!props.show || !props.trailer) return

  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  window.onYouTubeIframeAPIReady = () => {
    backgroundPlayerInstance = new YT.Player(backgroundPlayer.value, {
      videoId: props.trailer.key,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: props.trailer.key,
        mute: 1,
        showInfo: 0,
      },
    })

    foregroundPlayerInstance = new YT.Player(foregroundPlayer.value, {
      videoId: props.trailer.key,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: props.trailer.key,
        mute: 0,
        showInfo: 0,
        rel: 0,
      },
      events: {
        onStateChange: syncPlayers,
      },
    })
  }
})

function syncPlayers(event) {
  if (event.data === YT.PlayerState.PAUSED) {
    backgroundPlayerInstance.pauseVideo()
  } else if (event.data === YT.PlayerState.PLAYING) {
    backgroundPlayerInstance.playVideo()
  }
}
</script>
