<template>
    <ul class="breadcrumbs"> 
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/en/area/cherry-blossom/">Japan Cherry Blossom spots 2021</router-link></li>
        <li><router-link to="/en/area/cherry-blossom/list-area.php?a=aomori">{{ items ? items.breadName : "No information" }}</router-link></li>
        <li class="name">{{ items ? items.detailName : "No information" }}</li>
    </ul> 
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

    this.getItem()
  },
  methods: { 
    async getItem() {
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