
$(function() {
    /*-----------------------------------*/
    ///////////// fix iOS bug /////////////
    /*-----------------------------------*/
    document.documentElement.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    }, false);
    /*-----------------------------------*/
    ///////////////// 霈𦠜彍 ////////////////
    /*-----------------------------------*/
    var _window = $(window),
        ww = _window.width(),
        wh = _window.height(),
        _body = $('body'),
        wwNormal = 1200,
        wwMedium = 992,
        wwSmall = 768,
        wwxs = 576;
    /*-----------------------------------*/
    //////////// nojs ��宏�膄////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/
    //////////// nav憒���𨀣�匧�拙�钅�詨鱓///////////
    /*-----------------------------------*/
    var _navLength = $('.navigation ul').length;
    $(window).bind('load', function() {
        if (_navLength > 1) {
            $('.navigation ul:nth-child(1)').addClass('left_nav');
        }
    });
    /*-----------------------------------*/
    /////// header�詨鱓 tab��� fix閮剖��////////
    /*-----------------------------------*/
    var _menu = $('.header .menu');
    _menu.find('li').has('ul').addClass('hasChild');
    var liHasChild = _menu.find('li.hasChild');
    var subMenuWidth = liHasChild.first().children('ul').outerWidth();
    /*-----------------------------------*/
    ////////////// 銵��閧���詨鱓�����////////////
    /*-----------------------------------*/
    $('body').prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">��𣈯��</button></div><div class="menu_overlay"></div></aside>');
    $('header .container').prepend('<button type="button" class="sidebarCtrl">�湔��詨鱓</button>');
    // $('header .container').prepend('<button type="button" class="sidebarCtrl">�湔��詨鱓</button><button type="button" class="searchCtrl">�䰻閰�</button>');�訜header 銝漤�閬�search��嚗峕䰻閰Ｙ�button閬���𣈯��
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
    // ��㯄�钅�詨鱓 function
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
    // 蝮桀���詨鱓 function
    function hideSidebar() {
        _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function() {
            _sidebar.fadeOut(200);
            _mArea.hide();
        });
        $('body').removeClass('noscroll');
        _overlay.fadeOut();
        liHasChild.children('ul').hide();
    }
    // ��㯄�钅�詨鱓��蓥��
    _sidebarCtrl.click(function(e) {
        showSidebar();
        e.preventDefault();

    });
    // ��𣈯�匧�蓥��
    _overlay.add(_sidebarClose).off().click(function() {
        hideSidebar();
    });
    _overlay.off("mouseenter");
    // �⊿�𦦵�脌ab閮剖��
    liHasChild.keyup(
        function() {
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

    //閮剖�鬏esize 閮���膥
    var resizeTimer;
    _window.bind('resize load', function(event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // switch PC/MOBILE 
            ww = _window.width();
            if (ww < wwSmall) {
                /*-----------------------------------*/
                /////////////// ��𧢲�毺��身摰� /////////////
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
                // ���詨鱓暺𧼮枂
                liHasChild.off().on('mouseenter,mouseleave');
                liHasChild.on('touchstart', function() {
                    $(this).off('mouseenter,mouseleave');
                });
                liHasChild.off().on('click', function(e) {
                    $(this).siblings('li').children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                     $('.sidebar .menu .hasChild .hasChild>ul').hide();//第三層關閉
                    $(this).children('ul').stop(true, true).slideToggle('600', 'easeOutQuint');
                    // $(this).prop('disabled', true);
                    // e.preventDefault();
                });
                $('.sidebar .menu .hasChild>a').off().on('click', function(e) {
                    e.preventDefault();
                }) //��𧢲�毺��洵蝚砌�撅日�硺�銝齿��脣�亙�折�嚗峕嚉��厩洵銝�撅斤����鞟�∩�𦦵鍂
                // 銵��閧��䰻閰�
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
                // 憒���𣈯�𧼮銁憭㚚𢒰
                $('.main').off().on('click touchend', function(e) {
                    $('.m_search').hide();
                    search_mode = false;
                });
            } else {
                /*-----------------------------------*/
                /////////////// PC���身摰� /////////////
                /*-----------------------------------*/
                hideSidebar();
                $('body').removeClass('noscroll');
                _nav.prependTo('.header .container');
                _search.appendTo('.header .container');
                _menu.appendTo('.header .container');
                _search.removeClass('m_search');
                _search.show();
                liHasChild.children('ul ul ul').css('display', 'block');
                // ���詨鱓皛穃枂
                liHasChild.on({
                    mouseenter: function() {
                        $(this).children('ul').stop(true, false).fadeIn();
                    },
                    mouseleave: function() {
                        $(this).parent().siblings('ul').hide();
                        $(this).children('ul').stop(true, false).fadeOut();
                    }
                });
                 // !!!!!把第三層的li取消 mouseleave 的動作
                $('.menu .hasChild .hasChild').off('mouseleave');
                // 憒���𣈯�𧼮銁憭㚚𢒰
                $(document).on('touchend click', function(e) {
                    var target = e.target;
                    if (!$(target).is('.menu li a')) {
                        $('.menu').find('li ul').hide();
                    }
                });
            }
        }, 50);
    });
    // �𤐄摰𡁶���
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


    var hh = $('.header').innerHeight(),
        menuH = _menu.height(),
        navH = $('.navbar').height();
    $(window).bind("load scroll resize", function(e) {
        ww = _window.width();
        // console.log('menuH'+menuH);
        //     console.log('hh'+hh)
        if (ww >= wwSmall && $(this).scrollTop() > hh - menuH) {
            $('.header').addClass('fixed');
            $('.header').css('margin-top', menuH - hh);
            $('.main').css('margin-top', hh);;
        } else {
            $('.header').removeClass('fixed');
            $('.header').css('margin-top', 0);
            $('.main').css('margin-top', 0);
        }
    });

    /*-----------------------------------*/
    //////////// notice閮𦠜�臬�憛� ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
    });
    /*-----------------------------------*/
    //////////// Accordion閮剖�� ////////////
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
    /////////////fatfooter��钅��/////////////
    /*-----------------------------------*/
    $('.btn-fatfooter').click(function(e) {

        $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
            if ($(this).is(':visible')) {
                $('.btn-fatfooter').html("�𤣰���");
                $('.btn-fatfooter').attr('name', '�𤣰����詨鱓');
            } else {
                $('.btn-fatfooter').html("撅閖��");
                $('.btn-fatfooter').attr('name', '撅閖�钅�詨鱓');
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
    //////////////�㮾蝪輻葬���+���拳//////////////
    /*-----------------------------------*/
    //蝮桀�吔�众ame as thumbnail璅∠�
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
    //�㮾蝪澴Q閮剖��
    $('.gallery').append('<div class="lightbox"><a href="#" class="light_close">��𣈯��</a><a href="#" class="light_prev">銝𠹺�撘�</a><a href="#" class="light_next">銝衤�撘�</a><img src="" alt=""><div class="galler_overlay"></div></div>')
    $('.gallery .lightbox').hide(); // lightbox��黸���
    $('.light_close').click(function(event) {
        $('.gallery .lightbox').hide(); // 憒���𣈯�𧼮�close嚗𨧣ightbox�黸���
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
    });
    $('.gallery .lightbox .galler_overlay').click(function(event) {
        $('.gallery .lightbox').hide(); // 憒���𣈯�𧼮�overlay嚗𨧣ightbox�黸���
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
    //閮��㛖訜��蝮桀�𡝗彍���
    var PIC_NUM = $('.gallery .thumbnail').length;
    // 銝衤�撘� function
    function NEXT_MOV() {
        //pic_index+1 憒���𨅯�𤩺䲰 ��𣇉��彍���
        if ((PIC_INDEX + 1) < PIC_NUM) {
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//��㚚�䀹彍
            PIC_INDEX++; //pic_index ++
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = 0 //憒���𦦵�㗇䲰��硋之�䲰��𣇉��彍��� pic_index =0 嚗諹歲��蝚砌�撘�
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //�𦆮�亦��拳 img src
        e.preventDefault();
    }
    $('.gallery .light_next').click(function(e) {
        NEXT_MOV();
        e.preventDefault();
    });
    // 銝𠹺�撘� function
    function PREV_MOV() {
        if ((PIC_INDEX + 1) > 1) { //pic_index+1  憒���𨅯之�䲰 1
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//��㚚�䀹彍
            PIC_INDEX--; //pic_index --
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = PIC_NUM - 1; //憒���𦦵�㗇䲰��硋�𤩺䲰��𣇉��彍��� pic_index =��𣇉��彍���-1 嚗諹歲����敺䔶�撘�
        }
        //��𣇉葬��� img src
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //�𦆮�亦��拳 img src
    }
    $('.gallery .light_prev').click(function(e) {
        PREV_MOV();
        e.preventDefault();
    });
    // 撌血𢰧��厰枤蝘餃��
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
    ////////////////憭𡁶�Tab////////////////
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

        function tabs() {
            var WindowW = $(window).width();
            $('.tabs').find('.active').next('.tabContent').show();
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
            // return false;
        }
        // ��蝐日��
        $('.tabs>.tabItem>a').focus(tabs);
        $('.tabs>.tabItem>a').click(tabs);
        $('.example-3>.tabItem>a').mouseenter(tabs);
        $('.example-3>.tabItem>a').mouseenter(function() {
            $(this).parent('.tabItem').addClass('active');
            //  $(this).parent().siblings().find('a').css('background','transparent');
            // $(this).css('background','#CCC');
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

        // 蝬脤�霈������嗵�𦯀�甈�
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
    ///////////////蝵桅�go to top////////////
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
        $('html, body').animate({ scrollTop: 0 }, 400, 'easeOutQuint');
        e.preventDefault();
    });
    /*--------------------------------------------------------*/
    /////閮剖�餜mg �銁IE9+ SAFARI FIREFOX CHROME �虾隞叨bject-fit/////
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
});