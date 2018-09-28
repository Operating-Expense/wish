
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




const res = new Resizer()


$(document).ready( () => {
    //inspect window width for creating desctop or mobile menu
    { $(window).width() < 1250 ? res.less() : null }

    var myFullpage = new fullpage('#fullpage', { 
        afterRender,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
	    lockAnchors: false,
	    navigation: true,
	    navigationPosition: 'left',
	    scrollingSpeed: 700,
	    responsiveWidth: 1200,
    });

    //tabs
    tabsFunc()
    
    $('.tabs_item-wrap').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1, 
        speed: 1900,
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
            tabs_wrap.find(`.tabs_item:eq(${ index })`).fadeIn('slow');
        }, 500 )
    } );
}







function getInsta() {
    const token = `30760133.1677ed0.243daa3511bd44cb840b4a8c5ff6c45d`
    //const token = `5417930184.1677ed0.24bb8f0ca52e4052afe737f3f943e791`
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
        text: `Чудово
                Завищені ціні бару.
                Рівень сервісу, чистота, Спа центр, зручні шезлонги.`
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




// less then 1250px
$(window).resize( function() {
    let w = $(this).width()
    if(w < 1250) {
        res.less()
    } else {
       res.more()
    }
} )


