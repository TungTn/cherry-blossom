<template>
    <article id="header-footer-standard">
        <cheader></cheader>
        <ul class="breadcrumbs">
            <li><a href="/en/">Home</a></li>
            <li>Cherry Blossom</li>
        </ul>
        <!-- Start of contents -->
        <div class="banner-template">
            <div class="banner-rep">
                <img class="banner-relative" src="@/assets/img/bg-banner.jpg" alt="Japan Cherry Blossom spots 2021" />
                <div class="sologan-cherry">
                    <h1>Japan Cherry Blossom spots 2021</h1>
                    <h2>Cherry Blossom Spots and Forecast</h2>
                </div>
            </div>
            <div class="cloud">
                <div class="bg-pink" id="mainnav">
                    <div class="container">
                        <div class="tab-cherry">
                            <div>
                                <a href="#popular">
                                    <div class="tabs-popular tabs-popular1">
                                        <img class="icon-camera" src="@/assets/img/icon-flower.png" alt="camera" />
                                        <p>Popular Cherry Blossom Spots</p>
                                        <i class="fas fa-sort-down"></i>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <a href="#search">
                                    <div class="tabs-popular tabs-popular2">
                                        <img class="icon-bus" src="@/assets/img/icon-bus-new.png" alt="bus" />
                                        <p>Search the highway bus</p>
                                        <i class="fas fa-sort-down"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="intro-cherry">
                            <p>
                                In Japan, beautiful cherry blossom flowers can be admired in spring. They start to bloom from March in the south to May up north. Since there are various kinds of Sakura such as Yoshino cherry, weeping cherry
                                tree, double cherry blossoms, you will never get bored anywhere in Japan during Sakura season.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="location-cherry">
            <div class="cont-location-cherry" :style="cssBg">
                <div class="container">
                    <div class="intro-cherry">
                        <h2>Cherry blooming forecast in 2021</h2>
                        <div class="tabs-cherry">
                            <div id="maplistNavi">
                                <ul>
                                    <li id="tabmap" class="active">Map</li>
                                    <li id="tablist">List</li>
                                </ul>
                            </div>
                            <div id="maplistContents">
                                <div id="mapPage">
                                    <img src="@/assets/img/map.png" alt="map" usemap="#image-map" class="tour-map" />
                                    <a href="/en/area/cherry-blossom/list-area.php?a=hokkaido" class="underline">
                                        <p class="abs-position spot-hokkaido">
                                            <span class="spot-name">Hokkaido (Sapporo)</span><br />
                                            May 7
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=akita" class="underline">
                                        <p class="abs-position spot-akita">
                                            <span class="spot-name">Akita</span><br />
                                            April 20
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=niigata" class="underline">
                                        <p class="abs-position spot-niigata">
                                            <span class="spot-name">Niigata</span><br />
                                            April 11
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=nagano" class="underline">
                                        <p class="abs-position spot-nagano">
                                            <span class="spot-name">Nagano</span><br />
                                            April 12
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=kanazawa" class="underline">
                                        <p class="abs-position spot-kanazawa">
                                            <span class="spot-name">Kanazawa</span><br />
                                            April 5
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=kyoto" class="underline">
                                        <p class="abs-position spot-kyoto">
                                            <span class="spot-name">Kyoto</span><br />
                                            March 29
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=hiroshima" class="underline">
                                        <p class="abs-position spot-hiroshima">
                                            <span class="spot-name">Hiroshima</span><br />
                                            March 28
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=fukuoka" class="underline">
                                        <p class="abs-position spot-fukuoka">
                                            <span class="spot-name">Fukuoka</span><br />
                                            March 28
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=osaka" class="underline">
                                        <p class="abs-position spot-osaka">
                                            <span class="spot-name">Osaka</span><br />
                                            March 30
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=aichi" class="underline">
                                        <p class="abs-position spot-aichi">
                                            <span class="spot-name">Aichi (Nagoya)</span><br />
                                            March 28
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=yamanashi" class="underline">
                                        <p class="abs-position spot-yamanashi">
                                            <span class="spot-name">Yamanashi</span><br />
                                            March 26
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=tokyo" class="underline">
                                        <p class="abs-position spot-tokyo">
                                            <span class="spot-name">Tokyo</span><br />
                                            March 25
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=fukushima" class="underline">
                                        <p class="abs-position spot-fukushima">
                                            <span class="spot-name">Fukushima</span><br />
                                            April 7
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=miyagi" class="underline">
                                        <p class="abs-position spot-miyagi">
                                            <span class="spot-name">Miyagi</span><br />
                                            April 13
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=iwate" class="underline">
                                        <p class="abs-position spot-iwate">
                                            <span class="spot-name">Iwate</span><br />
                                            April 23
                                        </p>
                                    </a>
                                    <a href="/en/area/cherry-blossom/list-area.php?a=aomori" class="underline">
                                        <p class="abs-position spot-aomori">
                                            <span class="spot-name">Aomori</span><br />
                                            April 27
                                        </p>
                                    </a>
                                </div>
                                <div id="listPage">
                                    <table class="sakuraplace-tbl">
                                        <tr>
                                            <td class="nodatacell">&nbsp;</td>
                                            <th class="bg-yellow-bold" colspan="2">2021</th>
                                            <th class="bg-pink-bold" colspan="2">2020</th>
                                        </tr>
                                        <tr class="area-bg">
                                            <th class="bg-white">Area</th>
                                            <th class="bg-yellow-semibold">Date of first bloom</th>
                                            <th class="bg-yellow-semibold">Date of full bloom</th>
                                            <th class="bg-pink-semibold">Date of first bloom</th>
                                            <th class="bg-pink-semibold">Date of full bloom</th>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=hokkaido">Hokkaido (Sapporo)</a></td>
                                            <td class="bg-yellow-normal" align="left">May 3</td>
                                            <td class="bg-yellow-normal" align="left">May 7</td>
                                            <td class="bg-pink-normal" align="left">April 30</td>
                                            <td class="bg-pink-normal" align="left">May 2</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=aomori">Aomori</a></td>
                                            <td class="bg-yellow-normal" align="left">April 23</td>
                                            <td class="bg-yellow-normal" align="left">April 27</td>
                                            <td class="bg-pink-normal" align="left">April 17</td>
                                            <td class="bg-pink-normal" align="left">April 21</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=akita">Akita</a></td>
                                            <td class="bg-yellow-normal" align="left">April 16</td>
                                            <td class="bg-yellow-normal" align="left">April 20</td>
                                            <td class="bg-pink-normal" align="left">April 8</td>
                                            <td class="bg-pink-normal" align="left">April 15</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=iwate">Iwate</a></td>
                                            <td class="bg-yellow-normal" align="left">April 17</td>
                                            <td class="bg-yellow-normal" align="left">April 23</td>
                                            <td class="bg-pink-normal" align="left">April 14</td>
                                            <td class="bg-pink-normal" align="left">April 20</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=miyagi">Miyagi</a></td>
                                            <td class="bg-yellow-normal" align="left">April 8</td>
                                            <td class="bg-yellow-normal" align="left">April 13</td>
                                            <td class="bg-pink-normal" align="left">March 28</td>
                                            <td class="bg-pink-normal" align="left">April 3</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=fukushima">Fukushima</a></td>
                                            <td class="bg-yellow-normal" align="left">April 2</td>
                                            <td class="bg-yellow-normal" align="left">April 7</td>
                                            <td class="bg-pink-normal" align="left">March 28</td>
                                            <td class="bg-pink-normal" align="left">April 1</td>
                                        </tr>
                                        <!--<tr>
                        <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=yamagata">Yamagata</a></td>
                        <td class="bg-yellow-normal" align="left">April 6</td>
                        <td class="bg-yellow-normal" align="left">-</td>
                        <td class="bg-pink-normal" align="left">April 3</td>
                        <td class="bg-pink-normal" align="left">April 9</td>
                      </tr>--><!--REMOVE BECAUSE WE DON't HAVE BUSES-->
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=niigata">Niigata</a></td>
                                            <td class="bg-yellow-normal" align="left">April 6</td>
                                            <td class="bg-yellow-normal" align="left">April 11</td>
                                            <td class="bg-pink-normal" align="left">April 1</td>
                                            <td class="bg-pink-normal" align="left">April 7</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=tokyo">Tokyo</a></td>
                                            <td class="bg-yellow-normal" align="left">March 16</td>
                                            <td class="bg-yellow-normal" align="left">March 25</td>
                                            <td class="bg-pink-normal" align="left">March 14</td>
                                            <td class="bg-pink-normal" align="left">March 22</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=yamanashi">Yamanashi</a></td>
                                            <td class="bg-yellow-normal" align="left">March 16</td>
                                            <td class="bg-yellow-normal" align="left">March 26</td>
                                            <td class="bg-pink-normal" align="left">March 22</td>
                                            <td class="bg-pink-normal" align="left">April 2</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=nagano">Nagano</a></td>
                                            <td class="bg-yellow-normal" align="left">April 6</td>
                                            <td class="bg-yellow-normal" align="left">April 12</td>
                                            <td class="bg-pink-normal" align="left">April 2</td>
                                            <td class="bg-pink-normal" align="left">April 13</td>
                                        </tr>
                                        <!-- <tr>
                        <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=toyama">Toyama</a></td>
                        <td class="bg-yellow-normal" align="left">March 29</td>
                        <td class="bg-yellow-normal" align="left">-</td>
                        <td class="bg-pink-normal" align="left">March 27</td>
                        <td class="bg-pink-normal" align="left">April 13</td>
                      </tr>--><!--REMOVE BECAUSE WE DON't HAVE BUSES-->
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=kanazawa">Kanazawa</a></td>
                                            <td class="bg-yellow-normal" align="left">March 29</td>
                                            <td class="bg-yellow-normal" align="left">April 5</td>
                                            <td class="bg-pink-normal" align="left">March 26</td>
                                            <td class="bg-pink-normal" align="left">April 1</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=aichi">Aichi (Nagoya)</a></td>
                                            <td class="bg-yellow-normal" align="left">March 17</td>
                                            <td class="bg-yellow-normal" align="left">March 28</td>
                                            <td class="bg-pink-normal" align="left">March 22</td>
                                            <td class="bg-pink-normal" align="left">April 1</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=kyoto">Kyoto</a></td>
                                            <td class="bg-yellow-normal" align="left">March 18</td>
                                            <td class="bg-yellow-normal" align="left">March 29</td>
                                            <td class="bg-pink-normal" align="left">March 22</td>
                                            <td class="bg-pink-normal" align="left">March 30</td>
                                        </tr>
                                        <!--<tr>
                        <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=hyogo">Hyogo</a></td>
                        <td class="bg-yellow-normal" align="left">March 27</td>
                        <td class="bg-yellow-normal" align="left">-</td>
                        <td class="bg-pink-normal" align="left">March 26</td>
                        <td class="bg-pink-normal" align="left">April 3</td>
                      </tr>--><!--REMOVE BECAUSE WE DON't HAVE BUSES-->
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=osaka">Osaka</a></td>
                                            <td class="bg-yellow-normal" align="left">March 21</td>
                                            <td class="bg-yellow-normal" align="left">March 30</td>
                                            <td class="bg-pink-normal" align="left">March 23</td>
                                            <td class="bg-pink-normal" align="left">April 3</td>
                                        </tr>
                                        <!--<tr>
                        <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=shimane">Shimane</a></td>
                        <td class="bg-yellow-normal" align="left">March 25</td>
                        <td class="bg-yellow-normal" align="left">-</td>
                        <td class="bg-pink-normal" align="left">March 23</td>
                        <td class="bg-pink-normal" align="left">March 30</td>
                      </tr>--><!--REMOVE BECAUSE WE DON't HAVE BUSES-->
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=hiroshima">Hiroshima</a></td>
                                            <td class="bg-yellow-normal" align="left">March 16</td>
                                            <td class="bg-yellow-normal" align="left">March 28</td>
                                            <td class="bg-pink-normal" align="left">March 22</td>
                                            <td class="bg-pink-normal" align="left">April 3</td>
                                        </tr>
                                        <tr>
                                            <td class="tblistplace bg-white"><a href="/en/area/cherry-blossom/list-area.php?a=fukuoka">Fukuoka</a></td>
                                            <td class="bg-yellow-normal" align="left">March 17</td>
                                            <td class="bg-yellow-normal" align="left">March 28</td>
                                            <td class="bg-pink-normal" align="left">March 21</td>
                                            <td class="bg-pink-normal" align="left">April 2</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popular-cherry" id="popular">
            <div class="bg-inner-popular">
                <div class="bg-cherry-popular">
                    <div class="container cont-popular-cherry">
                        <div class="bg-opacity-cherry">
                            <div class="intro-popular">
                                <h2>Popular Cherry Blossom Spots</h2>
                                <p>
                                    Night cherry trees, weeping cherry trees, mountain cherry trees... Introducing well known spots of all sorts of cherry blossoms throughout the country. Listed are the blooming information of the cherry trees
                                    and how to access these spots.
                                </p>
                            </div>
                            <div id="spotList">
                                <ul class="nav nav-tabs">
                                    <li v-for="(item, index) in items" :class="{'active': index === 0}" class="nav-item" :key="item.keyId">
                                        <a :class="{'active': index === 0}" class="nav-link" data-toggle="tab" :href="'#' + item.keyId">
                                            <span>{{ item.tabName }}</span> <span><i class="fas fa-angle-down"></i></span>
                                        </a>
                                    </li> 
                                </ul>
                                <div class="tab-content">
                                    <div v-for="(item, index) in items" :class="{'active': index === 0}" class="tab-pane list-popular" :id="item.keyId" :key="item.keyId">
                                        <h3 class="ttl-tab">{{ item.areaName }}</h3>
                                        <ul>  
                                            <li v-for="miniItem in item.detailItem" :key="miniItem.detailId" :id="miniItem.detailId" class="maxheight col-md-4 col-sm-12 col-xs-12">
                                                <router-link :to="{name: 'Detail', params: key}">
                                                    <div class="details-list">
                                                        <div class="img-thumb"><img :src="require(`@/assets/img/${miniItem.listImage}`)" :alt="`${miniItem.listAlt}`" /></div>
                                                        <div class="name-tour">
                                                            <h3>{{ miniItem.detailName }}</h3>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </li>
                                        </ul>
                                        <div class="text-center btn-detail"><a href="/en/area/cherry-blossom/list-area.php?a=hokkaido">View details</a></div>
                                    </div>                               
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-section" id="search" :style="cssBg">
            <h2>Search the highway bus</h2>
            <!--/ Searchbox -->
            <div class="searchbox">
                <div class="searchbox__title searchbox__title--mb">
                    <h2><i class="fas fa-bus"></i>Highway bus seat availability</h2>
                    <span class="searchbox__txt searchbox__txt--pc">Booking up to 20 min prior to departure OK!</span>
                </div>
                <span class="searchbox__txt searchbox__txt--mb">Booking up to 20 min prior to departure OK!</span>
                <div class="searchbox__inner">
                    <div class="searchbox__title searchbox__title--pc">
                        <h2><i class="fas fa-bus"></i>Highway bus seat availability</h2>
                        <span class="searchbox__txt searchbox__txt--pc">Booking up to 20 min prior to departure OK!</span>
                    </div>
                    <div id="wbs_parts">
                        <form id="searchbox-bus01" action="">
                            <div id="searchbox-bus01-in">
                                <div class="form-group-wrapper">
                                    <div class="form-group prefecture">
                                        <label id="fromPrefectureLabel" class="search__label"></label>
                                        <input id="fromPrefectureText" class="search__input search__input--prefecture" type="text" value="" autocomplete="off" size="10" style="display: block;" placeholder="Prefecture" />
                                        <input id="fromPrefectureId" type="hidden" value="" />
                                        <input id="fromPrefectureParam" type="hidden" value="" />
                                        <div class="box-suggest box-suggest_from" style="display: none;">
                                            <ul class="box-suggest-list"></ul>
                                        </div>
                                    </div>
                                    <div class="form-group prefecture">
                                        <label id="toPrefectureLabel" class="search__label"></label>
                                        <input id="toPrefectureText" class="search__input search__input--prefecture" type="text" value="" autocomplete="off" size="10" style="display: block;" placeholder="Prefecture" />
                                        <input id="toPrefectureId" type="hidden" value="" />
                                        <input id="toPrefectureParam" type="hidden" value="" />
                                        <input id="toAreaParam" type="hidden" value="" />
                                        <div class="box-suggest box-suggest_to" style="display: none;">
                                            <ul class="box-suggest-list"></ul>
                                        </div>
                                    </div>
                                    <div id="departure" class="form-group group-departure">
                                        <div>
                                            <label class="search__label"></label>
                                            <input class="search__input search__input--date datepicker" id="departureDate" name="departureDate" maxlength="10" type="text" readonly />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group-wrapper">
                                    <div class="search__number">
                                        <div class="form-group">
                                            <label for="" class="search__label" id="male"></label>
                                            <div class="input-group">
                                                <button class="search__stepper" type="button" id="adultMaleCountMinusBtn" aria-label="Minus"><i class="fa fa-minus" aria-hidden="true"></i></button>
                                                <label class="search__input" id="adultMaleCountLabel">0</label>
                                                <button class="search__stepper" type="button" id="adultMaleCountPlusBtn" aria-label="Plus"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                            </div>
                                            <input type="hidden" id="adultMaleCount" name="adultMaleCount" value="0" />
                                        </div>
                                    </div>
                                    <div class="search__number">
                                        <div class="form-group">
                                            <label for="" class="search__label" id="female"></label>
                                            <div class="input-group">
                                                <button class="search__stepper" type="button" id="adultFemaleCountMinusBtn" aria-label="Minus"><i class="fa fa-minus" aria-hidden="true"></i></button>
                                                <label class="search__input" id="adultFemaleCountLabel">0</label>
                                                <button class="search__stepper" type="button" id="adultFemaleCountPlusBtn" aria-label="Plus"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                            </div>
                                            <input type="hidden" id="adultFemaleCount" name="adultFemaleCount" value="0" />
                                        </div>
                                    </div>
                                    <div class="search__button">
                                        <div class="search-button">
                                            <input type="hidden" name="wbs_lang" id="wbs_lang" value="en" />
                                            <input type="hidden" name="wbs_default_from_pref" id="wbs_default_from_pref" value="" />
                                            <input type="hidden" name="wbs_default_to_pref" id="wbs_default_to_pref" value="" />
                                            <input type="hidden" name="skb" id="skb" value="02" />
                                            <input type="hidden" name="osf" id="osf" value="1" />
                                            <input type="hidden" name="osfp" id="osfp" value="0" />
                                            <input type="hidden" name="fp" id="fp" value="0" />
                                            <!-- 0=normal, 1=buspass only -->
                                            <input type="hidden" name="aid" id="aid" value="" />
                                            <input type="hidden" name="mid" id="mid" value="" />
                                            <input type="hidden" name="fid" id="fid" value="" />
                                            <input type="hidden" name="agencyCode" id="agencyCode" value="" />
                                            <!-- settings end -->
                                            <div class="search__notice show-notice-mb">
                                                <p id="notice"></p>
                                            </div>
                                            <button class="search__btn" type="button" id="btn-search"><i class="fa fa-search" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="search__notice show-notice-pc">
                                    <p id="notice"></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Searchbox /-->
        </div>
        <!-- End of contents -->
        <cfooter></cfooter>
    </article>
</template>
<script>
  import cheader from '@/components/header.vue';  
  import cfooter from '@/components/footer.vue';
  import axios from "axios";  
  export default {
    name: 'home',
    components: {    
      cheader,         
      cfooter,
    },
    data() {
        return {
            items: [],
            cssBg: {
                backgroundImage: `url(${require('@/assets/img/bg-pink.png')})`
            },
        }
    },
    mounted() {
        this.getItem()
        $(document).ready(function() {
            $("a.fadeNext").click(function(){

                $(this).parent().toggleClass("active");
                return false;
            });
            
            $("#tabmap").click(function(event){
                $("#maplistContents div[id$=Page]").hide(); $("#mapPage").fadeIn();
                $("#maplistNavi li").removeClass(); $(this).addClass("active"); event.preventDefault();
            });
            $("#tablist").click(function(event){
                $("#maplistContents div[id$=Page]").hide(); $("#listPage").fadeIn();
                $("#maplistNavi li").removeClass(); $(this).addClass("active"); event.preventDefault();
            });
        }); 
    },
    methods: {        
        async getItem() {
            try {
                let response = await this.$http.get (
                    `../static/home/home.json`
                )
                this.items = response.data            
                console.log(typeof this.items)
            } catch (error) {
                console.log(error)
            }
        }
    }        

}
</script>
<style scope>
    @import url(https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css);
    .fa, .far, .fas {
        font-family: "Font Awesome 5 Free";
    }
</style>

