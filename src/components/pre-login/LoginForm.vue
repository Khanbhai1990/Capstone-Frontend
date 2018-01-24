<template lang="html">
      <form>
          <v-text-field
            label="Email"
            v-model="email"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            required
          ></v-text-field>
      <v-btn @click="submit">Login</v-btn>
      <v-btn @click="submit">Register</v-btn>
    </form>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
