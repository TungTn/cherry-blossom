<template>             
    <div v-if="items">
        <div class="banner-list-area">
            <img class="banner-area" :src="(`https://willerexpress.com/en/area/cherry-blossom/list-area-img/banner-list-are01.jpg`)" alt="banner">
            <div class="container cont-banner-area">
                <figure>
                    <img :src="`${items.detailImage}`" class="banner" />
                </figure>
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
