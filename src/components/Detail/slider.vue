<template>
  <div>
      <div v-for="area in items" :key="area.id">
        <div v-for="item in area.slideImage.find(item => item.id === id)" :key="item.id">
          <img :src="`${item.src}`" />
        </div>
    </div>
  </div>
</template> 
<script>

export default {
  name: '',
  data() {
    return {
      items: null,
      slideImage: {},
      router: this.$route.params.productsId,
    }
  },  
  mounted() {
    this.getArea()
    $('.auto-slider').bxSlider({
		  auto: false, 
		  autoControls: true,
		  stopAutoOnClick: true,
		  pager: true,
		  slideWidth: 573
		});
  },
  methods: { 
    async getArea() {
      try {
        let response = await this.$http.get(
          `../static/home.json`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )
        this.items = response.data.find(
          (item) => item.id === this.router,
        )
      } catch (error) {
        console.log(error.response)
      }
    },
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },
  }
}
</script>
<style scope>

</style>