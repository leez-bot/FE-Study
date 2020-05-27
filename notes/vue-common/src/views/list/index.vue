<template>
  <div class="list-wrapper">list页面<span>{{ count }}</span><Button @click="decrement(1)">哈哈哈</Button></div>
</template>

<script>
import { Button } from 'view-design';
import { mapState, mapMutations } from 'vuex'
export default {
  components: { Button },
  computed: {
    ...mapState([ 'count' ])
  },
  methods: {
    ...mapMutations([ 'decrement' ])
  }
}
</script>

<style>

</style>