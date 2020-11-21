(function($) {

    'use strict';
  
    /*--------------------------------------------------------------
      ## Scripts initialization
    --------------------------------------------------------------*/
  
    $(window).on('load', function() {
      isotopMsSetup();
      preloader();
      youtubePlaylist();
      onePage();
    });
  
    $(document).on('qv_loader_stop', function() {
      qtyStepper();
    });
  
    $(document).on('ready', function() {
      scrollUp();
      browserCompatible();
      primaryMenuSetup();
      lightGallery();
      $(window).trigger('resize');
      elementornegativeMargin();
      mobileMenu();
      isotopMsSetup();
      pageHeightOf404();
      swiperSlider();
      accordianSetup();
      modalVideo();
      tabs();
      modal();
      customSelectSetup();
      customQuantity();
      lineChart();
      roundChart();
      countDown();
      horizontalProgressBar();
      stickyFooter();
      beforeAfterSlider();
      googleMap();
      postVoteCount();
      tbSvgShape();
      appleTVeffect();
      qtyStepper();
      ajaxPagination();
      onePage();
      foodMenuList();
      parallax();
      searchModal();
      audioPlayerSetup();
      sectionScroll();
      zoomEffect();
      datePickerSetup();
      cursorPlus();
    });
  
    $(window).on('resize', function() {
      mobileMenu();
      isotopMsSetup();
      pageHeightOf404();
      stickyFooter();
      beforeAfterSlider();
    });
  
    $(window).on('scroll', function() {
      scrollFunction();
      horizontalProgressBar();
      stickyFooter();
    });
  
    $.exists = function(selector) {
      return ($(selector).length > 0);
    }
  
  
    /*--------------------------------------------------------------
      ## Preloader
    --------------------------------------------------------------*/
  
    function preloader() {
      $(".tb-preloader-in").fadeOut();
      $(".tb-preloader").delay(150).fadeOut("slow");
    }
  
    /*--------------------------------------------------------------
      ## Browser Compatible
    --------------------------------------------------------------*/
    function browserCompatible() {
      // if ($.browser.safari) {
      //   $('.tb-hover-layer').wrap('<div class="tb-hover-layer-wrap tb-style1"></div>')
      // }
    }
    /*--------------------------------------------------------------
      ## Scroll Up
    --------------------------------------------------------------*/
  
    function scrollUp() {
  
      $('#tb-scrollup').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 1000);
      });
  
    }
    /*--------------------------------------------------------------
      ## Elementor Negative Margin
    --------------------------------------------------------------*/
  
    function elementornegativeMargin() {
      $('.elementor-spacer-inner').parents('.elementor-row').addClass('removeNegativeMargin');
    }
  
    /*--------------------------------------------------------------
      ## Primary Menu
    --------------------------------------------------------------*/
  
    function primaryMenuSetup() {
      $('.tb-main-nav').before('<div class="tb-m-menu-btn"><span></span></div>');
      $('.tb-m-menu-btn').on('click', function() {
        $(this).toggleClass('tb-m-menu-btn-ext');
        $(this).siblings('.tb-main-nav').slideToggle('slow');
        $('.tb-full-screen-nav').toggleClass('tb-full-screen-active');
        $(this).parents('.tb-site-header.tb-style2.tb-type1').toggleClass('tb-active-sidenav');
      });
  
      $('.menu-item-has-children ').append('<i class="tb-plus tb-dropdown"></i>');
      $('.tb-dropdown').on('click', function() {
        $(this).prev().slideToggle('slow');
        $(this).toggleClass('tb-plus tb-minus')
      });
      // Mega Menu
      $('.tb-mega-wrapper>li>a').removeAttr("href");
      $('.tb-mega-wrapper>li>a').on('click', function() {
        $(this).siblings().slideToggle();
        $(this).toggleClass('tb-megamenu-plus');
      });
  
      $('.tb-solid-header.tb-sticky-header').before('<div class="tb-solid-header-height"></div>');
  
      if ($.exists('.tb-header-style13 .tb-promotion-bar')) {
        $('.tb-header-style13').addClass('tb-remove-header-padding');
      }
    }
  
    function mobileMenu() {
      if ($(window).width() <= 991) {
        $('.tb-primary-nav').addClass('tb-m-menu').removeClass('tb-primary-nav');
        $('.tb-profile-toggle').addClass('tb-offset-menu');
      } else {
        $('.tb-m-menu').addClass('tb-primary-nav').removeClass('tb-m-menu');
        $('.tb-profile-toggle').removeClass('tb-offset-menu');
      }
      var solidHeaderHight = $('.tb-solid-header').height() + 'px';
      $('.tb-solid-header-height').css('height', solidHeaderHight);
  
      // Transparent Header page
      var pageHeadingPad = (($('.tb-site-header').height()) + 45) + 'px'
      $('.tb-transparent-header+.tb-page-heading-wrap').css('padding-top', pageHeadingPad);
      // Header Promo Bar
      var reduseSolidHeaderHight = (($('.tb-solid-header').height()) - ($('.tb-promotion-bar').height())) + 'px';
      var redusePageHeadingPad = (($('.tb-site-header').height()) - ($('.tb-promotion-bar').height()) + 45) + 'px';
      $('.tb-promotion-cross').on('click', function() {
        $(this).parents('.tb-promotion-bar').slideUp(400);
        $(this).parents('.tb-site-header').siblings('.tb-solid-header-height').css('height', reduseSolidHeaderHight);
        $(this).parents('.tb-site-header').addClass('tb-remove-promobar-active');
      });
      $('.tb-transparent-header .tb-promotion-cross').on('click', function() {
        $('.tb-page-heading-wrap').css('padding-top', redusePageHeadingPad);
      });
      // Header Style2
      $('.tb-site-header.tb-style2').parents('body').addClass('tb-sidebar-parent');
      $('.tb-site-header.tb-style2.tb-type1').parents('body').addClass('tb-sidebar-parent-small');
  
    }
  
  
    /*--------------------------------------------------------------
      ## Scroll Function
    --------------------------------------------------------------*/
  
    function scrollFunction() {
      var scroll = $(window).scrollTop();
      // For Small Header
      if (scroll >= 10) {
        $('.tb-site-header').addClass('small-height');
      } else {
        $('.tb-site-header').removeClass('small-height');
      }
      // Scroll Up
      if (scroll >= 350) {
        $("#tb-scrollup").addClass("scrollup-show");
      } else {
        $("#tb-scrollup").removeClass("scrollup-show");
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Footer Sticky
    --------------------------------------------------------------*/
  
    function stickyFooter() {
      // Sticky Footer
      var footerHeight = ($('.tb-sticky-footer').height());
      var windowHeight = $(window).height();
      var footerHeightPx = footerHeight + 'px';
      $('.tb-content').css("margin-bottom", footerHeightPx);
      if (footerHeight > windowHeight) {
        $('body').addClass('tb-remove-sticky-footer');
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Isotop Initialize
    --------------------------------------------------------------*/
  
    function pageHeightOf404() {
      if ($.exists('.tb-site-header')) {
        var headerHeight = $('.tb-site-header').height();
        $('.tb-error-page').css('margin-top', -headerHeight);
        $('.tb-error-page').css('padding-top', headerHeight);
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Isotop Initialize
    --------------------------------------------------------------*/
  
    function isotopMsSetup() {
      if ($.exists('.tb-isotop')) {
        $('.tb-isotop').isotope({
          itemSelector: '.tb-isotop-item',
          transitionDuration: '0.60s',
          percentPosition: true,
          masonry: {
            columnWidth: '.tb-grid-sizer'
          }
        });
        /* Active Class of Portfolio*/
        $('.tb-isotop-filter ul li').on('click', function(event) {
          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
          event.preventDefault();
        });
        /*=== Portfolio filtering ===*/
        $('.tb-isotop-filter ul').on('click', 'a', function() {
          var filterElement = $(this).attr('data-filter');
          $(this).parents('.tb-isotop-filter').next().isotope({
            filter: filterElement
          });
        });
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Swiper Slider
    --------------------------------------------------------------*/
  
    function swiperSlider() {
  
  
      $('.tb-slider').each(function() {
  
        // Slick Variable
        var $ts = $(this).find('.slick-container');
        var $slickActive = $(this).find('.slick-wrapper');
  
        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Pagination
        var paginaiton = $(this).children().hasClass('pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
  
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        (fadeVar === 1) ? (fadeVar = true) : (fadeVar = false);
  
  
        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '0',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          prevArrow: $(this).find('.slick-arrow-left'),
          nextArrow: $(this).find('.slick-arrow-right'),
          appendDots: $(this).find('.pagination'),
          fade: fadeVar,
          slidesToShow: slidesPerView,
          variableWidth: false,
          responsive: [{
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing
              }
            }
          ]
        });
      })
  
  
  
  
  
    }
  
  
    /*--------------------------------------------------------------
      ## Accordian
    --------------------------------------------------------------*/
  
    function accordianSetup() {
      var $this = $(this);
      $('.tb-accordian').children('.tb-accordian-body').hide();
      $('.tb-accordian.active').children('.tb-accordian-body').show();
      $('.tb-accordian-title').on('click', function() {
        $(this).parent('.tb-accordian').siblings().children('.tb-accordian-body').slideUp(250);
        $(this).siblings().slideDown(250);
        /* Accordian Active Class */
        $(this).parents('.tb-accordian').addClass('active');
        $(this).parent('.tb-accordian').siblings().removeClass('active');
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Modal Video
    --------------------------------------------------------------*/
  
    function modalVideo() {
      $(document).on('click', '.tb-video-open', function(e) {
        e.preventDefault();
        var video = $(this).attr('href');
        $('.tb-video-popup-container iframe').attr('src', video);
        $('.tb-video-popup').addClass('active');
  
      });
      $('.tb-video-popup-close, .tb-video-popup-layer').on('click', function(e) {
        $('.tb-video-popup').removeClass('active');
        $('html').removeClass('overflow-hidden');
        $('.tb-video-popup-container iframe').attr('src', 'about:blank')
        e.preventDefault();
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Tabs
    --------------------------------------------------------------*/
  
    function tabs() {
      $('.tb-tabs.tb-standard-tabs .tb-tab-links a').on('click', function(e) {
        var currentAttrValue = $(this).attr('href');
        $('.tb-tabs ' + currentAttrValue).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
      });
      $('.tb-tabs.tb-fade-tabs .tb-tab-links a').on('click', function(e) {
        var currentAttrValue = $(this).attr('href');
        $('.tb-tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
        $(this).parents('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Custom Modal
    --------------------------------------------------------------*/
  
    function modal() {
      $('[data-modal-toggle]').on('click', function() {
        var modalToggle = $(this).data('modal-toggle');
        $('.tb-modal').each(function() {
          var modaltarget = $(this).attr('id'),
            modalId = ('#' + modaltarget);
          if (modalToggle == modalId) {
            $(modalId).addClass('tb-active');
          }
        });
      });
      // Modal Dismiss Button
      $('.tb-modal-dismiss').on('click', function() {
        $(this).parents('.tb-modal').removeClass('tb-active')
      });
      $(document).on('click', function() {
        $('.tb-modal').removeClass('tb-active');
      });
      $('.tb-modal > div, [data-modal-toggle]').on('click', function(e) {
        e.stopPropagation();
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Custom Select
    --------------------------------------------------------------*/
  
    function customSelectSetup() {
      $('.tb-custom-select').each(function() {
        var classes = $(this).attr('class'),
          id = $(this).attr('id'),
          name = $(this).attr('name');
        var template = '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $('.tb-custom-select-wrap > .tb-custom-select option:first').html() + '</span>';
        template += '<div class="custom-options">';
        $(this).find('option').each(function() {
          template += '<span class="custom-option ' + $(this).attr('class') + ' data-value=' + $(this).attr('value') + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';
  
        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
      });
      $('.custom-select-trigger').on('click', function(event) {
        $('html').one('click', function() {
          $('.tb-custom-select').removeClass('opened');
        });
        $(this).parents('.tb-custom-select').toggleClass('opened');
        event.stopPropagation();
      });
      $('.custom-option').on('click', function() {
        $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
        // $(this).parents('.custom-options').find('.tb-custom-option').removeClass('selection');
        $(this).siblings().removeClass('selection');
        $(this).addClass('selection');
        $(this).parent().children().first().removeClass('selection');
        $(this).parents('.custom-select').removeClass('opened');
        $(this).parent().siblings('.custom-select-trigger').addClass('selector-focus');
        $(this).parents('.tb-custom-select').find('.custom-select-trigger').text($(this).text());
      });
      $('.custom-options .custom-option:first-child').on('click', function() {
        $(this).parent().siblings('.custom-select-trigger').removeClass('selector-focus');
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Color Customizer
    --------------------------------------------------------------*/
  
    function lightGallery() {
      $('.tb-lightgallery').each(function() {
        $(this).lightGallery({
          selector: '.tb-lightbox-item',
          subHtmlSelectorRelative: true,
        });
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Horizontal Progress Bar
    --------------------------------------------------------------*/
  
    function horizontalProgressBar() {
      $(".tb-single-bar").each(function() {
        var progressPercentage = $(this).data("progress-percentage") + "%";
        $(this).find(".tb-single-bar-in").css("width", progressPercentage);
      });
  
      $('.tb-single-bar').each(function() {
  
        var windowScroll = $(document).scrollTop(),
          windowHeight = $(window).height(),
          barOffset = $(this).offset().top,
          barHeight = $(this).height(),
          barScrollUp = barOffset <= (windowScroll + windowHeight),
          barSctollDown = barOffset + barHeight >= windowScroll;
  
        if (barSctollDown && barScrollUp) {
          $(this).addClass('tb-active');
        }
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Custom Quantity Calculator
    --------------------------------------------------------------*/
  
    function customQuantity() {
      $('.tb-quantity-minus').on('click', function() {
        var $input = $(this).parent().find('input');
        if ($input.val() == '') {
          $input.val(0);
        }
        var count = parseInt($input.val()) - 1;
        count = count <= 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
      });
  
      $('.tb-quantity-plus').on('click', function() {
        var $input = $(this).parent().find('input');
        if ($input.val() == '') {
          $input.val(0);
        }
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
      });
    }
  
    /*--------------------------------------------------------------
      ## Line Chart
    --------------------------------------------------------------*/
  
    function lineChart() {
  
      if ($.exists('#tb-chart2')) {
  
        var selector = $('.tb-line-chart'),
          el = selector.data('values'),
          labels = $.parseJSON(el.view_labels),
          data = $.parseJSON(el.view_data),
          y_axis_label = selector.data('y-label'),
          bg_color = selector.data('bg-color'),
          border_color = selector.data('border-color');
  
        var ctx = document.getElementById('tb-chart2').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: y_axis_label,
              data: data,
              backgroundColor: bg_color,
              borderColor: border_color,
              borderWidth: 2,
              lineTension: 0,
              pointBackgroundColor: '#fff'
            }]
  
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'bottom',
              display: false
            },
            tooltips: {
              displayColors: false,
              mode: 'nearest',
              intersect: false,
              position: 'nearest',
              xPadding: 8,
              yPadding: 8,
              caretPadding: 8,
              backgroundColor: '#666666',
              cornerRadius: 2,
              titleFontSize: 13,
              titleFontStyle: 'normal',
              titleFontFamily: 'Open Sans',
              bodyFontSize: 13,
              footerFontFamily: 'Open Sans'
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: '#b5b5b5',
                  fontFamily: 'Open Sans',
                  padding: 15,
                  beginAtZero: true,
                  autoSkip: false,
                  maxTicksLimit: 4
                },
                gridLines: {
                  color: '#d8d8d8',
                  borderDash: [1, 3],
                  zeroLineWidth: 1,
                  zeroLineColor: '#eaeaea',
                  drawBorder: false
                }
              }],
              xAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: '#b5b5b5',
                  fontFamily: 'Open Sans',
                  padding: 5,
                  beginAtZero: true,
                  autoSkip: false,
                  maxTicksLimit: 4
                },
                gridLines: {
                  color: '#d8d8d8',
                  borderDash: [1, 3],
                  zeroLineColor: '#b5b5b5',
                }
              }],
            },
            elements: {
              point: {
                radius: 3,
                hoverRadius: 3
              }
            }
          }
        });
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Round Chart
    --------------------------------------------------------------*/
  
    function roundChart() {
      if ($.exists('.tb-round-chart')) {
  
        $('.tb-round-chart').each(function() {
          var ctx = $(this).find('#tb-chart1'),
            el = $(this),
            options = el.data('options'),
            labels = {},
            values = [],
            stroke_colors = [];
  
          $.each(options, function(key, value) {
            labels[key] = value['label'];
            values[key] = parseInt(value['value']);
            stroke_colors[key] = value['stroke_color'];
            el.find('.tb-circle-stroke .tb-circle-label').eq(key).html(value['label']).siblings().css('background-color', value['stroke_color']);
          });
  
          var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                backgroundColor: stroke_colors,
                data: values,
                borderWidth: 0
              }]
            },
            options: {
              cutoutPercentage: 80,
              legend: {
                position: 'right',
                display: false
              },
              tooltips: {
                displayColors: false,
                mode: 'nearest',
                intersect: false,
                position: 'nearest',
                xPadding: 8,
                yPadding: 8,
                caretPadding: 8,
                backgroundColor: '#666666',
                cornerRadius: 2,
                titleFontSize: 13,
                titleFontStyle: 'normal',
                titleFontFamily: 'Open Sans',
                bodyFontSize: 13,
                footerFontFamily: 'Open Sans'
              },
            }
          });
  
        });
      }
    }
  
  
    /*--------------------------------------------------------------
      ## CountDown
    --------------------------------------------------------------*/
  
    function countDown() {
      if ($.exists('.tb-countdown')) {
        $('.tb-countdown').each(function() {
          var _this = this;
          var el = $(_this).data('countdate');
          var countDownDate = new Date(el).getTime();
          var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            var seconds = Math.floor(distance % (1000 * 60) / 1000);
            $(_this).find('#tb-count-days').html(days);
            $(_this).find('#tb-count-hours').html(hours);
            $(_this).find('#tb-count-minutes').html(minutes);
            $(_this).find('#tb-count-seconds').html(seconds);
  
            if (distance < 0) {
              clearInterval(x);
              $(_this).html("TOKEN EXPIRED");
            }
          }, 1000);
        });
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Section Scroll
    --------------------------------------------------------------*/
  
    function sectionScroll() {
      if ($.exists('.tb-scroll-section')) {
        var totalScrollSection = $('.tb-scroll-section').length;
        var scrollBarHeight = (100 / totalScrollSection) + '%';
        $('.tb-scroll-vertical-bar span').css('height', scrollBarHeight);
        $('.tb-scroll-number-total').text(totalScrollSection);
        $('.tb-scroll-section').eq(0).addClass('active');
        $.scrollify({
          section: ".tb-scroll-section",
          sectionName: false,
          interstitialSection: ".tb-site-footer.tb-style1",
          scrollSpeed: 1200,
          before: function(index, sections) {
  
            $('.tb-scroll-number-present').text(index + 1);
            scrollBarHeight = ((100 / totalScrollSection) * (index + 1)) + '%';
            $('.tb-scroll-vertical-bar span').css('height', scrollBarHeight);
            $('.tb-scroll-section').removeClass('active');
            $('.tb-scroll-section').eq(index).addClass('active');
  
          }
  
        });
  
        $('.tb-scroll-down-btn').on('click', function(e) {
          e.preventDefault();
          $.scrollify.next();
        });
  
        $('.tb-scroll-up-btn').on('click', function(e) {
          e.preventDefault();
          $.scrollify.previous();
        });
  
        if ($.exists('.tb-site-header')) {
          var thisHeight = $('.tb-site-header').height() + 'px';
        }
      }
    }
  
  
    /*--------------------------------------------------------------
      ## SVG Shape
    --------------------------------------------------------------*/
  
    function tbSvgShape() {
      if ($.exists('.tb-svg-shape')) {
        var tbDomSvg = {};
        tbDomSvg.svg = document.querySelector('.tb-svg-shape');
        tbDomSvg.shapeEl = tbDomSvg.svg.querySelector('path');
  
        var shapes = [{
          path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
          pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
          scaleX: 1.3,
          scaleY: 1.8,
          rotate: 70,
          tx: 0,
          ty: -100,
          animation: {
            path: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }];
        var step;
  
        var initShapeLoop = function(pos) {
          pos = pos || 0;
          anime.remove(tbDomSvg.shapeEl);
          anime({
            targets: tbDomSvg.shapeEl,
            easing: 'linear',
            d: [{ value: shapes[pos].pathAlt, duration: 1500 }, { value: shapes[pos].path, duration: 1500 }],
            loop: true,
            direction: 'alternate'
          });
        };
  
        var initShapeEl = function() {
          anime.remove(tbDomSvg.svg);
          anime({
            targets: tbDomSvg.svg,
            duration: 1,
            easing: 'linear',
            scaleX: shapes[0].scaleX,
            scaleY: shapes[0].scaleY,
            translateX: shapes[0].tx + 'px',
            translateY: shapes[0].ty + 'px',
            rotate: shapes[0].rotate + 'deg'
          });
  
          initShapeLoop();
        };
  
        initShapeEl();
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Apple TV Effect
    --------------------------------------------------------------*/
  
    function appleTVeffect() {
      $(document).on('mousemove', '.tb-hover-layer', function(event) {
  
          var halfW = (this.clientWidth / 2);
          var halfH = (this.clientHeight / 2);
  
          var coorX = (halfW - (event.pageX - $(this).offset().left));
          var coorY = (halfH - (event.pageY - $(this).offset().top));
  
          var degX = ((coorY / halfH) * 8) + 'deg'; // max. degree = 10
          var degY = ((coorX / halfW) * -8) + 'deg'; // max. degree = 10
  
          $(this).css('transform', function() {
              return 'perspective( 600px ) translate3d( 0, -2px, 0 ) rotateX(' + degX + ') rotateY(' + degY + ')';
            })
            .find('.tb-hover-layer1').css('transform', function() {
              return 'perspective( 600px ) translate3d( 0, 0, 0 ) rotateX(' + degX + ') rotateY(' + degY + ')';
            });
        })
        .on('mouseout', '.tb-hover-layer', function() {
          $(this).removeAttr('style').find('.tb-hover-layer1').removeAttr('style');
        });
    }
  
  
    /*--------------------------------------------------------------
      ## Before After Slider
    --------------------------------------------------------------*/
  
    function beforeAfterSlider() {
      if ($.exists('.tb-before-after')) {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        $('.tb-before-after').each(function() {
          var $container = $(this),
            $before = $container.find('.tb-before'),
            $after = $container.find('.tb-after'),
            $handle = $container.find('.tb-handle-before-after');
  
          var maxX = $container.outerWidth(),
            offsetX = $container.offset().left,
            startX = 0;
  
          var touchstart, touchmove, touchend;
          var mousemove = function(e) {
            e.preventDefault();
            var curX = e.clientX - offsetX,
              diff = startX - curX,
              curPos = (curX / maxX) * 100;
            if (curPos > 100) {
              curPos = 100;
            }
            if (curPos < 0) {
              curPos = 0;
            }
            $before.css({ right: (100 - curPos) + "%" });
            $handle.css({ left: curPos + "%" });
          };
          var mouseup = function(e) {
            e.preventDefault();
            if (supportsTouch) {
              $(document).off('touchmove', touchmove);
              $(document).off('touchend', touchend);
            } else {
              $(document).off('mousemove', mousemove);
              $(document).off('mouseup', mouseup);
            }
          };
          var mousedown = function(e) {
            e.preventDefault();
            startX = e.clientX - offsetX;
            if (supportsTouch) {
              $(document).on('touchmove', touchmove);
              $(document).on('touchend', touchend);
            } else {
              $(document).on('mousemove', mousemove);
              $(document).on('mouseup', mouseup);
            }
          };
  
          touchstart = function(e) {
            console.log(e);
            mousedown({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          touchmove = function(e) {
            mousemove({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          touchend = function(e) {
            mouseup({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          if (supportsTouch) {
            $handle.on('touchstart', touchstart);
          } else {
            $handle.on('mousedown', mousedown);
          }
        });
      }
    }
  
  
    /*--------------------------------------------------------------
      ## Post Vote Count
    --------------------------------------------------------------*/
  
    function postVoteCount() {
      $('.tb-vote-btn').each(function() {
        $(this).on('click', function(e) {
          e.preventDefault();
  
          var parent = $(this).parent('.tb-votes'),
            post_id = parent.data('post-id'),
            count = parent.find('.tb-count-no'),
            $this = $(this),
            flag;
  
          if ($this.hasClass('voted')) {
            alert('Already Voted');
            return false;
          } else if ($this.hasClass('tb-up-vote-btn')) {
            flag = 'true';
            count.text(parseInt(count.text()) + 1);
            $this.addClass('up-voted voted');
            $this.siblings('.tb-down-vote-btn').removeClass('voted');
          } else {
            flag = 'false';
            count.text(parseInt(count.text()) - 1);
            $this.addClass('down-voted voted');
            $this.siblings('.tb-up-vote-btn').removeClass('voted');
          }
  
          $.ajax({
            type: 'POST',
            url: get.ajaxurl,
            data: ({ action: 'post-vote', is_up: flag, id: post_id, vote_nonce: get.nonce }),
          });
  
        });
      });
    }
  
  
    /*--------------------------------------------------------------
      ## Google Map
    --------------------------------------------------------------*/
  
    function googleMap() {
      if ($('#map').length > 0) {
        var el = $('.tb-map-wrap'),
          lat = el.data('lat'),
          lng = el.data('lng'),
          zoom = el.data('zoom'),
          marker = el.data('marker'),
          marker_url = (!marker || marker.length === 0) ? get.siteurl + '/assets/img/map-marker.png' : marker;
        el.each(function() {
          var contactmap = {
            lat: lat,
            lng: lng
          };
          el.find('#map').gmap3({
              zoom: zoom,
              center: contactmap,
              scrollwheel: false,
  
            })
            .marker({
              position: contactmap,
              icon: marker_url
            })
        });
      }
    }
  
    function qtyStepper() {
      if (typeof $.fn.number != 'function') {
        return;
      }
  
      if ($('input[type=number]').length) {
        $('input[type=number]').number();
      };
    }
    /*--------------------------------------------------------------
      ## Youtube Playlist
    --------------------------------------------------------------*/
    function youtubePlaylist() {
      if ($('.yt-playlist').length) {
        var wrapper = $('#frame');
        var channelId = wrapper.data('channel-id');
        var ytp = new YTV('frame', {
          channelId: channelId,
          playerTheme: 'dark',
          responsive: true
        });
      }
    }
  
    /*--------------------------------------------------------------
      ## Ajax Pagination
    --------------------------------------------------------------*/
    function ajaxPagination() {
      $('.tb-ajax-load-more').each(function() {
  
        var $this = $(this),
          $container = $this.parent().find('.tb-post-outerwrapper'),
          token = $this.data('token'),
          settings = window['webify_load_more_' + token],
          is_isotope = parseInt(settings.isotope),
          paging = 1,
          flood = false,
          ajax_data;
  
        $this.bind('click', function() {
  
          if (flood === false) {
            paging++;
            flood = true;
  
            // set ajax data
            ajax_data = $.extend({}, { action: 'ajax-pagination', paged: paging }, settings);
  
            $.ajax({
              type: 'POST',
              url: get.ajaxurl,
              data: ajax_data,
              dataType: 'html',
              beforeSend: function() {
                $this.addClass('more-loading');
                $this.html('Loading...');
              },
              success: function(html) {
  
                var content = $(html).css('opacity', 0);
  
                if (is_isotope) {
                  content.imagesLoaded(function() {
                    $container.append(content).isotope('appended', content);
                    $container.isotope('layout');
                  });
                } else {
                  $(content).insertBefore($this.parent());
                }
                content.animate({ 'opacity': 1 }, 250);
  
  
                // load button affecting after images loaded
                $this.removeClass('more-loading');
                $this.html('Load More');
                if (parseInt(settings.max_pages) == paging) { $this.hide(); }
  
                flood = false;
              }
  
            });
  
          }
  
          return false;
        });
  
      });
    }
  
    /*--------------------------------------------------------------
      ## One page Navigation
    --------------------------------------------------------------*/
  
    function onePage() {
  
      $('.tb-site-header a').on('click', function() {
        var thisAttr = $(this).attr('href');
        if ($(thisAttr).length) {
          var scrollPoint = $(thisAttr).offset().top - 120;
          $('body,html').animate({
            scrollTop: scrollPoint
          }, 600);
        }
        return false;
      });
  
    }
  
    /*--------------------------------------------------------------
      ## Food Menu List
    --------------------------------------------------------------*/
  
    function foodMenuList() {
      // Food Menu Custom Isotope
      $('.tb-food-list').addClass('tb-food-list-isotope');
      var isotopeActiveClass = $('.tb-food-menu-wrap .active').children('a').data('filter');
      $(isotopeActiveClass).addClass('tb-show-isotope-item');
      $('.tb-food-menu a').on('click', function() {
        $(this).parents('.tb-food-menu-wrap').find('.tb-food-list').removeClass('tb-food-list-isotope')
      })
    }
  
    /*--------------------------------------------------------------
      ## Parallx
    --------------------------------------------------------------*/
  
    function parallax() {
      if ($.exists('.tb-parallax')) {
        var numItems = $('.tb-parallax').length;
        for (var loopI = 0; loopI < numItems; loopI++) {
          $('body').find('.tb-parallax').eq(loopI).addClass('tb-parallax' + loopI);
          var speed = $('.tb-parallax' + loopI).data('speed');
          $('.tb-parallax' + loopI).parallax('50%', speed);
        }
      }
    }
  
    /*--------------------------------------------------------------
      ## Modal Search
    --------------------------------------------------------------*/
  
    function searchModal() {
      $('.tb-search-modal-btn').on('click', function() {
        $('.tb-search-modal').toggleClass('tb-active');
      })
      $('.tb-search-modal-cross, .tb-search-modal-overlay').on('click', function() {
        $('.tb-search-modal').removeClass('tb-active');
      })
    }
  
    /*--------------------------------------------------------------
      ## Audio Player
    --------------------------------------------------------------*/
  
    function audioPlayerSetup() {
      if ($.exists('.tb-audio-player')) {
        $('.tb-audio-player').audioPlayer();
      }
    }
  
    /*--------------------------------------------------------------
        ## Zoom Effect
      --------------------------------------------------------------*/
  
    function zoomEffect() {
      if ($.exists('.tb-product-zoom')) {
        $('.tb-product-zoom').zoom();
      }
    }
  
    /*--------------------------------------------------------------
        ## Date Picker
      --------------------------------------------------------------*/
  
    function datePickerSetup() {
      if ($.exists('.tb-cs-date')) {
        $('.tb-cs-date').datepicker();
      }
    }
  
    /*--------------------------------------------------------------
        ## Date Picker
      --------------------------------------------------------------*/
  
    function cursorPlus() {
  
      $('.tb-image-box.tb-style2 a, .tb-horizontal-scroll-item a').each(function() {
        $(this).append('<div class="tb-cursor"></div>');
        $(this).on('mousemove', function(ev) {
          var cursorOffsetY = $(this).offset().top;
          var cursorOffsetX = $(this).offset().left;
          var mouseLeft = (ev.pageX - cursorOffsetX - 22) + 'px';
          var mouseRight = (ev.pageY - cursorOffsetY - 22) + 'px';
          $(this).find('.tb-cursor').css({ 'left': mouseLeft, 'top': mouseRight });
        });
      });
  
    }
  
  
    /*--------------------------------------------------------------
      ## Elementor Initialize
    --------------------------------------------------------------*/
  
    $(window).on('elementor/frontend/init', function() {
  
      elementorFrontend.hooks.addAction('init', function() {
        console.log(this.getSettings('selectors.container'));
      });
  
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-portfolio-widget.default', function($scope, $) {
        isotopMsSetup();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-image-gallery-widget.default', function($scope, $) {
        isotopMsSetup();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-menu-widget.default', function($scope, $) {
        isotopMsSetup();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-blog-widget.default', function($scope, $) {
        var selector = $scope.find('.tb-blog-content');
        selector.imagesLoaded(function() {
          isotopMsSetup();
        });
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-client-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-hero-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-road-map-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-text-block-with-gallery-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-road-map-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-product-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-icon-box-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-portfolio-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-accordion-widget.default', function($scope, $) {
        accordianSetup();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-line-chart-widget.default', function($scope, $) {
        lineChart();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-round-chart-widget.default', function($scope, $) {
        roundChart();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-count-down-widget.default', function($scope, $) {
        //Countdown();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-testimonial-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-team-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-image-box-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-image-gallery-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-fancy-box-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-award-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-blog-slider-widget.default', function($scope, $) {
        swiperSlider();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-progress-bar-widget.default', function($scope, $) {
        horizontalProgressBar();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-google-map-widget.default', function($scope, $) {
        googleMap();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-portfolio-section-scroll-widget.default', function($scope, $) {
        sectionScroll();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-tabs-widget.default', function($scope, $) {
        tabs();
      });
      elementorFrontend.hooks.addAction('frontend/element_ready/webify-youtube-video-playlist-widget.default', function($scope, $) {
        youtubePlaylist();
      });
  
    });
  
  
  
  })(jQuery); // End of use strict