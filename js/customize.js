//自行加入的JS請寫在這裡
//字型大中小
$(function() {
    $('.custom a.small').click(function() {
        $('.main').removeClass('middleword').removeClass('bigword').addClass('smallword')
    });
    $('.custom a.middle').click(function() {
        $('.main').removeClass('smallword').removeClass('bigword').addClass('middleword')
    });
    $('.custom a.big').click(function() {
        $('.main').removeClass('smallword').removeClass('middleword').addClass('bigword')
    })
})
//熱門文章
$(function() {
    $("#b_news").click(function() {
        $("#b_cont").stop().fadeToggle(); //加.stop()才不會一直切換
        return false;
    });
});

//Accordion
$(function() {
    $('.accordionblock ul').css('display', 'none');
    $('.accordionblock .topic').click(function() {
        $(this).next('.answer').children('ul').slideToggle();
        $(this).parent().siblings().find('ul').slideUp();
        $(this).parent().siblings().children('.topic').removeClass('turnicon');
        $(this).toggleClass('turnicon');
        //無障礙調整
        if ($(this).hasClass('turnicon')) {
            $(this).parent().siblings().children('.topic').each(function(i, e) {
                if ($(this).hasClass('unaccordion')) {} else {
                    $(this).attr('aria-expanded', 'false');
                }
            });
            $(this).attr('aria-expanded', 'true');
        } else {
            $(this).attr('aria-expanded', 'false');
        }
        //
    })
    $('.accordionblock.open ul').css('display', 'block');
    $('.accordionblock.open').children('.topic').addClass('turnicon');
    ////無障礙調整
    $('.accordionblock .topic').keypress(function(event) {
        var code = event.keyCode || event.which;
        if (code == 32 || code == 13) {
            $(this).click();
        }
    });
    $('.accordionblock .topic').each(function(i, e) {
        if ($(this).hasClass('unaccordion')) {} else {
            if ($(this).hasClass('turnicon')) {
                $(this).attr('aria-expanded', 'true');
            } else {
                $(this).attr('aria-expanded', 'false');
            }
        }
    });
    //
})
//Accordionqa
$(function() {
    $('.accordionblock .A').css('display', 'none');
    $('.accordionblock .Q').click(function() {
        $(this).next('.A').slideToggle();
        $(this).parent().siblings().children('.A').slideUp();
        $(this).parent().siblings().children('.Q').removeClass('turnicon');
        $(this).toggleClass('turnicon')
    })
})
//slick
$(function() {
    // 
    $('.highlightsdata').slick({
    dots: true, //顯示原點
    speed: 1000,
    arrows: true, //左右箭頭
    autoplay: false, //自動播放
    infinite: true, //無限輪播
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 420,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});
    
   
    //cp2
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        dots: false, //要不要顯示圓點
    });
    //cp_photo
    $('.cp_photo').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true, //自動播放
        cssEase: 'linear'
    });
    $('.importantlink2').slick({
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    vertical: false,
                    // arrows: true,  
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    vertical: false,
                    // arrows: true, 
                }
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});
//內頁查詢
$(function() {
    $('.searchbtn').click(function() {
        $('.searchin').stop().slideToggle();
        $("#mustSameAsId").focus()
    })
    $('.searchin .btn_grp').find('input').focusout(function() {
        $('.searchin').hide();
    });
})
// 點外面關閉

$(function() {
    $(document).on('touchend click', function(e) {
        var container = $(".header .searchbtn, .header .searchin");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.header .searchin').slideUp();
        }
    });
})
//我要發問
$(function() {
     var question_btnStatus = false; // 假的判斷式，先設定沒有開啟
    $('.question .button').click(function() {
        $('.question .block').stop().slideToggle();
    })
    $('.question .del').click(function() {
        $('.question .block').stop().slideUp();
    })
    
    $('.question ul li:last a').focusout(function(){
        $('.question .block').stop().slideUp();
    })
    if (question_btnStatus = true) {
        $('body').keydown(function(e) {
            if (e.keyCode == 27) {
                $('.question .block').slideUp();
            }
        });
    }
})
//生育福利站
$(function() {
    $('map area').click(function() {
        var _this = $(this);
        $("#mp-" + _this.data("contentid") + " a").click();
        var tabContentHeight = $(".tabSet").find('.active').next('.tabContent').innerHeight();
        $(".tabSet").height(tabContentHeight);
        $('body,html').stop(true, true).animate({ scrollTop: $('#' + _this.data("anchorid")).offset().top - 50 }, 1200, 'easeOutExpo');
    })
})

// 影片燈箱區
$(function() {
    $('.moviebox .close').click(function() {
        $('.movie_lightbox').fadeOut()
    })
    $('.movie_lightbox').click(function() {
        $('.movie_lightbox').fadeOut()
    })
})
$(function() {
    $('a.goCenter').keydown(function(e) {
        if (e.which == 13) {
            $('#aC').focus(); /*#aC 是中間定位點的id*/
        }
    });
})
//
rwdTable();

function rwdTable() {
    $('.table_list').find('table').each(function() {
        var $row = $(this).find('tr');
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
            $(this).find('th').each(function(index) {
                var thText = $(this).text();
                $row.eq(n).find('td').eq(index).attr('data-title', thText);
            });
        }
    });
}

$(function() {
    var item = $('.music'),
        music = new Audio('images/car-honk-1.mp3');
    item.hover(function() {
        music.play();
    }, function() {
        music.stop();
    });
})