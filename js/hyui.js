$(function() {
    /*-----------------------------------*/
    ///////////// fix iOS bug /////////////
    /*-----------------------------------*/
    document.documentElement.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    }, false);
    /*-----------------------------------*/
    ///////////////// 變數 ////////////////
    /*-----------------------------------*/
    var _window = $(window),
        ww = _window.outerWidth(),
        wh = _window.height(),
        _body = $('body'),
        wwNormal = 1200,
        wwMedium = 992,
        wwSmall = 768,
        wwxs = 576;
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/
    //////////// nav如果有兩個選單///////////
    /*-----------------------------------*/
    var _navLength = $('.navigation ul').length;
    $(window).bind('load', function() {
        if (_navLength > 1) {
            $('.navigation ul:nth-child(1)').addClass('left_nav');
        }
    });
    /*-----------------------------------*/
    /////// header選單 tab及 fix設定////////
    /*-----------------------------------*/
    var _menu = $('.header .menu');
    _menu.find('li').has('ul').addClass('hasChild');
    var liHasChild = _menu.find('li.hasChild');
    var subMenuWidth = liHasChild.first().children('ul').outerWidth();
    /*-----------------------------------*/
    ////////////// 行動版選單切換////////////
    /*-----------------------------------*/
    $('body').prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>');
    $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button>'); //剩下漢堡
    // $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>');當header 不需要search時，查詢的button要關閉
    var menu_status = false;
    var _sidebar = $('.sidebar'),
        _search = $('.search'),
        _nav = $('.navigation'),
        _menu = $('.menu'),
        _sidebarClose = $('.sidebarClose'),
        _sidebarCtrl = $('.sidebarCtrl'),
        _overlay = $('.menu_overlay');
    _mArea = $('.m_area');
    _sidebarCtrl.append('<span></span><span></span><span></span>');
    var search_mode = false;
    // 打開選單 function
    function showSidebar() {
        _sidebar.show();
        _mArea.show();
        _mArea.animate({
            'margin-left': 0
        }, 500, 'easeOutQuint');
        $('body').addClass('noscroll');
        _overlay.fadeIn();
        $('.m_search').hide();
        search_mode = false;
        _overlay.off("touchmove");
    }
    // 縮合選單 function
    function hideSidebar() {
        _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function() {
            _sidebar.fadeOut(200);
            _mArea.hide();
        });
        $('body').removeClass('noscroll');
        _overlay.fadeOut();
        liHasChild.children('ul').hide();
    }
    // 打開選單動作
    _sidebarCtrl.click(function(e) {
        showSidebar();
        e.preventDefault();
    });
    // 關閉動作
    _overlay.add(_sidebarClose).off().click(function() {
        hideSidebar();
    });
    _overlay.off("mouseenter");
    // 無障礙tab設定
    liHasChild.keyup(function() {
        $(this).children('ul').fadeIn();
        $(this).siblings().focus(function() {
            $(this).hide();
        });
    });
    _menu.find('li').keyup(function() {
        $(this).siblings().children('ul').hide();
    });
    _menu.find('li:last>a').focusout(function() {
        _menu.find('li ul').hide();
    });
    //設定resize 計時器
    var resizeTimer;
    _window.bind('resize load', function(event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // switch PC/MOBILE 
            ww = _window.outerWidth();
            if (ww < wwSmall) {
                /*-----------------------------------*/
                /////////////// 手機版設定 /////////////
                /*-----------------------------------*/
                menu_status = false;
                _sidebar.hide();
                _overlay.hide();
                _nav.prependTo(_mArea);
                _menu.prependTo(_mArea);
                _search.prependTo(_body);
                _search.addClass('m_search');
                _mArea.css({
                    'margin-left': _mArea.width() * -1 + 'px'
                });
                liHasChild.on({
                    mouseenter: function() {
                        $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
                    },
                    mouseleave: function() {
                        $(this).parent().siblings('ul').hide();
                        $(this).children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                    }
                });
                // 副選單點出
                liHasChild.off().on('mouseenter,mouseleave');
                liHasChild.on('touchstart', function() {
                    $(this).off('mouseenter,mouseleave');
                });
                liHasChild.off().on('click', function(e) {
                    $(this).siblings('li').children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                    $('.sidebar .menu .hasChild .hasChild>ul').hide(); //第三層關閉
                    $(this).children('ul').stop(true, true).slideToggle('600', 'easeOutQuint');
                    // $(this).prop('disabled', true);
                    // e.preventDefault();
                });
                $('.sidebar .menu .hasChild>a').off().on('click', function(e) {
                    e.preventDefault();
                }) //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
                // 行動版查詢
                var _searchCtrl = $('.searchCtrl');
                $('.m_search').hide();
                _searchCtrl.off().on('click', function(e) {
                    if (!search_mode) {
                        $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
                        search_mode = true;
                    } else {
                        $('.m_search').hide();
                        search_mode = false;
                    }
                });
                // 如果點在外面
                $('.main').off().on('click touchend', function(e) {
                    $('.m_search').hide();
                    search_mode = false;
                });
            } else {
                /*-----------------------------------*/
                /////////////// PC版設定 /////////////
                /*-----------------------------------*/
                hideSidebar();
                $('body').removeClass('noscroll');
                _nav.prependTo('.header .container');
                _search.appendTo('.header .container');
                _menu.appendTo('.header .container');
                _search.removeClass('m_search');
                _search.show();
                liHasChild.children('ul ul ul').css('display', 'block');
                // 副選單滑出
                liHasChild.on({
                    // 滑鼠進去
                    mouseenter: function() {
                        $(this).children('ul').stop(true, false).fadeIn();
                    },
                    // 滑鼠移出
                    mouseleave: function() {
                        $(this).parent().siblings('ul').hide();
                        $(this).children('ul').stop(true, false).fadeOut();
                    }
                });
                // !!!!!把第三層的li取消 mouseleave 的動作
                $('.menu .hasChild .hasChild').off('mouseleave');
                // 如果點在外面
                $(document).on('touchend click', function(e) {
                    var target = e.target;
                    if (!$(target).is('.menu li a')) {
                        $('.menu').find('li ul').hide();
                    }
                });
            }
        }, 0);
    });
    // 固定版頭
    //---------------------------------------navbar fixed---------//
    // var hh = $('.header').outerHeight(),
    //     menuH = _menu.outerHeight(),
    //     navH = $('.navbar').height();
    // headerFix();
    // var resizeTimer;
    // _window.resize(function() {
    //     clearTimeout(resizeTimer);
    //     resizeTimer = setTimeout(function() {
    //         hh = $('.header').outerHeight(true);
    //         headerFix();
    //     }, 200);
    // });
    // function headerFix() {
    //     _window.bind("load scroll resize", function(e) {
    //         ww = _window.width();
    //         if (ww >= wwSmall && $(this).scrollTop() > hh - menuH) {
    //             $('.header').addClass('fixed');
    //             $('.header').css('margin-top', menuH - hh);
    //             $('.main').css('margin-top', hh);
    //             // $(window).resize();
    //         } else {
    //             $('.header').removeClass('fixed');
    //             $('.header').css('margin-top', 0);
    //             $('.main').css('margin-top', 0);
    //         }
    //     });
    // }
    hh = Math.floor($('.header').outerHeight(true));
    customHeight = 159 - 60; // header高度 - menu高度，每個專案不同，請另外填寫。
    if ($('header .menu').length > 0) {
        var stickyMenuTop = Math.floor($('header .menu').offset().top);
        // console.log(stickyMenuTop);
        headerHeight = Math.floor($('.header').outerHeight(true));
        menuH = Math.floor(_menu.outerHeight(true));
        $(window).bind("load scroll resize", function(e) {
            ww = _window.outerWidth();
            if (ww >= wwSmall && $(this).scrollTop() > 0) {
                $('.header').addClass('fixed');
                $('.header').css('margin-top', -1 * customHeight);
                // $('.main').css('margin-top', 195 );
                // $('.main').css('margin-top', 0);
            } else {
                $('.header').removeClass('fixed');
                $('.header').css('margin-top', 0);
                $('.main').css('margin-top', 0);
            }
        });
    }
    /*-----------------------------------*/
    //////////// notice訊息區塊 ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
    });
    /*-----------------------------------*/
    //////////// Accordion設定 ////////////
    /*-----------------------------------*/
    $('.accordion').each(function() {
        $(this).find('.accordion-content').hide();
        var _accordionItem = $(this).children('ul').children('li').children('a');
        _accordionItem.each(function() {
            $(this).click(function(e) {
                $(this).parent('li').siblings().children('.accordion-content').slideUp();
                $(this).next('.accordion-content').slideToggle();
                e.preventDefault();
            });
        });
    });
    /*-----------------------------------*/
    /////////////fatfooter開關/////////////
    /*-----------------------------------*/
    $('.btn-fatfooter').click(function(e) {
        $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
            if ($(this).is(':visible')) {
                $('.btn-fatfooter').html("收合");
                $('.btn-fatfooter').attr('name', '收合選單');
            } else {
                $('.btn-fatfooter').html("展開");
                $('.btn-fatfooter').attr('name', '展開選單');
            }
        });
        $(this).stop(true, true).toggleClass('close');
    });
    /*-----------------------------------*/
    ////////img objectfix cover////////////
    /*-----------------------------------*/
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    /*-----------------------------------*/
    //////////////相簿縮圖+燈箱//////////////
    /*-----------------------------------*/
    //縮圖，same as thumbnail模組
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    //相簿JQ設定
    $('.gallery').append('<div class="lightbox"><a href="#" class="light_close">關閉</a><a href="#" class="light_prev">上一張</a><a href="#" class="light_next">下一張</a><img src="" alt=""><div class="galler_overlay"></div></div>')
    $('.gallery .lightbox').hide(); // lightbox先隱藏
    $('.light_close').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到close，lightbox隱藏
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
    });
    $('.gallery .lightbox .galler_overlay').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到overlay，lightbox隱藏
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
    });
    var PIC_SRC = $('.gallery .lightbox img').attr('src');
    // var THUMB_PIC = $(this).attr('src');
    var PIC_INDEX = 0;
    $('.gallery a').click(function(e) {
        e.preventDefault();
    });
    $('.gallery .thumbnail img').each(function(index) {
        $(this).click(function(e) {
            var THUMB_H3 = $(this).attr('alt');
            $('body').addClass('noscroll');
            $('.gallery .lightbox').append('<div class="caption">' + THUMB_H3 + '<div>');
            THUMB_PIC = $(this).attr('src');
            $('.gallery .lightbox img').attr('src', THUMB_PIC);
            $('.gallery .lightbox').fadeIn();
            $('.gallery .lightbox .galler_overlay').fadeIn();
            PIC_INDEX = index;
            e.preventDefault();
        });
    });
    //計算當頁縮圖數量
    var PIC_NUM = $('.gallery .thumbnail').length;
    // 下一張 function
    function NEXT_MOV() {
        //pic_index+1 如果小於 圖片數量
        if ((PIC_INDEX + 1) < PIC_NUM) {
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX++; //pic_index ++
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = 0 //如果等於或大於圖片數量 pic_index =0 ，跳到第一張
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
        e.preventDefault();
    }
    $('.gallery .light_next').click(function(e) {
        NEXT_MOV();
        e.preventDefault();
    });
    // 上一張 function
    function PREV_MOV() {
        if ((PIC_INDEX + 1) > 1) { //pic_index+1  如果大於 1
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX--; //pic_index --
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = PIC_NUM - 1; //如果等於或小於圖片數量 pic_index =圖片數量-1 ，跳到最後一張
        }
        //取縮圖 img src
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
    }
    $('.gallery .light_prev').click(function(e) {
        PREV_MOV();
        e.preventDefault();
    });
    // 左右按鍵移動
    $('body').keydown(function(e) {
        if (e.keyCode == 37) {
            PREV_MOV();
        } else if (e.keyCode == 39) {
            NEXT_MOV();
        } else if (e.keyCode == 27) {
            $('.gallery .lightbox').hide();
        }
    });
    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    // var resizeTimer1;
    // _window.resize(function() {
    //     clearTimeout(resizeTimer1);
    //     resizeTimer1 = setTimeout(function() {
    //         ww = _window.width();
    //     }, 200);
    // });
    // $.fn.tabs = function(options) {
    //     var defaults = {
    //         tiGap: 10,
    //         selected: function() {},
    //         isContentSlick: false,
    //         mouseover: false
    //     }
    //     function resize() {
    //         var _tab = $(this),
    //             _tabItem = _tab.find('.tabItem'),
    //             _tabItemA = _tabItem.children('a'),
    //             _tabContent = _tab.find('.tabContent'),
    //             tabwidth = _tab.width(),
    //             tabItemHeight = _tabItem.outerHeight(),
    //             tabContentHeight = _tab.find('.active').next().innerHeight(),
    //             tiGap = defaults.tiGap,
    //             tabItemLength = _tabItem.length,
    //             tabItemWidth;
    //         _tab.find('.active').next('.tabContent').show();
    //         if (ww > wwSmall) {
    //             _tabContent.css('top', tabItemHeight);
    //             _tab.height(tabContentHeight + tabItemHeight);
    //             tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
    //             _tabItem.width(tabItemWidth).css('margin-left', tiGap);
    //             _tabItem.first().css('margin-left', 0);
    //             _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth + 1);
    //         } else {
    //             _tab.css('height', 'auto');
    //             _tabItem.width(tabwidth);
    //             _tabItem.css('margin-left', 0).last().css('position', 'relative');
    //         }
    //     }
    //     function slickInit(content, options) {
    //         if ($.fn.slick == null) {
    //             console.log("not find slick plugin");
    //             return false;
    //         }
    //         var defaultOption = {
    //             infinite: true,
    //             speed: 2000,
    //             autoplay: false,
    //             slidesToShow: 6,
    //             slidesToScroll: 6,
    //             dots: true,
    //             responsive: [{
    //                     breakpoint: 1200,
    //                     settings: {
    //                         slidesToShow: 4,
    //                         slidesToScroll: 4,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 992,
    //                     settings: {
    //                         slidesToShow: 3,
    //                         slidesToScroll: 3,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 620,
    //                     settings: {
    //                         slidesToShow: 2,
    //                         slidesToScroll: 2,
    //                         dots: false,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 430,
    //                     settings: {
    //                         slidesToShow: 1,
    //                         slidesToScroll: 1,
    //                         dots: false,
    //                     }
    //                 }
    //             ]
    //         }
    //         defaultOption = $.extend(defaultOption, options);
    //         $(content).find(".themebook.slick-initialized").slick("unslick");
    //         var current = $(content).find(".themebook");
    //         if (!current.is(".slick-slider")) {
    //             current.slick(defaultOption);
    //         }
    //     }
    //     return this.each(function() {
    //         var option = $.extend(defaults, options);
    //         var _tab = $(this),
    //             _tabItem = _tab.find('.tabItem'),
    //             _tabItemA = _tabItem.children('a'),
    //             _tabContent = _tab.find('.tabContent'),
    //             tabwidth = _tab.width(),
    //             tabItemHeight = _tabItem.outerHeight(),
    //             tabContentHeight = _tab.find('.active').next().innerHeight(),
    //             tiGap = defaults.tiGap,
    //             mouseover = defaults.mouseover,
    //             isContentSlick = defaults.isContentSlick,
    //             tabItemLength = _tabItem.length,
    //             tabItemWidth;
    //         _tab.find('.active').next('.tabContent').show();
    //         if (ww > wwSmall) {
    //             _tabContent.css('top', tabItemHeight);
    //             _tab.height(tabContentHeight + tabItemHeight);
    //             tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
    //             _tabItem.width(tabItemWidth).css('margin-left', tiGap);
    //             _tabItem.first().css('margin-left', 0);
    //             _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth + 1);
    //         } else {
    //             _tab.css('height', 'auto');
    //             _tabItem.width(tabwidth);
    //             _tabItem.css('margin-left', 0).last().css('position', 'relative');
    //         }
    //         resize = $.proxy(resize, _tab);
    //         $(window).resize(resize);
    //         tabs = $.proxy(tabs, { tab: _tab, selected: option.selected, option: option });
    //         //_tabItemA.click(tabs);
    //         _tabItemA.focus(tabs);
    //         if (mouseover) {
    //             _tabItemA.mouseover(function() { $(this).focus() });
    //         }
    //         tabs(_tabItemA.eq(0));
    //         function tabs(e) {
    //             console.log(e);
    //             var _tab = this.tab;
    //             var _tabItemNow = $(e.target || e.get(0)).parent(),
    //                 tvp = _tab.offset().top,
    //                 tabItemHeight = _tabItemNow.outerHeight()
    //             tabIndex = _tabItemNow.index() / 2,
    //                 scollDistance = tvp + tabItemHeight * tabIndex - hh;
    //             var _tabItem = _tab.find('.tabItem');
    //             _tabItem.removeClass('active');
    //             _tabItemNow.addClass('active');
    //             if (ww <= wwSmall) {
    //                 _tabItem.not('.active').next().slideUp();
    //                 _tabItemNow.next().slideDown();
    //                 this.selected.call(null, _tab, _tabItemNow, _tabItemNow.next());
    //                 if (this.option.isContentSlick) {
    //                     slickInit(_tabItemNow.next(), this.option.slickOption);
    //                 }
    //                 $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
    //             } else {
    //                 _tabItem.not('.active').next().hide();
    //                 _tabItemNow.next().show();
    //                 this.selected.call(null, _tab, _tabItemNow, _tabItemNow.next());
    //                 if (this.option.isContentSlick) {
    //                     slickInit(_tabItemNow.next(), this.option.slickOption);
    //                 }
    //                 tabContentHeight = _tabItemNow.next().innerHeight();
    //                 _tab.height(tabContentHeight + tabItemHeight);
    //             }
    //         }
    //     })
    // }
    $(function() {
        $('.tabs').find('.active').next('.tabContent').show();
        var tw = $('.tabSet').width();
        var tabItemHeight = $('.tabs>.tabItem').height();
        $('.tabs').find('.tabContent').css('top', tabItemHeight);
        var i = 0;

        function tabs() {
            i = $('.tabSet .example-5').find(".tabItem>a").index(this);
            var WindowW = $(window).width();
            $('.example-5 .tabContent').hide(); //先把全部關掉
            var tabItemHeight = $('.tabs>.tabItem').height();
            $('.tabs').find('.tabContent').css('top', tabItemHeight);
            $('.tabSet').each(function() {
                tw = $(this).width();
                var tabItemHeight = $(this).find('.tabs>.tabItem').height();
                $(this).children('.tabs').find('.tabContent').css('top', tabItemHeight);
                var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight();
                // console.log(tabContentHeight);
                var tabItemLength = $(this).find('.tabItem').length;
                $(this).height(tabContentHeight + tabItemHeight);
                var tabWidth = Math.ceil(tw / tabItemLength);
                $(this).find('.tabItem>a').width(tabWidth);
                if (WindowW >= 768) {
                    $(this).find('.tabItem:last').css({
                        position: 'absolute',
                        right: '0',
                    });
                    $('.example-5').find('.tabItem:last').css({
                        position: 'relative',
                        right: '0',
                    });
                } else {
                    $(this).find('.tabItem:last').css({
                        position: 'relative',
                        right: '0',
                    });
                }
                tabContentHeight = $(this).parent('.tabItem').next('.tabContent').innerHeight();
                // console.log(tabContentHeight);
                $(this).parents('.tabSet').height(tabContentHeight + tabItemHeight);
            });
            $(this).parent('.tabItem').siblings().removeClass('active');
            $(this).parent('.tabItem').addClass('active');
            $('.tabs').find('.active').next('.tabContent').show();
            // return false;
        }
        //輪播
        var WindowW = $(window).width();
        var length = $('.tabSet .example-5').find(".tabItem>a").length;
        if (WindowW >= 768) {
            var testfinal = setInterval(testFC, 3000);
            $('.tabSet .example-5').find(".tabItem>a").focus(function() { clearInterval(testfinal); });
            $('.tabSet .example-5').find(".tabItem>a").focusout(function() {
                i++;
                if (i > length - 1) {
                    i = 0;
                }
                testfinal = setInterval(testFC, 3000);
            });

            function testFC() {
                if ($('.tabSet .example-5').find(".tabItem>a")[i] != null) {
                    $('.tabSet .example-5').find(".tabItem>a")[i].click(tabs);
                }
                i++;
                if (i > length - 1) {
                    i = 0;
                }
            };
        };
        //輪播
        // 頁籤點
        $('.tabs>.tabItem>a').focus(tabs);
        $('.tabs>.tabItem>a').click(tabs);
        $('.example-3>.tabItem>a').mouseenter(tabs);
        $('.example-3>.tabItem>a').mouseenter(function() {
            $(this).parent('.tabItem').addClass('active');
            //  $(this).parent().siblings().find('a').css('background','transparent');
            // $(this).css('background','#CCC');
            //$('.example-3').trigger('resize');
            tabs();
        });
        $(".example-3>.tabItem").each(function(index, el) {
            var My_URL = $(this).children('a').prop('href');
            var item = $(this);
            $(window).bind("load resize", function(e) {
                var WindowW = $(window).width();
                // console.log(WindowW);
                // console.log($(this).children('a').prop('href'));
                if (WindowW >= 768) {
                    item.children('a').prop('href', My_URL);
                    item.children('a').prop('target', '_blank');
                } else {
                    item.children('a').prop('href', 'javascrip:;');
                    item.children('a').prop('target', '_self');
                }
            });
        });
        // 網頁讀的時候算一次
        $(window).on("load resize", function(e) {
            tabs();
        });
        // 
        $('.custom a.small').click(function() {
            tabs();
        });
        $('.custom a.middle').click(function() {
            tabs();
        });
        $('.custom a.big').click(function() {
            tabs();
        })
    });
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop').click(function(e) {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeOutExpo');
        e.preventDefault();
    });
    $('.scrollToTop').keydown(function(e) {
        _body.find('a:first').focus();
        e.preventDefault();
    });
    /*--------------------------------------------------------*/
    /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
    /*--------------------------------------------------------*/
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".img-container").each(function() {
            var imgUrl = $(this).children('a').children('img').attr('src');
            var $container = $(this);
            $(this).has(".cover").find('a').addClass("ie-object-cover");
            $(this).has(".cover").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".fill").find('a').addClass("ie-object-fill");
            $(this).has(".fill").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".contain").find('a').addClass("ie-object-contain");
            $(this).has(".contain").find('a').css("backgroundImage", "url(" + imgUrl + ")");
        });
    }
    /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function(e) {
        // alt+S 查詢
        if (e.altKey && e.keyCode == 83) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('.searchin').slideDown();
            $('.searchin').find('input[type="text"]').focus();
            $('.Hotsearch').find('input[type="text"]').focus();
        }
        // alt+U header
        if (e.altKey && e.keyCode == 85) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.keyCode == 67) {
            $('html, body').stop(true, true).animate({ scrollTop: $('.main').find('.accesskey').offset().top - 70 }, 800, 'easeOutExpo');
            $('.main').find('.accesskey').focus();
        }
        // alt+Z footer
        if (e.altKey && e.keyCode == 90) {
            $('html, body').stop(true, true).animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('footer').find('.accesskey').focus();
        }
    });
});