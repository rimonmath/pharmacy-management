<template>
  <!-- <h2>Settings</h2> -->
  <div class="tab">
    <router-link to="/dashboard/settings/account">Account</router-link>
    <router-link to="/dashboard/settings/website">Website</router-link>
    <router-link to="/dashboard/settings/Theme">Theme</router-link>
  </div>

  <RouterView></RouterView>
</template>

<style>
.tab a {
  text-decoration: none;
  padding: 3px 9px;
  display: inline-block;
  color: #333;
}

.tab a.router-link-active {
  border-bottom: 3px solid var(--brand-color);
}
</style>
