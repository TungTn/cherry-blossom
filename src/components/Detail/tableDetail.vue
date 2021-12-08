<template>
  <table v-if="items">
    <tr>
      <th>Address</th>
      <td>{{ items.address }}</td>
    </tr>
    <tr>
      <th>Access</th>
      <td>{{ items.access }}</td>
    </tr>
    <tr>
      <th>Business hours</th>
      <td>{{ items.hours }}</td>
    </tr>
    <tr>
      <th>Telephone</th>
      <td><span class="blue">{{ items.tel }}</span>
      </td>
    </tr>
    <tr>
      <th>Website</th>
      <td><a :href="'' + items.weblink" target="_blank">Homepage</a></td>
    </tr>
    <tr>
      <th>Closed</th>
      <td>{{ items.closed }}</td>
    </tr>
    <tr>
      <th>Fees</th>
      <td>{{ items.fees }}</td>
    </tr>
  </table>      
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