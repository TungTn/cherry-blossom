<template>
    <article id="header-footer-standard">        
        <cheader></cheader>  
        <p>Product Id is {{ $route.params.pId }} </p>
        <div>            
            <div v-for="(item, index) in items" :key="item.areaId" :id="item.areaId">  
                <div class="banner-list-area">
                    <img class="banner-area" :src="require(`@/assets/list-area-img/banner-list-are01.jpg`)" alt="banner">
                    <div class="container cont-banner-area">
                        <figure>
                            <img :src="`${item.detailImage}`" class="banner" />
                        </figure>
                    </div>          
                </div> 
                <div class="list-item-area">
                    <div class="bg-item-area bg-item-area-path-top"> 
                        <div class="container breadcrumbs-mall">
                            <ul class="breadcrumbs">
                                <li><router-link to="/">Home</router-link></li>
                                <li><router-link to="/en/area/cherry-blossom/">Japan Cherry Blossom spots 2021</router-link></li>
                                <li><router-link to="/en/area/cherry-blossom/list-area.php?a=aomori">{{ items ? items.areaName : "No information" }}</router-link></a></li>
                                <li>{{ items ? item.detailName : "No information" }}</li>
                            </ul>
                        </div>
                        <div class="container">
                            <div class="details-item-area pt60 details-item-area-detail-page">
                                <h2>{{ items ? item.detailName : "No information" }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
        <cfooter></cfooter>
    </article>  
</template>
<script>
    import cheader from '@/components/header.vue';  
    import cfooter from '@/components/footer.vue';
    import axios from "axios";  
    export default {
        name: 'detail',
        components: {    
            cheader,         
            cfooter, 
        },
        data() {
            return {
                items: null,
                router: this.$route.params.pId,
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
                    this.items = response.data              
                    console.log(this.items)
                    return this.items.filter((items) => items.areaId === this.router)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>