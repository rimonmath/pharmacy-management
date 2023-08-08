<template>
  <div>
    <br />
    <label> Brand Color</label>
    <label for="bc">
      <div class="brand-color" :style="{ background: brandColor }"></div>
    </label>

    <input
      id="bc"
      type="color"
      :value="brandColor"
      class="mt-2"
      @input="handleInput"
    />
    <br />
    <TheButton class="mt-4" @click="saveData"> Save </TheButton>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useThemeStore } from "../../../store/themeStore";
import TheButton from "../../../components/TheButton.vue";
export default {
  components: {
    TheButton
  },
  computed: {
    ...mapState(useThemeStore, {
      brandColor: "brandColor"
    })
  },
  methods: {
    ...mapActions(useThemeStore, {
      setBrandColor: "setBrandColor"
    }),
    saveData() {},
    handleInput(c) {
      this.setBrandColor(c.target.value);
    }
  }
};
</script>

<style scoped>
.brand-color {
  width: 444px;
  height: 444px;
  background-color: aqua;
}
</style>
