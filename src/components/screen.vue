<template>
  <img :src='stream'>
</template>

<script>
export default {
  name: 'screen',
  props: ['stream']
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  will-change: opacity;
  transform: scale(1.2);
  transition: opacity 1.3s ease-in;
  transform-origin: 50% 50%;
  &.active {
    opacity: 1;
    transition: opacity 1.3s ease-in;
  }
  &.direct {
    opacity: 1;
    transition: none;
  }
  &.zoom-20 {
    transition: transform 0.1s ease;
    transform: scale(2);
  }
  &.zoom-30 {
    transition: transform 0.1s ease;
    transform: scale(3);
  }
  &.zoom-40 {
    transition: transform 1s ease;
    transform: scale(4);
  }
  $unit: 0%;
  $horz: 0;
  @while $horz < 100 {
    $vert: 0;
    @while $vert < 100 {
      &.pan-#{$horz}-#{$vert} {
        transform-origin: $horz + $unit $vert + $unit;
      }
      $vert: $vert + 20;
    }
    $horz: $horz + 20;
  }
}
</style>
