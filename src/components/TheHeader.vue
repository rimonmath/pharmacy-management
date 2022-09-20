<template>
  <div class="the-header">
    <div>
      <input
        type="text"
        placeholder="Search.."
        class="ml-7 the-header__search"
      />
    </div>
    <div class="avatar-wrapper">
      <div class="avatar">T</div>
    </div>
  </div>
</template>

<script></script>

<style>
.the-header {
  /* background-color: rgb(117, 20, 129); */
  padding: 9px 22px;
  /* color: rgb(221, 221, 221); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.the-header__search {
  width: 555px;
}

.the-header a {
  color: rgb(233, 168, 27);
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 33px;
  height: 33px;
  background-color: var(--brand-color);
  border-radius: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}
</style>
