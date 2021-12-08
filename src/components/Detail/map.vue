<template>
  <div v-if="items">
    <div id="map">
      <iframe :src="items.mapIframe" width='100%' height='450' style=border:0; allowfullscreen='' loading='lazy'>
      </iframe>
    </div>
    <a :href="items.mapLink" class="map-app" target="_blank">Open in Google Maps</a>
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
            headers: {
              'Content-Type': 'application/json'
            },
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