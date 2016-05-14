// jquery.load

(function(){
    "use strict";

    $(function() {
        // mb.YTPlayer.js setup
        $("#video").mb_YTPlayer();

        var $windowHeight = $(window).height();
        var $headerHeight = $('[role=banner]').height();
        var $playerHeight = $windowHeight - $headerHeight;

        $('.player').css({ 'height': $playerHeight });


        // Scroll to hash animation
        $( 'a[href*=#]:not([href=#])' ).click( function() {

            // Toggle the Bootstrap .active class
            $('.nav li').removeClass('active');
            $(this).parent('li').addClass('active');

            if( location.pathname.replace( /^\// , '' ) === this.pathname.replace( /^\// , '' ) && location.hostname === this.hostname )
            {
                var target = $( this.hash );
                target = target.length ? target : $( '[name='+this.hash.slice( 1 )+']' );
                if( target.length )
                {
                    $( 'html,body' ).stop().animate(
                    {
                        scrollTop:target.offset().top - 110
                    } , 1000 );
                    return false;
                }
            }
        });

        var newsSwiper = new Swiper ('#newsSwiper', {
            a11y: true,
            pagination: '#newsSwiperPagination',
            paginationClickable: true,
            nextButton: '#newsNext',
            prevButton: '#newsPrev',
            parallax: true,
            speed: 600,
        });

        var gigSwiper = new Swiper('#gigSwiper', {
            a11y: true,
            initialSlide: 10,
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            nextButton: '#gigsNext',
            prevButton: '#gigsPrev',
            spaceBetween: 30,
            freeMode: true,
        });

        var mediaquery = "(max-width: 529px)";


        $('.grid-container').waitForImages().done(function() {

            // initialize Isotope
            var $container = $('.grid-container').isotope({
                // options
                itemSelector: '.grid__item',
                masonry: {
                    columnWidth: '.grid__sizer',
                }
            });

            $('.fancybox').fancybox({
                helpers : {
                    media : true
                }
            });
        });


        if (window.matchMedia(mediaquery).matches) {
            $container.isotope('layout');

        } else {
            $container.isotope('layout');
        }



        // Parallax effects
        function loadParallax() {
            $('.parallax').scrolly({ bgParallax: true });
        }
    });

})();
