<template>
  <div>
    <Nav/>
    <Nav2>
      新闻动态
    </Nav2>
    <NewsContent type="3"/>
    <Footer/>
  </div>
</template>

<script lang="js">
import NewsContent from '@/components/NewsContent.vue';
export default {
  components: {NewsContent}
}

</script>

<style lang="scss" scoped>

</style>