<template>
  <div id="app">
    <!-- <logo :class="{'faded': loaded}" /> -->
    <main>
      <subtitles :text='subtitles.text'
                 :class="{'active': subtitles.active}" />
      <div class='backdrop'/>
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
        one: {
          player: {},
          rate: 1
        },
        two: {
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
        // this.sound.one.player.rate(playerOneRate)
        // this.sound.two.player.rate(playerTwoRate)
        this.updateClasses(data)
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
    audioone(data) {
      console.log('‡‡ Audio 1')
      this.sound.one.rate = data.playerOneRate
      this.sound.one.player.fade(1, 0, 1000)
      this.sound.one.player.once('fade', () => {
        this.sound.one.player.unload()
        this.sound.one.player = new howler.Howl({
          src: [data.soundOne.url],
          loop: true,
          volume: 0
        })
        this.sound.one.player.once('load', () => {
          this.sound.one.player.play()
          this.sound.one.player.fade(0, 1, 1000)
        })
      })
    },
    audiotwo(data) {
      console.log('‡‡ Audio 2')
      console.log(data)

      // this.sound.two.rate = data.playerTwoRate
      this.sound.two.rate = 1
      this.sound.two.player.fade(1, 0, 5000)
      this.sound.two.player.once('fade', () => {
        this.sound.two.player.unload()
        this.sound.two.player = new howler.Howl({
          src: [data.audio.two.url],
          loop: true,
          volume: 0
        })
        this.sound.two.player.once('load', () => {
          this.sound.two.player.play()
          this.sound.two.player.fade(0, 1, 6000)
        })
      })
    }
  },
  mounted() {
    this.sound.one.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
    this.sound.two.player = new howler.Howl({
      src: [
        'https://s3-eu-west-1.amazonaws.com/serf.club.audio/audio/101837__stereodivo__tex-room-tv-ambience.mp3'
      ],
      loop: true,
      volume: 1
    })
    this.sound.one.player.once('load', () => {
      this.sound.one.player.play()
    })
    this.sound.two.player.once('load', () => {
      this.sound.two.player.play()
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
  opacity: 0.3;
  will-change: opacity;
  transform: scale(1.2);
  transition: opacity 1.3s ease-in;
  transform-origin: 50% 50%;
  z-index: 1000;
  // mix-blend-mode: lighten;
  &.active {
    opacity: 1;
    transition: opacity 1.3s ease-in;
  }
}
</style>
