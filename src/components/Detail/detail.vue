<template>
    <article id="header-footer-standard">
        <cheader></cheader>     
        <div class="banner-list-area" v-for="item in items" :key="item.areaId">
            <img class="banner-area" src="@/assets/list-area-img/banner-list-are01.jpg" alt="banner">
            <div class="container cont-banner-area" v-for="miniItem in item.listItem" :key="miniItem.listId">
                <figure>
                    <img :src="require(`@/assets/list-area-img/${miniItem.detailImage}`)" class="img-fluid" />
                </figure>
            </div>
        </div> 
        <div class="list-item-area">
            <div class="bg-item-area bg-item-area-path-top"> 
                <div class="container breadcrumbs-mall">
                    <ul class="breadcrumbs" v-for="item in items" :key="item.areaId" v-show="item.areaId">
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/en/area/cherry-blossom/">Japan Cherry Blossom spots 2021</router-link></li>
                        <li><router-link to="/en/area/cherry-blossom/list-area.php?a=aomori">{{ item.areaName }}</router-link></a></li>
                        <li>{{ item.detailName }}</li>
                    </ul>
                </div>
                <div class="container">
                    <div class="details-item-area pt60 details-item-area-detail-page">
                        <h2 v-for="item in items" :key="item.areaId">{{ item.detailName }}</h2>
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
                router: this.$route.params.locationId,
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
                    console.log(this.router)
                    return this.items.filter((items) => items.areaId === this.router)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>