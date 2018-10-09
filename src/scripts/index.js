
class Resizer {
    less() {
        $(`.top-menu__adress`).append($(`.top-phone`))
        $(`.top-menu__music`).append($(`.top-socials`))
    }
    more() {
        $(`.top-menu__phone`).append($(`.top-phone`))
        $(`.top-menu__soc`).append($(`.top-socials`))
    }
}

class Music {
    play() {
        document.getElementById('myAudio').play();

    }
    pause() {
        document.getElementById('myAudio').pause();
    }
}


class Preload {
    preloader(time) {
        setTimeout( () => {
            $(`#preloader`).fadeOut('slow')   
        }, time )  
    }
}


const res = new Resizer()
const music = new Music()
const prel = new Preload()

$(document).ready( () => {
    prel.preloader(2000)
    //inspect window width for creating desctop or mobile menu
    { $(window).width() < 1250 ? res.less() : null }

    const tl = TweenMax

    var myFullpage = new fullpage('#fullpage', { 
        afterRender,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
	    lockAnchors: false,
	    navigation: true,
	    navigationPosition: 'left',
	    scrollingSpeed: 1900,
        responsiveWidth: 1200,
        fadingEffect: true,
        easingcss3: 'cubic-bezier(.28, 0, 1, 0)',
        afterLoad: () => {
           
        },
        onLeave: () => {
           
        }
    })

    //AUDIO
    // switch on music
    setTimeout( () => music.play(), 2000 )
    // switch on - off music
    $(`.top-menu__music`).click( function() {
        let thisis = $(this);
            thisis.toggleClass('playing')
        {
            thisis.hasClass('playing') ?
            music.pause() : music.play()
        }
    })


    //tabs
    tabsFunc()  
    
    $('.tabs_item-wrap').slick({
        //infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1, 
        speed: 800,
        //easing: 'easeOutElastic',
        draggable:false,
        prevArrow:'<div class="PrevArrow"></div>',
        nextArrow:'<div class="NextArrow"></div>',
    });

    // run road
    var frame = document.querySelector('.album__wrap')
    frame.innerHTML = `<div class="images">${frame.innerHTML + frame.innerHTML}</div>`


    //feedBack
    renderComments()
    // loop comments
    var comFrame = document.querySelector('.comments__wrap')
    comFrame.innerHTML = `<div class="images">${comFrame.innerHTML + comFrame.innerHTML}</div>`

    //insta
    getInsta()
    //loop insta
    setTimeout( () => {
        var instFrame = document.querySelector('.image__wrap')
        instFrame.innerHTML = `<div class="images">${instFrame.innerHTML + instFrame.innerHTML}</div>`
    },1000 )


    //fancybox
    $('.fancybox').fancybox({
        prevEffect	: 'fade',
        nextEffect	: 'fade',
    });


    $('.fancybox-media').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            media : {}
        }
    });


    //mobi menu
    $(`.burder`).click(function() {
        $(`.mob-menu__wrap`).slideToggle('fast')
    })

    //anchors
    anchorActions()
} )


const afterRender = () => {
    $('#bgvid')[0].play();
}

const tabsFunc = () => {
	$('.tab ul.tabs li a').click(function (e) { 
        e.preventDefault()
        let th = $(this)

            var tab = $(`#tab`), 
            index = th.parent('li').index()
            tabs_wrap = tab.find('.tab_content')
        
            tab.find('.tabs li').removeClass('current')
            th.closest('li').addClass('current')
            
            tabs_wrap.find(`.tabs_item`).fadeOut('fast')
            setTimeout( () => {
                $(`.NextArrow`).click()
            },120 )
            setTimeout( () => {
                tabs_wrap.find(`.tabs_item:eq(${ index })`).fadeIn('slow');
            }, 900 )
       
       
    } );
}









function getInsta() {
    //const token = `30760133.1677ed0.243daa3511bd44cb840b4a8c5ff6c45d`
    const token = `5417930184.1677ed0.6b485ccab3ed4085bce571704642cc15` //spas token
    fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&callback=?`)
        .then( (res) => res.json() )
        .then( (data) => renderInsta(data.data) )
}

function renderInsta(d) {
    let imageCard = d.slice(0, 5).map( (i, id) =>  
            `<div class="three__wrap_item" style="background-image:url(${i.images.standard_resolution.url})">
                <p class="date">${i.created_time}</p>                    
            </div>` );
    $(`.image__wrap`).append(imageCard)
}


const commentList = [
    {
        title: `Larisa`,
        text: `Дуже сподобалось джакузі!!з соленою водою!
                Супер сніданок!
                Привітність персоналу (і по телефону також)!розташування отелю також красиве!
                вже порекомендували ВАС багатьом друзям!`
    },
    {
        title: `Oleksandr`,
        text: `Чудово
                Прекрасне місце для відпочинку! Дуже рекомендую!`
    },
    {
        title: `Vitaliy`,
        text: `Прекрасне місце для спокійного відпочинку.`
    }
];

function renderComments() {
    let coment = commentList.map( (c) => 
                `<div class="three__wrap_item guest">
                    <p class="guest--title">${c.title}</p>
                    <p class="guest--comment">${c.text}</p>
                </div>` );

    $(`.comments__wrap`).append(coment)
}



const anchorActions = () => {
    $('.welcom').click(function(){
        $('body, html').animate({
            scrollTop:$('.fullpage-wrapper').offset().top},666)
        $(`.mob-menu__wrap`).slideToggle('fast')
    })
    $('.serv-m').click(function(){
        $('body, html').animate({
            scrollTop:$('#tab').offset().top - 100 },666)
        $(`.mob-menu__wrap`).slideToggle('fast')
    })
    $('.gal-m').click(function(){
        $('body, html').animate({
            scrollTop:$('.album__wrap').offset().top - 150 },666)
        $(`.mob-menu__wrap`).slideToggle('fast')
    })
    $('.feeds-m').click(function(){
        $('body, html').animate({
            scrollTop:$('.comments__wrap').offset().top - 100 },666)
        $(`.mob-menu__wrap`).slideToggle('fast')
    })
    $('.cont-m').click(function(){
        $('body, html').animate({
            scrollTop:$('#map').offset().top},666)
        $(`.mob-menu__wrap`).slideToggle('fast')
    })
}


// less then 1250px
$(window).resize( function() {
    let w = $(this).width()
    if(w < 1250) {
        res.less()
    } else {
       res.more()
    }
})



//map

            function initMap() {
                var options = {
                    zoom: 13,
                    center:{lat:50.30712491,lng:30.69070847},
                    mapTypeControl: false,
                    disableDefaultUI: true,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f8f8f8"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#d2ad5b"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ]
                }
    
                let map = new google.maps.Map( document.getElementById('map'), options  )
                let marker = new google.maps.Marker({
                    position: {lat:50.30674118,lng:30.70624383},
                    map:map,
                    icon: './src/media/map-point.png'
                })
                marker.addListener('click', toggleBounce);
            }
            function toggleBounce() {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
            }


