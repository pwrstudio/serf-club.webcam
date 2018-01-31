<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  name: 'subtitles',
  props: ['text']
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

div {
  pointer-events: none;
  position: fixed;
  bottom: 30px;
  @include screen-size('small') {
    bottom: 20px;
  }
  @include screen-size('large') {
    bottom: 60px;
  }
  @include center-horizontal;
  width: 95%;
  text-align: center;
  z-index: 10000;
  color: yellow;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.02em;
  @include screen-size('small') {
    font-size: 16px;
    line-height: 16px;
  }
  @include screen-size('large') {
    font-size: 40px;
    line-height: 40px;
  }
  text-shadow: 0px 0px 10px #000;
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.1s ease-in;
  &.active {
    transition: opacity 0.25s ease-ou;
    opacity: 1;
    display: block;
  }
}
</style>
