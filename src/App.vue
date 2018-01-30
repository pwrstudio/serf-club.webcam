<template>
  <div id="app">
    <!-- <logo :class="{'faded': loaded}" /> -->
    <main>
      <subtitles :text='subtitles.text'
                 :class="{'active': subtitles.active}" />
      <div class='backdrop' />
      <screen :stream='screen.one.url'
              :class="screen.one.classObject" />
      <screen :stream='screen.two.url'
              :class="screen.two.classObject" />
    </main>
  </div>
</template>

<script>
import logo from './components/logo'
import subtitles from './components/subtitles'
import screen from './components/screen'
import howler from 'howler'

export default {
  name: 'app',
  components: {
    logo,
    subtitles,
    screen
  },
  data() {
    return {
      loaded: false,
      screen: {
        one: {
          url: '',
          classObject: ''
        },
        two: {
          url: '',
          classObject: ''
        }
      },
      subtitles: {
        text: 'I am here now',
        active: true,
        timer: {}
      },
      sound: {
        ambient: {
          player: {},
          rate: 1
        },
        harmonic: {
          player: {},
          rate: 1
        },
        melodic: {
          player: {},
          rate: 1
        },
        noise: {
          player: {},
          rate: 1
        },
        speech: {
          player: {},
          rate: 1
        }
      }
    }
  },
  sockets: {
    init(data) {
      console.log('¶¶ Init')

      // // Fade out logo after 2s
      setTimeout(() => {
        this.loaded = true
      }, 2000)

      // // Update video streams
      this.updateSources(data)

      // // Set active class after 3s
      setTimeout(() => {
        this.updateClasses(data)
        this.subtitles.text = data.subtitle
      }, 4000)
    },
    crosscut(data) {
      console.log('## Crosscut')
      this.updateSources(data)
      setTimeout(() => {
        this.updateClasses(data)
        this.sound.noise.player.stop()
        this.sound.harmonic.player.stop()
        this.subtitles.text = data.subtitles
      }, 4000)
    },
    jumpcut(data) {
      console.log('** Jumpcut')
      this.updateClasses(data)
    },
    subtitle(data) {
      console.log('@@ Subtitles')
      clearTimeout(this.subtitles.timer)
      this.subtitles.active = true
      this.subtitles.text = data.text.subtitle
      this.subtitles.timer = setTimeout(() => {
        this.subtitles.active = false
      }, 4000)
    },
    ambient(data) {
      console.log('‡‡ AMBIENT')
      console.log(data)
      this.sound.ambient.player.rate = 1
      this.sound.ambient.player.fade(1, 0, 4000)
      this.sound.ambient.player.once('fade', () => {
        this.sound.ambient.player.unload()
        this.sound.ambient.player = new howler.Howl({
          src: [data.audio.ambient.url],
          loop: true,
          volume: 0
        })
        this.sound.ambient.player.once('load', () => {
          this.sound.ambient.player.play()
          this.sound.ambient.player.fade(0, 1, 4000)
        })
      })
    },
    harmonic(data) {
      console.log('‡‡ HARMONIC')
      console.log(data)

      this.sound.harmonic.player.rate = 0.6
      this.sound.harmonic.player.fade(0.6, 0, 5000)
      this.sound.harmonic.player.once('fade', () => {
        this.sound.harmonic.player.unload()
        this.sound.harmonic.player = new howler.Howl({
          src: [data.audio.harmonic.url],
          volume: 0
        })
        this.sound.harmonic.player.once('load', () => {
          this.sound.harmonic.player.play()
          this.sound.harmonic.player.fade(0, 0.6, 6000)
        })
      })
    },
    noise(data) {
      console.log('‡‡ NOISE')
      console.log(data)

      this.sound.noise.player.rate = 0.6
      this.sound.noise.player.fade(0.7, 0, 5000)
      this.sound.noise.player.once('fade', () => {
        this.sound.noise.player.unload()
        this.sound.noise.player = new howler.Howl({
          src: [data.audio.noise.url],
          volume: 0
        })
        this.sound.noise.player.once('load', () => {
          this.sound.noise.player.play()
          this.sound.noise.player.fade(0, 0.7, 6000)
        })
      })
    },
    melodic(data) {
      console.log('‡‡ MELODIC')
      console.log(data)

      this.sound.melodic.player.rate = 0.6
      this.sound.melodic.player.fade(0.5, 0, 5000)
      this.sound.melodic.player.once('fade', () => {
        this.sound.melodic.player.unload()
        this.sound.melodic.player = new howler.Howl({
          src: [data.audio.melodic.url],
          volume: 0
        })
        this.sound.melodic.player.once('load', () => {
          this.sound.melodic.player.play()
          this.sound.melodic.player.fade(0, 0.5, 6000)
        })
      })
    }
  },
  mounted() {
    // AMBIENT
    this.sound.ambient.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
    // Play ambient on load
    this.sound.ambient.player.once('load', () => {
      this.sound.ambient.player.play()
    })
    // MELODIC
    this.sound.melodic.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
    // HARMONIC
    this.sound.harmonic.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
    // NOISE
    this.sound.noise.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
  },
  methods: {
    updateSources(data) {
      console.log(data)
      this.screen.one.url = data.video.one.stream.url
      this.screen.two.url = data.video.two.stream.url
    },
    updateClasses(data) {
      this.screen.one.classObject = data.video.one.classObject
      this.screen.two.classObject = data.video.two.classObject
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';

body {
  background: $background-color;
  color: $main-color;
  font-size: $font-size;
  line-height: $line-height;
  font-family: $system-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include hide-scroll;
  @include screen-size('small') {
  }
}

main {
  @include center;
  width: 100vw;
  height: 56.25vw;
  max-height: 100vh;
  pointer-events: none;
  overflow: hidden;
}

.backdrop {
  background: url('/static/giphy2.gif');
  background-size: 200px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.25;
  will-change: opacity;
  transform: scale(1.2);
  transition: opacity 1.3s ease-in;
  transform-origin: 50% 50%;
  z-index: 1000;
  &.active {
    opacity: 1;
    transition: opacity 1.3s ease-in;
  }
}
</style>
