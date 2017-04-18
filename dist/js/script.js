(function ($) {
    var allCarBtn = $('.carousel-btm'),
        carousel = $('.carousel'),
        allLastCarBtn = $('.carousel-btm:last-child'),
        allFirstCarBtn = $('.carousel-btm:first-child'),
        nextArrow = $('.next-arrow'),
        prevArrow = $('.prev-arrow'),
        servicesBtn = $('.services .fox-btn');
    var deg = 0;

    function moveCarousel(gradus) {
        var carActive = $('.carousel-btm.active');
        var carNext = (carActive.prev().length) ? carActive.prev(): allLastCarBtn;
        var carNext2 = (carNext.prev().length) ? carNext.prev(): allLastCarBtn;
        var carPrev = (carActive.next().length) ? carActive.next(): allFirstCarBtn;
        var carPrev2 = (carPrev.next().length) ? carPrev.next(): allFirstCarBtn;

        carNext.attr('data-move',-36);
        carNext2.attr('data-move',-72);
        carPrev.attr('data-move',36);
        carPrev2.attr('data-move',72);

        carousel.css({
            '-webkit-transform': 'rotate(' + gradus + 'deg)',
            '-moz-transform': 'rotate(' + gradus + 'deg)',
            '-ms-transform': 'rotate(' + gradus + 'deg)',
            '-o-transform': 'rotate(' + gradus + 'deg)',
            'transform': 'rotate(' + gradus + 'deg)'
        })
    }

    function sliderOpen(bool,thisIs) {
        var slide = $('.slide');
        if(bool){
            slide.removeClass('active');
            $((thisIs.attr('data-open'))+"").addClass('active');
        }
    }

    allCarBtn.click(function () {
        sliderOpen(!$(this).hasClass('active'),$(this));
        deg += ($(this).attr('data-move'))? ($(this).attr('data-move'))*1 : 0;
        allCarBtn.removeClass('active');
        allCarBtn.attr('data-move',0);
        $(this).addClass('active');
        servicesBtn.attr('href',$(this).attr('data-go'));
        moveCarousel(deg);

    });

    nextArrow.click(function () {
        var carActive = $('.carousel-btm.active');
        var carNext = (carActive.prev().length) ? carActive.prev(): allLastCarBtn;
        carNext.trigger('click');
        servicesBtn.attr('href', carNext.attr('data-go'));

    });
    prevArrow.click(function () {
        var carActive = $('.carousel-btm.active');
        var carPrev = (carActive.next().length) ? carActive.next(): allFirstCarBtn;
        carPrev.trigger('click');
        servicesBtn.attr('href', carPrev.attr('data-go'));

    });

})(jQuery);

(function ($) {
    //for hrader
    var tell = $('.tell'),
        header = $('header');

    var allGratitude = $('.rel-img');

    //for nav-menu during the scroll
    var head = $('.head'),
        headHeight = head.height(),
        portfolio = $('.portfolio'),
        calculator = $('.calculator'),
        calcylatorHeight = calculator.height(),
        gratitude = $('.gratitude'),
        gratitudeHeight = gratitude.height(),
        partnership = $('.partnership'),
        partnershipHeight = partnership.height(),
        navMenu = $('.nav-menu'),
        anchor = $('[position]'),
        navMove = $('.nav-menu > li'),
        mobileNavBtn = $('.fox-mob-btn'),
        scrollTest;

    //for filter in portfolio
    var filterBtn = $('[filter]'),
        allExampls = $('.example-wrap'),
        addBtn = $('[add-exapmple]');

    //for diagram in calculator
    var allQuestionBtn = $('.question-wrap .fox-btn'),
        maxPrise = 0,
        calcPrise = 0,
        textResult = $('.all-result');


    var questionBlock = $('.question-bloc');
    questionBlock.on('click', function () {
        $(this).parent().css('min-height', $(this).next().height() + 'px')

    });

    var btnAddImgFox = $('.btn-add-img');
    btnAddImgFox.on('click', function () {
        console.log('gg');
        var gratitudes = $('.gratitude-img.die');
        if (gratitudes.length > 8) {
            gratitudes.slice(0, 8).removeClass('die');
            setTimeout(function () {
                gratitudes.slice(0, 8).removeClass('fox-close');
            }, 100);
        } else {
            gratitudes.removeClass('die');
            setTimeout(function () {
                gratitudes.removeClass('fox-close');
            }, 100);
            btnAddImgFox.addClass('die');
        }

    });

    //mail
    var mailBtn = $('[data-btn]'),
        allCheckbox = $('.check-block label'),
        allInput = $('.input-block input'),
        checkCheckboxs = false,
        validUserName = "",
        validUserEmail = "",
        validUserTell = "",
        validUserChecked = "",
        boolName = false,
        boolEmail = true,
        boolTell = false;


    allInput.on('change', function () {
        var userName = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z\s]+$/;
        var userEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        var userTell = /^((\d|\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,15}$/;
        var inType = $(this).attr('name');
        var inVal = $(this).val();
        if (inType == 'name') {
            if (inVal.length > 1 && userName.test(inVal)) {
                $(this).removeClass('error');
                boolName = true;

                validUserName = inVal;
            } else {
                $(this).addClass('error');
            }
        }
        if (inType == 'email') {
            // if (inVal.length > 1 && userEmail.test(inVal)) {
            $(this).removeClass('error');
            boolEmail = true;
            validUserEmail = inVal;
            // } else {
            //     $(this).addClass('error');
            // }
        }
        if (inType == 'tell') {
            if (inVal.length > 1 && userTell.test(inVal) && inVal.length > 6) {
                $(this).removeClass('error');
                boolTell = true;
                validUserTell = inVal;
            } else {
                $(this).addClass('error');
            }
        }
    });


    allCheckbox.on('click', function () {
        allCheckbox.removeClass('error');
        allCheckbox.removeClass('active');
        $(this).addClass('active');
        checkCheckboxs = true;
        validUserChecked = $(this).text().trim();
    });

    mailBtn.on('click', function () {
        if (checkCheckboxs && boolName && boolEmail && boolTell) {
            var data1 = {name: validUserName, email: validUserEmail, tell: validUserTell, typeSite: validUserChecked};
            $.ajax({
                url: "../sender.php",
                type: "POST",
                data: data1,
                success: function () {
                }
            });
            $('.final').addClass('open');
            $('[type="reset"]').trigger('click');
        } else {
            $('.final').removeClass('open');
            if (!checkCheckboxs) {
                allCheckbox.addClass('error');
            }
            if (!boolName) {
                $('[name="name"]').addClass('error');
            }
            if (!boolEmail) {
                $('[name="email"]').addClass('error');
            }
            if (!boolTell) {
                $('[name="tell"]').addClass('error');
            }
        }
    });


    //IMG Gratitude
    allGratitude.on('click', function () {
        $(this).toggleClass('open');

        $(this).children('img').on('click', function (e) {
            e.stopPropagation();
        })
    });


    //for angle definition. (x , y) = cotangent.
    function ugol(x, y) {
        return Math.asin(x / ( Math.sqrt((x * x) + (y * y)) )) * 180 / Math.PI;
    }

    //for all result in calculator.
    function addPrise(x) {
        calcPrise += x;
        textResult.children('span:last-child').text(calcPrise);
    }


    //for move diagram in calculator. x = active block, i = height.
    function lineMove(x, i) {
        var z = 3;
        x.children('.line-left').children('span').css({
            '-webkit-transform': 'rotate(' + (ugol(i, x.children('.line-left').width()) * -1) + 'deg)',
            '-moz-transform': 'rotate(' + (ugol(i, x.children('.line-left').width()) * -1) + 'deg)',
            '-ms-transform': 'rotate(' + (ugol(i, x.children('.line-left').width()) * -1) + 'deg)',
            '-o-transform': 'rotate(' + (ugol(i, x.children('.line-left').width()) * -1) + 'deg)',
            'transform': 'rotate(' + (ugol(i, x.children('.line-left').width()) * -1) + 'deg)'
        });
        x.children('.line-right').children('span').css({
            '-webkit-transform': 'rotate(' + ugol(i, x.children('.line-left').width()) + 'deg)',
            '-moz-transform': 'rotate(' + ugol(i, x.children('.line-left').width()) + 'deg)',
            '-ms-transform': 'rotate(' + ugol(i, x.children('.line-left').width()) + 'deg)',
            '-o-transform': 'rotate(' + ugol(i, x.children('.line-left').width()) + 'deg)',
            'transform': 'rotate(' + ugol(i, x.children('.line-left').width()) + 'deg)'
        });
        x.children('.point').css({
            '-webkit-transform': 'translateY(' + (i * -1 + z) + 'px)',
            '-moz-transform': 'translateY(' + (i * -1 + z) + 'px)',
            '-ms-transform': 'translateY(' + (i * -1 + z) + 'px)',
            '-o-transform': 'translateY(' + (i * -1 + z) + 'px)',
            'transform': 'translateY(' + (i * -1 + z) + 'px)'
        });
        x.children('.point').children('.point-wrap').children('span').text(x.attr('data-getPrise') + 'р');
    }

    //for click in prise for calculator
    allQuestionBtn.on('click', function () {
        var btnParent = $(this).parent();
        var lineActive = $(this).attr('data-move') + "";
        var activeLine = $(lineActive);
        var nexBtnParent = btnParent.next();
        var lable = $('.name-question.active');
        var nextLable = lable.next();
        var lableText = lable.children('.pick-result');
        var last = $('.result-wrap > li:last-child ');

        var splitNumber = /[0-9]/;

        var valuePrise = ($(this).attr('data-prise')) * 1;


        activeLine.addClass('active');
        activeLine.attr("data-getPrise", valuePrise);

        if (lineActive == "#one") {
            maxPrise = valuePrise;
            lineMove(activeLine, 100);
        } else {
            if (valuePrise <= maxPrise) {

                var top = valuePrise / (maxPrise / 100);
                lineMove(activeLine, top);
                console.log('1');

            } else {
                console.log('2');
                var allDataPrise = $('[data-getPrise]');
                maxPrise = valuePrise;

                for (var i = 0; i < allDataPrise.length; i++) {
                    if (i == allDataPrise.length) {
                        lineMove(activeLine, 100);
                    } else {
                        lineMove($(allDataPrise[i]), ($(allDataPrise[i]).attr('data-getPrise') * 1) / (maxPrise / 100 ));
                    }
                }
            }
        }


        lableText.text(($(this).text().split(splitNumber))[0]);

        addPrise(($(this).attr('data-prise')) * 1);

        if (lineActive == "#four") {
            var res = $('.all--prise').children('.pick-result');
            res.text('От ' + calcPrise + ' руб.');
            last.addClass('active');
            $('.question-wrap').css({
                'min-height': '0',
                'height': '0',
                'padding-top': '0'
            });
            // $('.result-wrap').css('padding-top', '0');
        }


        //REMOVE
        btnParent.removeClass('active');
        setTimeout(function () {
            btnParent.removeClass('open');
        }, 401);
        lable.removeClass('active');

        //ADD
        nextLable.addClass('active');
        setTimeout(function () {
            nexBtnParent.addClass('open');
            setTimeout(function () {
                nexBtnParent.addClass('active');
            }, 100);
        }, 500);
    });
    //СБРОС РЕЗУЛЬТАТА
    var resetCalc = $('.fox-btn-prev');
    resetCalc.click(function () {
        var reParent = $('.name-question'),
            reParentFirst = $('.name-question:first-child');
        var removeActive = $('.result-wrap>li'),
            removeActiveFirst = $('.result-wrap>li:first-child');
        var reQvast = $('.question-bloc'),
            reQvastFirst = $('.question-bloc:first-child');
        var reTextResult = $('.pick-result');
        reTextResult.text('');
        maxPrise = 0;
        calcPrise = 0;
        textResult.children('span:last-child').text(calcPrise);

        reParent.removeClass('active');
        reParentFirst.addClass('active');

        removeActive.removeClass('active');
        removeActive.removeAttr('data-getPrise');

        reQvast.removeClass('active');
        setTimeout(function () {
            reQvast.removeClass('open');
        }, 401);

        setTimeout(function () {
            reQvastFirst.addClass('open');
            setTimeout(function () {
                reQvastFirst.addClass('active');
            }, 100);
        }, 500);

        removeActive.children('.line-left').children('span').css({
            '-webkit-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)'
        });
        removeActive.children('.line-right').children('span').css({
            '-webkit-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)'
        });
        removeActive.children('.point').css({
            '-webkit-transform': 'translateY(0) scale(0.5)',
            '-moz-transform': 'translateY(0) scale(0.5)',
            '-ms-transform': 'translateY(0) scale(0.5)',
            '-o-transform': 'translateY(0) scale(0.5)',
            'transform': 'translateY(0) scale(0.5)'
        });
        // removeActive.children('.point').children('.point-wrap').children('span').text('000 р');

    });

    //CLICK ON LINE IN NAV_MENU
    navMove.on('click', function () {
        mobileNavBtn.toggleClass('open');
        navMenu.toggleClass('open');
    });

    //CLICK ON MOBILE BTN
    mobileNavBtn.on('click', function () {
        $(this).toggleClass('open');
        navMenu.toggleClass('open');
    });

    //CLICK ON TELL HEADER
    tell.on('click', function () {
        $(this).parent().toggleClass('open');
    });

    //CLICK ON FILTER PORTFOLIO
    filterBtn.on('click', function () {
        var search = $(this).attr('filter') + "",
            searchArr = $(search);

        filterBtn.removeClass('active');
        $(this).addClass('active');

        allExampls.addClass('closed');
        setTimeout(function () {
            allExampls.addClass('die')
        }, 500);
        if (searchArr.length > 6) {
            addBtn.removeClass('die');
            addBtn.attr('add-exapmple', search);
            setTimeout(function () {
                searchArr.slice(0, 6).removeClass('die');
                setTimeout(function () {
                    searchArr.slice(0, 6).removeClass('closed');
                }, 100);

            }, 501);
        } else {
            addBtn.addClass('die');
            setTimeout(function () {
                searchArr.removeClass('die');
                setTimeout(function () {
                    searchArr.removeClass('closed');
                }, 100);
            }, 501);
        }
    });
    addBtn.on('click', function () {
        var search = $(this).attr('add-exapmple') + ".closed",
            searchArr = $(search);
        if (searchArr.length > 6) {
            setTimeout(function () {
                searchArr.slice(0, 6).removeClass('die');
                setTimeout(function () {
                    searchArr.slice(0, 6).removeClass('closed');
                }, 100);
            }, 501);
        } else {
            addBtn.addClass('die');
            searchArr.removeClass('die');
            setTimeout(function () {
                searchArr.removeClass('closed');
            }, 100);
        }
    });

    //CLICK ON ANCHOR
    anchor.on('click', function () {
        var id = $(this).attr('position') + "";
        $('body,html').animate({scrollTop: $(id).offset().top}, 500);
    });

    //for window scroll
    $(window).on('load', function () {
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            var scrollHeadTop = head.offset().top;
            var scrollHeadBot = head.offset().top + headHeight;
            var scrollCalculatorTop = calculator.offset().top;
            var scrollCalculatorBot = calculator.offset().top + calcylatorHeight;
            var scrollPartnershipTop = partnership.offset().top;
            var scrollPartnershipBot = partnership.offset().top + partnershipHeight;
            var scrollPortfolioTop = portfolio.offset().top;
            var portfolioHeight = portfolio.height();
            var scrollPortfolioBot = portfolio.offset().top + portfolioHeight;
            var scrollGratitudeTop = gratitude.offset().top;
            var scrollGratitudeBot = gratitude.offset().top + gratitudeHeight;
            var nav = navMenu.offset().top + 30;
            var navRe = navMenu.offset().top - 50;


            if (scrollTest > scrollTop) {
                header.toggleClass('move-up', false);
                if ((navRe > scrollPortfolioTop && navRe < scrollPortfolioBot ) || (navRe > scrollGratitudeTop && navRe < scrollGratitudeBot )) {
                    navMenu.toggleClass('dark', true);
                    if (navRe > scrollPortfolioTop && navRe < scrollPortfolioBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[1]).toggleClass('action', true);
                    }
                    if (navRe > scrollGratitudeTop && navRe < scrollGratitudeBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[3]).toggleClass('action', true);
                    }
                } else {
                    navMenu.toggleClass('dark', false);
                    if (navRe > scrollHeadTop && navRe < scrollHeadBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[0]).toggleClass('action', true);
                    }
                    if (navRe > scrollCalculatorTop && navRe < scrollCalculatorBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[2]).toggleClass('action', true);
                    }
                    if (navRe > scrollPartnershipTop && navRe < scrollPartnershipBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[4]).toggleClass('action', true);
                    }
                }
                scrollTest = scrollTop;
            } else {
                header.toggleClass('move-up', true);
                if ((nav > scrollPortfolioTop && nav < scrollPortfolioBot ) || (nav > scrollGratitudeTop && nav < scrollGratitudeBot )) {
                    navMenu.toggleClass('dark', true);
                    if (nav > scrollPortfolioTop && nav < scrollPortfolioBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[1]).toggleClass('action', true);
                    }
                    if (nav > scrollGratitudeTop && nav < scrollGratitudeBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[3]).toggleClass('action', true);
                    }
                } else {
                    navMenu.toggleClass('dark', false);
                    if (nav > scrollHeadTop && nav < scrollHeadBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[0]).toggleClass('action', true);
                    }
                    if (nav > scrollCalculatorTop && nav < scrollCalculatorBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[2]).toggleClass('action', true);
                    }
                    if (nav > scrollPartnershipTop && nav < scrollPartnershipBot) {
                        navMove.toggleClass('action', false);
                        $(navMove[4]).toggleClass('action', true);
                    }
                }
                scrollTest = scrollTop;
            }
        });
    });

})(jQuery);

(function () {

// Scroll Variables (tweakable)
    var defaultOptions = {

        // Scrolling Core
        frameRate: 150, // [Hz]
        animationTime: 400, // [ms]
        stepSize: 100, // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,

        // Acceleration
        accelerationDelta: 50,  // 50
        accelerationMax: 3,   // 3

        // Keyboard Settings
        keyboardSupport: false,  // option
        arrowScroll: 50,    // [px]

        // Other
        fixedBackground: true,
        excluded: ''
    };

    var options = defaultOptions;


// Other Variables
    var isExcluded = false;
    var isFrame = false;
    var direction = {x: 0, y: 0};
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var refreshSize;
    var deltaBuffer = [];
    var isMac = /^Mac/.test(navigator.platform);

    var key = {
        left: 37, up: 38, right: 39, down: 40, spacebar: 32,
        pageup: 33, pagedown: 34, end: 35, home: 36
    };
    var arrowKeys = {37: 1, 38: 1, 39: 1, 40: 1};

    /***********************************************
     * INITIALIZE
     ***********************************************/

    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
    function initTest() {
        if (options.keyboardSupport) {
            addEvent('keydown', keydown);
        }
    }

    /**
     * Sets up scrolls array, determines if frames are involved.
     */
    function init() {

        if (initDone || !document.body) return;

        initDone = true;

        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;

        // check compat mode for root element
        root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
        activeElement = body;

        initTest();

        // Checks if this script is running in a frame
        if (top != self) {
            isFrame = true;
        }

        /**
         * Safari 10 fixed it, Chrome fixed it in v45:
         * This fixes a bug where the areas left and right to
         * the content does not trigger the onmousewheel event
         * on some pages. e.g.: html, body { height: 100% }
         */
        else if (isOldSafari &&
            scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight ||
            html.offsetHeight <= windowHeight)) {

            var fullPageElem = document.createElement('div');
            fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' +
                'top:0; left:0; right:0; height:' +
                root.scrollHeight + 'px';
            document.body.appendChild(fullPageElem);

            // DOM changed (throttled) to fix height
            var pendingRefresh;
            refreshSize = function () {
                if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
                pendingRefresh = setTimeout(function () {
                    if (isExcluded) return; // could be running after cleanup
                    fullPageElem.style.height = '0';
                    fullPageElem.style.height = root.scrollHeight + 'px';
                    pendingRefresh = null;
                }, 500); // act rarely to stay fast
            };

            setTimeout(refreshSize, 10);

            addEvent('resize', refreshSize);

            // TODO: attributeFilter?
            var config = {
                attributes: true,
                childList: true,
                characterData: false
                // subtree: true
            };

            observer = new MutationObserver(refreshSize);
            observer.observe(body, config);

            if (root.offsetHeight <= windowHeight) {
                var clearfix = document.createElement('div');
                clearfix.style.clear = 'both';
                body.appendChild(clearfix);
            }
        }

        // disable fixed background
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = 'scroll';
            html.style.backgroundAttachment = 'scroll';
        }
    }

    /**
     * Removes event listeners and other traces left on the page.
     */
    function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent('mousedown', mousedown);
        removeEvent('keydown', keydown);
        removeEvent('resize', refreshSize);
        removeEvent('load', init);
    }


    /************************************************
     * SCROLLING
     ************************************************/

    var que = [];
    var pending = false;
    var lastScroll = Date.now();

    /**
     * Pushes scroll actions to the scrolling queue.
     */
    function scrollArray(elem, left, top) {

        directionCheck(left, top);

        if (options.accelerationMax != 1) {
            var now = Date.now();
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + (50 / elapsed)) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor;
                }
            }
            lastScroll = Date.now();
        }

        // push a scroll command
        que.push({
            x: left,
            y: top,
            lastX: (left < 0) ? 0.99 : -0.99,
            lastY: (top < 0) ? 0.99 : -0.99,
            start: Date.now()
        });

        // don't act if there's a pending queue
        if (pending) {
            return;
        }

        var scrollWindow = (elem === document.body);

        var step = function (time) {

            var now = Date.now();
            var scrollX = 0;
            var scrollY = 0;

            for (var i = 0; i < que.length; i++) {

                var item = que[i];
                var elapsed = now - item.start;
                var finished = (elapsed >= options.animationTime);

                // scroll position: [0, 1]
                var position = (finished) ? 1 : elapsed / options.animationTime;

                // easing [optional]
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }

                // only need the difference
                var x = (item.x * position - item.lastX) >> 0;
                var y = (item.y * position - item.lastY) >> 0;

                // add this to the total scrolling
                scrollX += x;
                scrollY += y;

                // update last values
                item.lastX += x;
                item.lastY += y;

                // delete and step back if it's over
                if (finished) {
                    que.splice(i, 1);
                    i--;
                }
            }

            // scroll left and top
            if (scrollWindow) {
                window.scrollBy(scrollX, scrollY);
            }
            else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY;
            }

            // clean up if there's nothing left to do
            if (!left && !top) {
                que = [];
            }

            if (que.length) {
                requestFrame(step, elem, (1000 / options.frameRate + 1));
            } else {
                pending = false;
            }
        };

        // start a new queue of actions
        requestFrame(step, elem, 0);
        pending = true;
    }


    /***********************************************
     * EVENTS
     ***********************************************/

    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
    function wheel(event) {

        if (!initDone) {
            init();
        }

        var target = event.target;

        // leave early if default action is prevented
        // or it's a zooming event with CTRL
        if (event.defaultPrevented || event.ctrlKey) {
            return true;
        }

        // leave embedded content alone (flash & pdf)
        if (isNodeName(activeElement, 'embed') ||
            (isNodeName(target, 'embed') && /\.pdf/i.test(target.src)) ||
            isNodeName(activeElement, 'object') ||
            target.shadowRoot) {
            return true;
        }

        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;

        if (isMac) {
            if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
                deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
            }
            if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
                deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
            }
        }

        // use wheelDelta if deltaX/Y is not available
        if (!deltaX && !deltaY) {
            deltaY = -event.wheelDelta || 0;
        }

        // line based scrolling (Firefox mostly)
        if (event.deltaMode === 1) {
            deltaX *= 40;
            deltaY *= 40;
        }

        var overflowing = overflowingAncestor(target);

        // nothing to do if there's no element that's scrollable
        if (!overflowing) {
            // except Chrome iframes seem to eat wheel events, which we need to
            // propagate up, if the iframe has nothing overflowing to scroll
            if (isFrame && isChrome) {
                // change target to iframe element itself for the parent frame
                Object.defineProperty(event, "target", {value: window.frameElement});
                return parent.wheel(event);
            }
            return true;
        }

        // check if it's a touchpad scroll that should be ignored
        if (isTouchpad(deltaY)) {
            return true;
        }

        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }

        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Keydown event handler.
     * @param {Object} event
     */
    function keydown(event) {

        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey ||
            (event.shiftKey && event.keyCode !== key.spacebar);

        // our own tracked active element could've been removed from the DOM
        if (!document.body.contains(activeElement)) {
            activeElement = document.activeElement;
        }

        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
        // or inside interactive elements
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented ||
            inputNodeNames.test(target.nodeName) ||
            isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
            isNodeName(activeElement, 'video') ||
            isInsideYoutubeVideo(event) ||
            target.isContentEditable ||
            modifier) {
            return true;
        }

        // [spacebar] should trigger button press, leave it alone
        if ((isNodeName(target, 'button') ||
            isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
            event.keyCode === key.spacebar) {
            return true;
        }

        // [arrwow keys] on radio buttons should be left alone
        if (isNodeName(target, 'input') && target.type == 'radio' &&
            arrowKeys[event.keyCode]) {
            return true;
        }

        var shift, x = 0, y = 0;
        var overflowing = overflowingAncestor(activeElement);

        if (!overflowing) {
            // Chrome iframes seem to eat key events, which we need to
            // propagate up, if the iframe has nothing overflowing to scroll
            return (isFrame && isChrome) ? parent.keydown(event) : true;
        }

        var clientHeight = overflowing.clientHeight;

        if (overflowing == document.body) {
            clientHeight = window.innerHeight;
        }

        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;
            case key.spacebar: // (+ shift)
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * 0.9;
                break;
            case key.pageup:
                y = -clientHeight * 0.9;
                break;
            case key.pagedown:
                y = clientHeight * 0.9;
                break;
            case key.home:
                y = -overflowing.scrollTop;
                break;
            case key.end:
                var scroll = overflowing.scrollHeight - overflowing.scrollTop;
                var scrollRemaining = scroll - clientHeight;
                y = (scrollRemaining > 0) ? scrollRemaining + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;
            default:
                return true; // a key we don't care about
        }

        scrollArray(overflowing, x, y);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Mousedown event only for updating activeElement
     */
    function mousedown(event) {
        activeElement = event.target;
    }


    /***********************************************
     * OVERFLOW
     ***********************************************/

    var uniqueID = (function () {
        var i = 0;
        return function (el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    })();

    var cache = {}; // cleared out after a scrolling session
    var clearCacheTimer;

//setInterval(function () { cache = {}; }, 10 * 1000);

    function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function () {
            cache = {};
        }, 1 * 1000);
    }

    function setCache(elems, overflowing) {
        for (var i = elems.length; i--;)
            cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }

//  (body)                (root)
//         | hidden | visible | scroll |  auto  |
// hidden  |   no   |    no   |   YES  |   YES  |
// visible |   no   |   YES   |   YES  |   YES  |
// scroll  |   no   |   YES   |   YES  |   YES  |
// auto    |   no   |   YES   |   YES  |   YES  |

    function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
                var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) ||
                    !isFrame && isOverflowCSS) {
                    return setCache(elems, getScrollRoot());
                }
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
                return setCache(elems, el);
            }
        } while (el = el.parentElement);
    }

    function isContentOverflowing(el) {
        return (el.clientHeight + 10 < el.scrollHeight);
    }

// typically for <body> and <html>
    function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow !== 'hidden');
    }

// for all other elements
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow === 'scroll' || overflow === 'auto');
    }


    /***********************************************
     * HELPERS
     ***********************************************/

    function addEvent(type, fn) {
        window.addEventListener(type, fn, false);
    }

    function removeEvent(type, fn) {
        window.removeEventListener(type, fn, false);
    }

    function isNodeName(el, tag) {
        return (el.nodeName || '').toLowerCase() === tag.toLowerCase();
    }

    function directionCheck(x, y) {
        x = (x > 0) ? 1 : -1;
        y = (y > 0) ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }

    var deltaBufferTimer;

    if (window.localStorage && localStorage.SS_deltaBuffer) {
        try { // #46 Safari throws in private browsing for localStorage
            deltaBuffer = localStorage.SS_deltaBuffer.split(',');
        } catch (e) {
        }
    }

    function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
            deltaBuffer = [deltaY, deltaY, deltaY];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function () {
            try { // #46 Safari throws in private browsing for localStorage
                localStorage.SS_deltaBuffer = deltaBuffer.join(',');
            } catch (e) {
            }
        }, 1000);
        return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
    }

    function isDivisible(n, divisor) {
        return (Math.floor(n / divisor) == n / divisor);
    }

    function allDeltasDivisableBy(divisor) {
        return (isDivisible(deltaBuffer[0], divisor) &&
        isDivisible(deltaBuffer[1], divisor) &&
        isDivisible(deltaBuffer[2], divisor));
    }

    function isInsideYoutubeVideo(event) {
        var elem = event.target;
        var isControl = false;
        if (document.URL.indexOf('www.youtube.com/watch') != -1) {
            do {
                isControl = (elem.classList &&
                elem.classList.contains('html5-video-controls'));
                if (isControl) break;
            } while (elem = elem.parentNode);
        }
        return isControl;
    }

    var requestFrame = (function () {
        return (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback, element, delay) {
            window.setTimeout(callback, delay || (1000 / 60));
        });
    })();

    var MutationObserver = (window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver);

    var getScrollRoot = (function () {
        var SCROLL_ROOT;
        return function () {
            if (!SCROLL_ROOT) {
                var dummy = document.createElement('div');
                dummy.style.cssText = 'height:10000px;width:1px;';
                document.body.appendChild(dummy);
                var bodyScrollTop = document.body.scrollTop;
                var docElScrollTop = document.documentElement.scrollTop;
                window.scrollBy(0, 3);
                if (document.body.scrollTop != bodyScrollTop)
                    (SCROLL_ROOT = document.body);
                else
                    (SCROLL_ROOT = document.documentElement);
                window.scrollBy(0, -3);
                document.body.removeChild(dummy);
            }
            return SCROLL_ROOT;
        };
    })();


    /***********************************************
     * PULSE (by Michael Herf)
     ***********************************************/

    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
    function pulse_(x) {
        var val, start, expx;
        // test
        x = x * options.pulseScale;
        if (x < 1) { // acceleartion
            val = x - (1 - Math.exp(-x));
        } else {     // tail
            // the previous animation ended here:
            start = Math.exp(-1);
            // simple viscous drag
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + (expx * (1 - start));
        }
        return val * options.pulseNormalize;
    }

    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;

        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }


    /***********************************************
     * FIRST RUN
     ***********************************************/

    var userAgent = window.navigator.userAgent;
    var isEdge = /Edge/.test(userAgent); // thank you MS
    var isChrome = /chrome/i.test(userAgent) && !isEdge;
    var isSafari = /safari/i.test(userAgent) && !isEdge;
    var isMobile = /mobile/i.test(userAgent);
    var isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
    var isOldSafari = isSafari && (/Version\/8/i.test(userAgent) || /Version\/9/i.test(userAgent));
    var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;

    var wheelEvent;
    if ('onwheel' in document.createElement('div'))
        wheelEvent = 'wheel';
    else if ('onmousewheel' in document.createElement('div'))
        wheelEvent = 'mousewheel';

    if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel);
        addEvent('mousedown', mousedown);
        addEvent('load', init);
    }


    /***********************************************
     * PUBLIC INTERFACE
     ***********************************************/

    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet)
            if (defaultOptions.hasOwnProperty(key))
                options[key] = optionsToSet[key];
    }

    SmoothScroll.destroy = cleanup;

    if (window.SmoothScrollOptions) // async API
        SmoothScroll(window.SmoothScrollOptions);

    if (typeof define === 'function' && define.amd)
        define(function () {
            return SmoothScroll;
        });
    else if ('object' == typeof exports)
        module.exports = SmoothScroll;
    else
        window.SmoothScroll = SmoothScroll;

})();
SmoothScroll({

    // Scrolling Core
    frameRate: 150, // [Hz]
    animationTime: 400, // [ms]
    stepSize: 40, // [px]

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Acceleration
    accelerationDelta: 50,  // 50
    accelerationMax: 3,   // 3

    // Keyboard Settings
    keyboardSupport: true,  // option
    arrowScroll: 50,    // [px]

    // Other
    fixedBackground: true,
    excluded: ''
});