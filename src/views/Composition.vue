<template>
  <div class="composition">
    <div>
      <h2>Composition API</h2>
      <hr />
      <br />
      <h3>{{ tutorialInfo.name }}</h3>
      <p>
        Get the source code at:
        <a target="_blank" :href="tutorialInfo.githubLink">Github</a>
      </p>
      <hr />
      <br />
      <h3>Composition API benefits</h3>

      <ul>
        <li v-for="benefit in benefits">
          {{ benefit }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const tutorialInfo = {
  name: "Vue JS 3 Bangla Tutorial",
  githubLink: "https://github.com/rimonmath/vue3-tutorial"
};

const benefits = [
  "Improved Code Organization",
  "Reusability",
  "Performance Optimizations",
  "And so on..."
];
</script>

<style>
.composition {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 111px;
  max-width: 555px;
  margin-left: auto;
  margin-right: auto;
}

ul {
  margin-left: 33px;
  margin-top: 11px;
}
</style>
