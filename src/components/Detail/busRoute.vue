<template>
  <div v-if="items">
    <h2 class="tit-lv2-area  {searchtitclass}" id="busplan">
      <p class="circlearea absmid"><span class="circleicon"><img src="https://willerexpress.com/st/share/area/layout/icon_bus.png" alt="Bus Plan" width="29" height="30"></span></p>
      Reserve a bus for this area throughout Japan
    </h2>
    <div class="list-tour-area">
      <span class="ajax_link_rewrite">
        <img src="https://willerexpress.com/st/share/area/layout/line_loading.gif" class="absmid" alt="loading">
        <input type="hidden" id="url" :value="`${items.linkRoute}`" />
      </span>
    </div>
  </div>
</template> 
<script>

export default {
  name: '',
  data() {
    return {
      items: null,
      router: this.$route.params.productsId,
    }
  },  
  mounted() {
    this.getArea()
  },
  methods: { 
    async getArea() {
      try {
        let response = await this.$http.get(
          `../static/detail/detail.json`,
          {
          },
        )
        this.items = response.data.find(
          (item) => item.detailId === this.router,
        )
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
</script>
<style scope>

</style>                                