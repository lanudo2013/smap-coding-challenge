<template>
  <div>
    <img
      src="../assets/logo.png"
      class="img-fluid"
    >
    <h1 class="title">
      Welcome!
    </h1>
    <h2 class="subtitle">
      This is the Vue App for the task assignment. Go to the menu to see the components in action
    </h2>
  </div>
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style scoped lang="scss">
    @import '../assets/variables';

    .title{
        font-size: $titleFontSize;
        color: #c56593;
        text-align: center;

        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $titleFontSize/1.5;
        }
    }
    .subtitle{
        font-size: $titleFontSize/2;

        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $titleFontSize/2.5;
        }
    }
</style>