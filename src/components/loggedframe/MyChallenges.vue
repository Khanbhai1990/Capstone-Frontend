<template lang="html">
  <h3>MyChallenges</h3>
</template>

<script>
export default {
  created () {
    if (!this.$store.state.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
