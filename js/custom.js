// var btns = document.querySelectorAll('.copyButton');
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('mouseleave', clearTooltip);
//     btns[i].addEventListener('blur', clearTooltip);
// }
// function clearTooltip(e) {
//     e.currentTarget.setAttribute('class', 'copyButton');
//     e.currentTarget.removeAttribute('aria-label');
// }
// function showTooltip(elem, msg) {
//     elem.setAttribute('class', 'copyButton tooltipped tooltipped-s');
//     elem.setAttribute('aria-label', msg);
// }
// function fallbackMessage(action) {
//     var actionMsg = '';
//     var actionKey = (action === 'cut' ? 'X' : 'C');
//     if (/iPhone|iPad/i.test(navigator.userAgent)) {
//         actionMsg = 'No support :(';
//     } else if (/Mac/i.test(navigator.userAgent)) {
//         actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
//     } else {
//         actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
//     }
//     return actionMsg;
// }

// var snippets = document.querySelectorAll('pre');
// [].forEach.call(snippets, function(snippet) {
//     snippet.firstchild.insertAdjacentHTML("beforebegin",'<i class="fa fa-paste fa-fw" data-clipboard-snippet></i>');
// });
// var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]',{
//     target: function(trigger) {
//         return trigger.nextElementSibling;
//     }
// });
// clipboardSnippets.on('success', function(e) {
//     e.clearSelection();
//     showTooltip(e.trigger, 'Copied!');
// });
// clipboardSnippets.on('error', function(e) {
//     showTooltip(e.trigger, fallbackMessage(e.action));
// });  




//此函数用于创建复制按钮
function createCopyBtns() {
    var $codeArea = $("pre code");
    //查看页面是否具有代码区域，没有代码块则不创建 复制按钮
    if ($codeArea.length > 0) {
        //复制成功后将要干的事情
        function changeToSuccess(item) {
             $imgOK = $("#copyBtn").find("#imgSuccess");
                if ($imgOK.css("display") == "none") {
                    $imgOK.css({
                        opacity: 0,
                        display: "block"
                    });
                    $imgOK.animate({
                        opacity: 1
                    }, 1000);
                    setTimeout(function() {
                        $imgOK.animate({
                            opacity: 0
                        }, 1000);
                    }, 1000);
                    setTimeout(function() {
                        $imgOK.css("display", "none");
                    }, 1000);
                };
        };
        //创建 全局复制按钮，仅有一组。包含：复制按钮，复制成功响应按钮
        //值得注意的是：1.按钮默认隐藏，2.位置使用绝对位置 position: absolute; (position: fixed 也可以，需要修改代码)
        $(".blog-post").before('<div id="copyBtn" style="opacity: 0; position: absolute;top:0px;display: none;line-height: 1; font-size:1.5em"> \
                                    <span id="imgCopy" > \
                                        <i class="fa fa-paste fa-fw"></i> \
                                    </span> \
                                    <span id="imgSuccess" style="display: none;"> \
                                        <i class="fa fa-check-circle fa-fw" aria-hidden="true"></i> \
                                    </span>');
        //创建 复制 插件，绑定单机时间到 指定元素，支持JQuery
        var clipboard = new ClipboardJS('#copyBtn', {
            target: function() {
                //返回需要复制的元素内容
                return document.querySelector("[copyFlag]");
            },
            // target: function(trigger) {
            //     return trigger.nextElementSibling;
            // }
            // ,
            isSupported: function() {
                //支持复制内容
                return document.querySelector("[copyFlag]");
            }
        });
        //复制成功事件绑定
        clipboard.on('success',
            function(e) {
                //清除内容被选择状态
                e.clearSelection();
                changeToSuccess(e);
            });
        //复制失败绑定事件
        clipboard.on('error',
            function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        //鼠标 在复制按钮上滑动和离开后渐变显示/隐藏效果
        $("#copyBtn").hover(
            function() {
                $(this).stop();
                $(this).css("opacity", 1);
            },
            function() {
                $(this).animate({
                    opacity: 0
                }, 1000);
            }
        );
    }
}
//感应鼠标是否在代码区
$("pre").hover(
    function() {
        //-------鼠标活动在代码块内
        //移除之前含有复制标志代码块的 copyFlag
        $("[copyFlag]").removeAttr("copyFlag");
        //在新的（当前鼠标所在代码区）代码块插入标志：copyFlag
        $(this).find("ol").attr("copyFlag", 1);
        //获取复制按钮
        $copyBtn = $("#copyBtn");
        if ($copyBtn.lenght != 0) {
            //获取到按钮的前提下进行一下操作
            //停止按钮动画效果
            //设置为 显示状态
            //修改 复制按钮 位置到 当前代码块开始部位
            //设置代码块 左侧位置
            $copyBtn.stop();
            $copyBtn.css("opacity", 0.8);
            $copyBtn.css("display", "block");
            $copyBtn.css("top", parseInt($copyBtn.css("top")) + $(this).offset().top - $copyBtn.offset().top + 3);
            $copyBtn.css("left", $(this).offset().left-$copyBtn.width() - 3);
        }
    },
    function() {
        //-------鼠标离开代码块
        //设置复制按钮可见度 2秒内到 0
        $("#copyBtn").animate({
            opacity: 0
        }, 100);
    }
);

// function scrollSpy(menuSelector, options) {
//     var menu = $(menuSelector);
//     if(!visible(menu))
//         return;
//     options = options || {};
//     var offset = options.offset || 0;
//     var activeClassName = options.activeClassName || "active";

//     var scollTarget = menu.find("a").map(function() {
//             var item = $($(this).attr("href"));
//             if (item.length)
//                 return item[0]; // avoid becoming 2-dim jquery array
//         }), lastId = null, active = $();

//     $(window).scroll(function() {
//         // Get container scroll position
//         var fromTop = $(this).scrollTop() + offset;

//         // Get id of current scroll item
//         var id = scollTarget.filter(function() {
//             return $(this).offset().top < fromTop;
//         }).last().attr("id") || "";

//         if (lastId !== id) {
//             active.removeClass(activeClassName);
//             var newActive = [];

//             for(var target = menu.find("[href='#" + id + "']");
//                 target.length && !target.is(menu);
//                 target = target.parent()) {
//                 if(target.is("li"))
//                     newActive.push(target[0]);
//             }
//             active = $(newActive).addClass(activeClassName).trigger("scrollspy");
//             lastId = id;
//         }
//     });
// }

function setPostToC(){
    if($("#post-toc").length>0){
        if($("#post-toc").css("display")=="none"){
            $("#floating-button-toc").show()
        }else if($("#post-toc").css("display")=="block"){
            $("#floating-button-toc").hide()
        }
    }else{
        $("#floating-button-toc").hide()
    }
}
    //页面载入完成后，创建复制按钮
$(window).ready(function() {
    setPostToC();
    
    createCopyBtns();
    $('.fixed-action-btn').floatingActionButton({
        direction: 'top',
        hoverEnabled: false,
    });
    $('#slide-out').sidenav({
        edge: 'left',
        draggable: true,
        preventScrolling:false,
        onOpenStart:function(){
            $("#floating-button-sidebar").hide()
        },
        // onOpenEnd:function(){
        //     // $("#floating-button-sidebar").show()
        // },
        onCloseStart:function(){
            $("#floating-button-sidebar").show()
            var instance = M.FloatingActionButton.getInstance($('.fixed-action-btn'));
            instance.open();
        },
        onCloseEnd:function(){
            // $("#floating-button-sidebar").hide()
            // var sidenavOverlays = document.querySelectorAll('.sidenav-overlay');
            // [].forEach.call(sidenavOverlays, function(sidenavOverlay) {
            //     sidenavOverlay.removeAttr('style')
            //     sidenavOverlay.attr('style',"display: none;")
            // });
            // location.reload();
        }
    });
    $('#slide-toc-out').sidenav({
        edge: 'right',
        draggable: true,
        preventScrolling:false,
        onCloseStart:function(){
            var instance = M.FloatingActionButton.getInstance($('.fixed-action-btn'));
            instance.open();
        }
    });
    $(document).ready(function(){
        $('.toc-wrapper').pushpin({
            top: 0,
            offset:100,
        });
    });

    setTimeout(function() {
        var tocWrapperHeight = 260; // Max height of ads.
        var tocHeight = $('.toc-wrapper .table-of-contents').length ? $('.toc-wrapper .table-of-contents').height() : 0;
        var socialHeight = 95; // Height of unloaded social media in footer.
        var footerOffset = $('body > footer').first().length ? $('body > footer').first().offset().top : 0;
        var bottomOffset = footerOffset - socialHeight - tocHeight - tocWrapperHeight;

        if ($('nav').length) {
            $('.toc-wrapper').pushpin({
            top: $('nav').height(),
            bottom: bottomOffset
            });
        }
        else if ($('#index-banner').length) {
            $('.toc-wrapper').pushpin({
            top: $('#index-banner').height(),
            bottom: bottomOffset
            });
        }
        else {
            $('.toc-wrapper').pushpin({
            top: 0,
            offset:100,
            bottom: bottomOffset
            });
        }
    }, 100);
//   var tocContainer = $("#toc");
//   var toc = tocContainer.children(), tocHeight = toc.height();
//   scrollSpy(tocContainer, {offset: 200});

//   $(".toc-item").on("scrollspy", function() {
//       var tocTop = toc.scrollTop(),
//           link = $(this).children(".toc-link"),
//           thisTop = link.position().top;
//       // make sure the highlighted element contains no child
//       if($(this).height() != link.height())
//           return;
//       // if the highlighted element is above current view of toc
//       if(thisTop <= 0)
//           toc.scrollTop(tocTop + thisTop);
//       // else if below current view of toc
//       else if(tocHeight <= thisTop)
//           toc.scrollTop(tocTop + thisTop + link.outerHeight() - tocHeight);
//   });
});

$(window).load(function() {
    setPostToC();
});

$(window).resize(function() {
    setPostToC();
});

// var amountScrolled = 300;
// $(window).scroll(function() {
// 	if ( $(window).scrollTop() > amountScrolled ) {
//         $('a#floating-button-up').fadeIn('slow');
//         $('a#floating-button-down').fadeOut('slow');
// 	} else {
//         $('a#floating-button-up').fadeOut('slow');
//         $('a#floating-button-down').fadeIn('slow');
// 	}
// });
$('a#floating-button-up').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 700);
	return false;
});
$('a#floating-button-down').click(function() {
	$('html, body').animate({
		scrollTop: $(document).height()-$(window).height()
	}, 700);
	return false;
});