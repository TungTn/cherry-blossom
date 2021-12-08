<template>
    <header id="header">
        <div class="new_header">
            <div class="new_header__top header_pc">
                <div class="multilang-header-container">
                    <div class="top__header multilang-row">
                        <div class="multilang-col-md-6 multilang-col-sm-8 multilang-col-xs-8 item_left">
                            <p>WILLER bus online booking - Highway bus and night bus in Japan</p>
                        </div>
                        <div class="multilang-col-md-6 multilang-col-sm-4 multilang-col-xs-4 item_right">
                            <div class="btn_mypage">
                                <a href="https://willerexpress.com/dy/3/common/pc/mypage/menu/index">
                                    <p><img src="/st/3/en/pc/img/header_icon_mypage.svg" alt="My page" width="20" height="20" /> <span>My page</span></p>
                                </a>
                                <a href="https://willerexpress.com/dy/3/common/pc/hikainLogin/">
                                    <p><img src="/st/3/en/pc/img/header_icon_guest.svg" alt="Guest" width="20" height="20" /> <span>Guest</span></p>
                                </a>
                                <a href="https://willerexpress.com/dynamic/bus/content-confirm/?lang=en">
                                    <p><img src="/st/3/en/pc/img/header_icon_cart.svg" alt="Cart" width="20" height="20" /> <span>Cart</span></p>
                                </a>
                            </div>
                            <div class="selectd__lang">
                                <select id="switchLanguage" onchange="javascript:location.href = this.value;">
                                    <option value="https://willerexpress.com/en/">English</option>
                                    <option value="https://willerexpress.com/ko/">한글</option>
                                    <option value="https://willerexpress.com/tw/">繁體中文</option>
                                    <option value="https://willerexpress.com/cn/">简体中文</option>
                                    <option value="https://willerexpress.com/vn/">Tiếng việt</option>
                                    <option value="https://willerexpress.com/th/">ภาษาไทย</option>
                                    <option value="https://travel.willer.co.jp/">日本語</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header__menu">
                <div class="nav_menu multilang-header-container">
                    <nav class="multilang-navbar navbar-static-top multilang-row" role="navigation">
                        <div class="menunav desktop">
                            <a href="#" class="menu-toggle full">
                                <span class="bars">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </a>
                            <ul style="display: block;">
                                <li class="has-sub">
                                    <a href="#">Bus</a>
                                    <ul>
                                        <li><a href="/en/bus_search/">Highway bus search</a></li>
                                        <li><a href="/en/bus/seat/">Seat types</a></li>
                                        <li><a href="/en/safety/">Safety measures</a></li>
                                        <li><a href="/en/airport-shuttle/narita-shuttle/">Narita airport shuttle</a></li>
                                        <li><a href="/st/3/en/pc/buspass/">Japan bus pass</a></li>
                                    </ul>
                                    <a class="dd-toggle" href="#">
                                        <span class="icon-plus"></span>
                                    </a>
                                </li>
                                <li class="has-sub">
                                    <a href="#">Bus + Hotel</a>
                                    <ul>
                                        <li><a href="/en/hotel-bus-tour/tokyo/">Tokyo</a></li>
                                        <li><a href="/en/hotel-bus-tour/osaka/">Osaka</a></li>
                                        <li><a href="/en/hotel-bus-tour/kyoto/">Kyoto</a></li>
                                        <li><a href="/en/hotel-bus-tour/gifu/">Takayama/Shirakawago</a></li>
                                        <li><a href="/en/hotel-bus-tour/">Other destinations</a></li>
                                    </ul>
                                    <a class="dd-toggle" href="#"><span class="icon-plus"></span> </a>
                                </li>
                                <li class="has-sub">
                                    <a href="#">Bus Tour</a>
                                    <ul>
                                        <li><a href="/st/3/en/pc/features/">Bus Tour</a></li>
                                        <li><a href="/en/tour/fuji/">Mt. Fuji tour</a></li>
                                        <li><a href="/en/theme-park/fujiq/">Fuji-Q Highland</a></li>
                                        <li><a href="/en/theme-park/usj/">Universal Studios Japan</a></li>
                                        <li><a href="/en/theme-park/">Theme parks</a></li>
                                    </ul>
                                    <a class="dd-toggle" href="#"><span class="icon-plus"></span> </a>
                                </li>
                                <li class="has-sub">
                                    <a href="#">Sightseeing train</a>
                                    <ul>
                                        <li><a href="/en/train/">Sightseeing train</a></li>
                                        <li><a href="/en/train/tantetsu/">Kyoto Tango Railway</a></li>
                                        <li><a href="/en/train/nagaragawa/">Restaurant train Nagara</a></li>
                                    </ul>
                                    <a class="dd-toggle" href="#"><span class="icon-plus"></span></a>
                                </li>
                                <li class="has-sub">
                                    <a href="#">User guide</a>
                                    <ul>
                                        <li><a href="/en/guide/">User guide</a></li>
                                        <li><a href="/en/guide/booking/">Booking</a></li>
                                        <li><a href="/en/guide/payment/">Method of payment</a></li>
                                        <li><a href="/en/guide/change/">Terms of change</a></li>
                                        <li><a href="/en/guide/cancellation/">Cancellation policy</a></li>
                                        <li><a href="/en/guide/refund/">Refunds</a></li>
                                        <li><a href="/en/guide/luggage/">Luggage</a></li>
                                        <li><a href="/en/guide/member/">WILLER membership</a></li>
                                    </ul>
                                    <a class="dd-toggle" href="#"><span class="icon-plus"></span></a>
                                </li>
                                <li class="menuMb"><a href="/st/3/en/pc/location/">Bus stops</a></li>
                                <li><a href="https://willer.force.com/en/s/">FAQ</a></li>
                                <li class="menuMb">
                                    <a href="https://willerexpress.com/dynamic/bus/content-confirm/?lang=en">Cart <img src="/st/3/en/pc/img/header_icon_cart.svg" alt="Cart" width="20" height="20" /></a>
                                </li>
                                <li class="menuMb">
                                    <a href="https://willerexpress.com/dy/3/common/pc/mypage/menu/index">My page <img src="/st/3/en/pc/img/header_icon_mypage.svg" alt="My page" width="20" height="20" /></a>
                                </li>
                                <li class="menuMb">
                                    <a href="https://willerexpress.com/dy/3/common/pc/hikainLogin/">Guest <img src="/st/3/en/pc/img/header_icon_guest.svg" width="20" alt="Guest" height="20" /> </a>
                                </li>
                            </ul>
                        </div>
                        <div class="logoPage logoPage_mb">
                            <a href="/en/"><img src="https://creation.willerexpress.com/st/3/en/pc/img/2020/logo.png" alt="WILLER" /></a>
                        </div>
                    </nav>
                    <div class="logoPage">
                        <a href="/en/"><img src="https://creation.willerexpress.com/st/3/en/pc/img/2020/logo.png" alt="WILLER" /></a>
                    </div>
                    <div class="logoUser">
                        <a href="https://willerexpress.com/dy/3/common/pc/mypage/menu/index">
                            <img src="/st/3/en/pc/img/header_icon_mypage.svg" alt="My page" width="30" height="36" />
                            <span>My page</span>
                        </a>
                        <a href="https://willerexpress.com/dy/3/common/pc/hikainLogin/">
                            <img src="/st/3/en/pc/img/header_icon_guest_black.svg" width="27" height="25" alt="Guest" style="margin-bottom: 6px;" />
                            <span>Guest</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
