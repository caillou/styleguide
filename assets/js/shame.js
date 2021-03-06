/* ==========================================================
 * shame.js
 * DOM rewritting on mobile, issue #160
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-06-18 15:57:23
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function () {
    var id;
    carouselify();
    collapsify();

    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(resizeLauncher, 500);
    });

    function resizeLauncher() {
      carouselify();
      collapsify();
    }

    function carouselify() {
      var $tabFocus = $(".tab-focus"),
          focusIndex = 0;
      if($tabFocus && $(window).width() < 767 ) {
        $tabFocus.each(function () {
          var $that = $(this),
              itemIndex = -1;
          focusIndex += 1;
          $that.attr('id', 'tab-focus-'+focusIndex);
          $that.next(".nav-tabs").hide();
          $that.addClass('carousel slide').removeClass('tab-content tab-border');
          $that.wrapInner( "<div class='carousel-inner'></div>");
          $that.prepend( "<ol class=\"carousel-indicators\"></ol>" );

          $that.find('.tab-pane').each(function () {
            itemIndex += 1;
            $(this).removeClass('tab-pane fade in active').addClass('item');
            $that.find('.carousel-indicators').append("<li data-target=\"#tab-focus-"+focusIndex+"\" data-slide-to=\""+itemIndex+"\" class=\"\"></li>");
          });
          $that.find('.item:first').addClass('active');
          $that.find('.carousel-indicators li:first-child').addClass('active');

          $that.append( "<a class=\"left carousel-control icon icon--before icon--less\" href=\"#tab-focus-"+focusIndex+"\" data-slide=\"prev\"></a><a class=\"right carousel-control icon icon--before icon--greater\" href=\"#tab-focus-"+focusIndex+"\" data-slide=\"next\"></a>" );
        });
      } else if($tabFocus) {
        $tabFocus.each(function () {
          var $that = $(this);
          focusIndex -= 1;
          $that.next(".nav-tabs").show();
          $that.removeClass('carousel slide').addClass('tab-content tab-border');
          $that.find( "ol.carousel-indicators" ).remove();

          $that.find('.item').each(function () {
            $(this).addClass('tab-pane fade').removeClass('item');
            $(this).css('height', 'auto');
          });
          $that.find('.tab-pane:first-child').addClass('active in');

          if ( $that.find('.tab-pane').parent().hasClass( "carousel-inner" ) ) {
            $that.find('.tab-pane').unwrap();
          }

          $that.find('.carousel-control').remove();
        });
      }
    }

    function collapsify() {
      var $navTab = $(".nav-tabs"),
          $collapsify = $(".collapsify"),
          linkIndex = 0;
      if($navTab && $(window).width() < 767 ) {
        $navTab.not('.tab-focus').each(function (){
          var $that = $(this);
          $that.removeClass("nav-tabs").addClass('collapsify');
          $that.next('.tab-content').hide();
          $that.find('a').each(function (){
            var $target = $(this).attr('href');
            linkIndex += 1;
            $(this).unwrap();
            $( '<div class="collapse" id="collapse-'+linkIndex+'">'+$($target).html()+'</div>' ).insertAfter(this);
            $(this).attr('data-toggle', 'collapse');
            $(this).attr('data-target', '#collapse-'+linkIndex );
            $(this).addClass('collapse-closed');
            $(this).click(function(){
                $(this).toggleClass('collapse-closed');
            });
          });
          //$that.find('a:first-child').removeClass('collapse-closed').next('.collapse').addClass('in');
        });
      } else if($collapsify) {
        $collapsify.each(function (){
          var $that = $(this);
          $that.addClass("nav-tabs").removeClass('collapsify');
          $that.next('.tab-content').show();
          $that.find('a').each(function (){
            var $target = $(this).attr('href');
            linkIndex -= 1;
            $(this).wrap('<li></li>');
            $(this).parent().next('.collapse').remove();
            $(this).attr('data-toggle', 'tab');
            $(this).attr('data-target', '');
            $(this).removeClass('collapse-closed');
          });
          $that.find('li a').each(function () {
            var $tabTarget = $(this).attr('href');
            if($($tabTarget).hasClass('active')){
              $(this).parent().addClass('active');
            }
          });
        });
      }
    }
  });

}) (jQuery);