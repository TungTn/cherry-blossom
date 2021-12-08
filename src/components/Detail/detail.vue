<template>
    <article id="header-footer-standard"> 
        <cheader></cheader>
        <div>
            <div>
                <bannerDetail></bannerDetail>   
                <div class="list-item-area">
                    <div class="bg-item-area bg-item-area-path-top"> 
                        <div class="container breadcrumbs-mall">
                            <breadcrumbs></breadcrumbs>
                            <div class="container">
                                <div class="details-item-area pt60 details-item-area-detail-page">
                                    <titleDetail></titleDetail>
                                    <div class="cont-details-area row">
                                        <div class="col-sm-6 col-xs-6">
                                            <div class="item-slider">
                                                <div class="auto-slider">
                                                    <slider></slider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 col-xs-6">
                                            <inforDetail></inforDetail>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-address">
                                    <tableDetail></tableDetail>                                    
                                </div>
                                <div class="noted">
                                    <p>
                                    * All information posted here are as of January 14, 2021. Current information may differ from contents posted due to the effects of the spread of COVID-19. <br>
                                    Please check the official website of each facility for the latest information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map">
                    <div class="container">
                        <div class="item-map">
                            <div class="mapzone">
                                <mapDetail></mapDetail>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reserver container">
                    <linkRoute></linkRoute>
                </div>             
            </div>
        </div>
        <cfooter></cfooter>
    </article>
</template>
<script>
    import cheader from '@/components/header.vue'
    import cfooter from '@/components/footer.vue'
    import bannerDetail from './bannerDetail.vue'
    import breadcrumbs from './breadcrumbs.vue'
    import titleDetail from './titleDetail.vue'
    import slider from './slider.vue'
    import inforDetail from './inforDetail.vue'
    import tableDetail from './tableDetail.vue'
    import mapDetail from './map.vue'
    import linkRoute from './busRoute.vue'
    export default {
        name: "detail",
            components: {
                bannerDetail,
                breadcrumbs,
                titleDetail,
                slider,
                inforDetail,
                tableDetail,
                mapDetail,
                linkRoute,
                cheader,         
                cfooter,
            },
        };
</script>

