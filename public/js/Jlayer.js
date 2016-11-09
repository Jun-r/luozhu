layer.config({
      extend: ['skin/Jlayer/style.css'], //加载新皮肤
      skin: 'layui-ext-Jlayer'
    });
var ModalPage = {
  "confirm_html": '<div class="layer_html"><a class="icon ti-close" id="confirm_html_close"></a><div class="layer_html_content">{content}</div><div class="layer_html_btn"><a id="confirm_html_btn" class="confirm_btn">{confirm}</a><a id="cancel_html_btn" class="cancel_btn">{cancel}</a></div></div>',
  "alert_html": '<div class="layer_html"><a class="icon ti-close" id="alert_html_close"></a><div class="layer_html_content">{content}</div><div class="layer_html_btn"><a id="alert_html_btn" class="confirm_btn">{confirm}</a></div></div>',
}

var J = {
  //当前弹窗索引
  index: layer.index,
  //关闭当前弹窗
  close: function (index) {
    layer.close(index);
  },
  //全局关闭方法
  closeAll: function () {
    layer.closeAll();
  },
  //加载
  load: function (offset) {
    var index = layer.load(0, { offset: offset || "auto" });
    return index;
  },
  //共用弹窗
  title:"提示",
  alertHtml: function (html, callbark, okCall, offset) {
    layer.open({
      type: 1,
      maxWidth: 'auto',
      move: false,
      shift: 0,
      offset: (typeof offset !== "function" && offset) || "auto",
      title: J.title ,
      content: html,
      cancel: function (index) {
        layer.close(index);
      },
      success: function (layero, index) {
        $("#cen_creative").off("click").on("click", function () {
          layer.close(index);
        })
        $("#ok_creative").off("click").on("click", function () {
          okCall && okCall(index, layero);
        });
        callbark && callbark(layero, index);
      }
    });

  },
  //提示
  Msg: function (content, callback, time) {
    if (typeof callback == 'string') {
      var offset = callback;
    }
    if (typeof callback == 'number') {
      time = 0;
    }
    layer.msg(content, {
      time: time || 2000, //2秒关闭（如果不配置，默认是3秒）
      offset: offset || "auto"
    }, function () {
      typeof callback == 'function' && callback && callback();
    });
  },
  rMsg: function (content) {
    var tabBox = $(".tab_box.active"),
        tW = tabBox.outerWidth(),
        tabBoxL = tabBox.offset().left,
        tabBoxT = tabBox.offset().top;
    layer.msg(content, {
      area: [(tW + 45) + "px", "44px"],
      time: 2200, //2秒关闭（如果不配置，默认是3秒）
      offset: [tabBoxT, tabBoxL],
      shift: 7
    })
  },
  tips: function (content, that) {
    var index = layer.open({
      type: 4,
      content: [content, that],
      closeBtn: false,
      maxWidth: 210,
      tips: [1, '#0FA6D8'], //还可配置颜色
      time: 0,
      shift: 5
    });
    return index;

  },
  //带确定alert提示
  alert: function (content, callbark) {
    var contentjson = [], confirmBtn;
    if (typeof content == "object") {
      contentjson = content;
    }

    if (typeof contentjson[1] == 'boolean') {
      contentjson[2] = contentjson[1];
    }
    if (typeof contentjson[1] == 'string') {
      confirmBtn = contentjson[1];
    }
    var markup = ModalPage.alert_html.replace('{content}', contentjson[0] || content)
        .replace('{confirm}', confirmBtn || '确定');
    layer.open({
      type: 1,
      //shadeClose: !contentjson[2]?true:false,
      closeBtn: false,
      title: false,
      content: markup,
      success: function (layero, index) {
        if (!contentjson[2]) {
          $("#alert_html_close").off("click").on("click", function () {
            layer.close(index);
          })
        } else {
          $("#alert_html_close").remove();
        }
        $("#alert_html_btn").off("click").on("click", function () {
          (callbark && callbark(index)) || layer.close(index); ;
          return false;
        })
      }
    });

  },
  //带确定取消的提示
  confirm: function (content, callbark, cancelcallbark, offset) {
    var contentjson = [];
    if (typeof content == "object") {
      contentjson = content;
    }
    if (typeof cancelcallbark == "string") {
      offset = cancelcallbark
    }
    var markup = ModalPage.confirm_html.replace('{content}', contentjson[0] || content)
        .replace('{confirm}', contentjson[1] || '确定')
        .replace('{cancel}', contentjson[2] || '取消');
    var index = layer.open({
      offset: offset || "auto",
      type: 1,
      closeBtn: false,
      title: false,
      content: markup,
      success: function (layero, index) {
        $("#confirm_html_close").off("click").on("click", function () {
          layer.close(index);
        })
        $("#cancel_html_btn").off("click").on("click", function () {
          (typeof cancelcallbark == 'function' && cancelcallbark && cancelcallbark(index)) || layer.close(index);
          return false;
        })
        $("#confirm_html_btn").off("click").on("click", function () {
          (callbark && callbark(index)) || layer.close(index); ;
          return false;
        })
      }

    });


  }
}
