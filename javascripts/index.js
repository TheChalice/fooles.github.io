var headers = ["H1","H2","H3","H4","H5","H6"];

$(".accordion").click(function(e) {
  var target = e.target,
      name = target.nodeName.toUpperCase();
  
  if($.inArray(name,headers) > -1) {
    var subItem = $(target).next();
    
    //slideUp all elements (except target) at current depth or greater
    var depth = $(subItem).parents().length;
    var allAtDepth = $(".accordion p, .accordion div").filter(function() {
      if($(this).parents().length >= depth && this !== subItem.get(0)) {
        return true; 
      }
    });
    $(allAtDepth).slideUp("fast");
    
    //slideToggle target content and adjust bottom border if necessary
    subItem.slideToggle("fast",function() {
        $(".accordion :visible:last").css("border-radius","0 0 10px 10px");
    });
    $(target).css({"border-bottom-right-radius":"0", "border-bottom-left-radius":"0"});
  }
});
$(function () {
    function scroll() {
        if (window.pageYOffset != null) {
            //正常浏览器
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            }
        } else if (document.compatMode == "CSS1Compat") {
            //有DTD的网页
            return {
                top: document.documentElement.scrollTop,
                left: document.documentElement.scrollLeft
            }
        } else {
            //没有DTD的
            return {
                top: document.body.scrollTop,
                left: document.body.scrollLeft
            }
        }
    }
    var pic0 = $("#pic")[0];
    var pic1 = $("#pic1")[0];
    var ren = $("#ren")[0];
    var ren1 = $("#ren1")[0];
    var timer1 = null
    var leaner = 0
    window.onscroll = function () {
        if (scroll().top > 0) {
            pocketmon1(pic0, scroll().top - 3550)
            ren.style.backgroundPosition = "-33px -167px"
            ren.style.right = "-45px"
        } else {
            pocketmon1(pic0, scroll().top - 3720)
            ren.style.backgroundPosition = "-143px 0px"
            ren.style.right = "-15px"
        }

        leaner = scroll().top
    }
    ren.onmouseover = function () {
        ren.style.backgroundPosition = "-33px 0px"
        ren.style.right = "1px"
    }
    ren.onmouseout = function () {
        ren.style.backgroundPosition = "-33px -167px"
        ren.style.right = "-45px"
    }
    ren.onclick = function () {

        clearInterval(timer1)
        timer1 = setInterval(function () {
            var target = 0
            var spet = (target - leaner) / 10
            spet = spet > 0 ? Math.ceil(spet) : Math.floor(spet);
            leaner = leaner + spet
            window.scrollTo(0, leaner)
            if (leaner == target) {
                clearInterval(timer1);
            }


        }, 30)

    }
    function pocketmon1(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = obj.offsetTop
            var spet = (target - leader) / 10
            spet = spet > 0 ? Math.ceil(spet) : Math.floor(spet);
            obj.style.top = obj.offsetTop + spet + "px"
            if (leader == target) {
                clearInterval(obj.timer);
            }
        }, 30)

    }
})
