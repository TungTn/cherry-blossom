<template>
  <div v-if="items">
    <div class="description-item">
        <p>{{ items.desc }}</p>
    </div>
    <div class="date-item">
        <div class="fbloom-group clearfix fbloom-group-detail">
            <div class="firstbloom">
                <div class="blossarea maxheight-cherry">
                    <p class="blossareatop">Date of first blossom</p>
                    <p class="blossareabot" id="leftbloss" style="height: 44px;">
                        <img src="https://willerexpress.com/en/area/cherry-blossom/img/first_blossom.png" alt="first blossom" width="23" height="40" class="fblossomicon absmid" />
                        {{ items.firstBloss }}
                    </p>
                </div>
            </div>
            <!-- firstbloom END -->

            <div class="fullbloom">
                <div class="blossarea maxheight-cherry">
                    <p class="blossareatop">Date of full blossom</p>
                    <p class="blossareabot" id="rightbloss" style="height: 44px;">
                        <img src="https://willerexpress.com/en/area/cherry-blossom/img/full_blossom.png" alt="full blossom" width="42" height="40" class="fblossomicon absmid" />
                        {{ items.fullBloss }}
                    </p>
                </div>
            </div>
            <!-- fullbloom END -->            
        </div>
    </div>
    <span class="spotmenu">
        <div class="mmbus mmbus-detail"><a href="#busplan">Reserve a bus for this area</a></div>
        <!--mmbus end-->
    </span>
    <div class="description-item description-item-mb description-item-detail">
        <p>{{ items.desc }}</p>
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