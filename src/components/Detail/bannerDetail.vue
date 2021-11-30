<template>
	<div>
		
	</div> 
</template>
<script>
	import axios from "axios";  
	export default {
		name: '',
		data() {
            return {
                items: null,
                router: this.$route.params.areaId,
            }
        },
		mounted() {
            this.getItem()
        },
        methods: {
            async getItem() {
                try {
                    let response = await this.$http.get (
                        `../static/detail/detail.json`,
                    )
                    console.log(response.data)
                    this.items = response.data
                    return this.items.filter((items) => items.areaId === this.router)
                } catch (error) {
                    console.log(error)
                }
            }
        }
	}
</script>