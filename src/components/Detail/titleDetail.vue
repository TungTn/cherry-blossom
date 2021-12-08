<template>
  <h2>{{ items ? items.detailName : "No information" }}</h2>
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
        // console.log(this.router)
        this.items = response.data.find(
          (item) => item.detailId === this.router,
        )
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>