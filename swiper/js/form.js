(function ($) {
  $.fn.prmform = function (options, param) {
    var addr = "http://192.168.2.84/business/";
    options = $.extend({}, $.fn.prmform.defaults, options || {});
    var target = $(this);
    init(target);
    // 初始化表单弹窗以及阴影部分
    function init(target) {
      target.append("<div class='dialog_shadow'></div>");
      var content = "<div class='apply_dialog'>"
        +"<div class='ad_content'>"
          +"<h1>请填写您的信息</h1>"
          +"<form id='apply_form' autocomplete='off'>"
            +"<p>"
              +"<label for='name'>*</label>"
              +"<input placeholder='姓名' name='name' class='ad_name'>"
            +"</p>"
            +"<p>"
              +"<label for='phone'>*</label>"
              +"<input placeholder='手机号' name='phone' class='ad_phone'>"
              +"<span class='phone_err'>该手机号已提交</span>"
            +"</p>"
            +"<p>"
              +"<label for='type'>*</label>"
              +"<select name='type' class='ad_type' style='width: 440px;'>"
                +"<option value='0' id='defaulttype'>请选择业务类型</option>"
              +"</select>"
            +"</p>"
            +"<p>"
              +"<label for='area'>*</label>"
              +"<select name='province' class='ad_province'>"
                +"<option value='0' id='defaultProvince'>请选择省份</option>"
              +"</select>"
              +"<select name='city' class='ad_city'>"
                +"<option value='0' id='defaultCity'>请选择城市</option>"
              +"</select>"
              +"<select name='area' class='ad_area'>"
                +"<option value='0' id='defaultArea'>请选择区县</option>"
              +"</select>"
            +"</p>"
            +"<p>"
              +"<label>*</label>"
              +"<textarea placeholder='请描述您的需求，我们会尽快联系您。（200字以内）' class='ad_note' style='margin-bottom: 0;'></textarea>"
            +"</p>"
            +"<h4 style='text-align:right;color:#b0b0b0;padding-right: 16px;font-size:12px;margin-bottom: 10px;'>还可以输入"
              +"<span class='titleWordNum'>200</span>字</h4>"
            +"<input type='button' value='提交' class='ad_submit'>"
          +"</form>"
          +"<p class='ad_tips'><span>*</span>同一手机号每天最多只能提交一次，不可重复提交。</p>"
          +"<p class='ad_tips'><span>*</span>号为必填项。</p>"
          +"<i class='ad_close'></i>"
        +"</div>"
      +"</div>";
      target.append(content);
      successDialog(target);
      target.find('.apply_btn').click(function () {
        $("body").css({ "overflow": "hidden" });
        $(".apply_dialog").fadeIn();
        $(".dialog_shadow").fadeIn(300);
        getProvinces();
        getSourceOptions();
      })
      $(".apply_dialog .ad_close").click(function () {
        $(".apply_dialog").fadeOut();
        $(".dialog_shadow").fadeOut();
        $('input.ad_name').val("");
        $('input.ad_phone').val("");
        $('.ad_note').val("");
        $('.ad_province').val("0");
        $('.ad_city').val("0");
        $('.ad_area').val("0");
        $('.apply_dialog .phone_err').css({
          'opacity':'0'
        })
        $("body").css({ "overflow": "auto" });
      })
      $(".success_dialog .sd_close").click(function () {
        $(".success_dialog").fadeOut();
        $("body").css({ "overflow": "auto" });
      })
      $('.ad_phone').focus(function () {
        $('.apply_dialog .phone_err').css({
          'opacity':'0'
        })
      })
      $('.ad_note').keyup(function () {
        var titleAreaVal = $('.ad_note').val();
        var txtNum = parseInt(getLength(titleAreaVal) / 2)
        if (txtNum > 200) {
          txtNum = 200
        }
        $('.titleWordNum').text(200 - txtNum);
        var sum = 0;
        for (var i = 0; i < titleAreaVal.length; i++) {
          if ((titleAreaVal.charCodeAt(i) >= 0) && (titleAreaVal.charCodeAt(i) <= 255)) {
            sum = sum + 1;
          } else {
            sum = sum + 2;
          }
          if (sum > 400) {
            alert("需求描述不超过200字！");
            var str = titleAreaVal.substring(0, i);
            $('.ad_note').val(str);
            $('.titleWordNum').text(200 - txtNum);
            break;
          } else {
            // $('.titleWordNum').text(100 - parseInt(getLength(titleAreaVal)/2));  
          }
        }
      });
      $("#apply_form .ad_submit").click(function () {
        var contactMan = $(".ad_name").val();
        var phone = $(".ad_phone").val();
        var provinceCode = $(".ad_province").val();
        var province = $(".ad_province option:selected").text()
        var cityCode = $(".ad_city").val();
        var city = $(".ad_city  option:selected").text();
        var areaCode = $(".ad_area").val();
        var area = $(".ad_area option:selected").text()
        var description = $(".ad_note").val()
        var busiType = $('.ad_type').val()
    
        if (!contactMan) {
          alert('请输入姓名！')
          return false
        }
        if (phone && !(/^1(3|4|5|7|8|9)\d{9}$/.test(phone))) {
          alert('请输入正确的手机号码！')
          return false
        }
        if (!province || province == "请选择省份") {
          alert('请选择省份！')
          return false
        }
        if (!city || city == "请选择城市") {
          alert('请选择城市！')
          return false
        }
        if (!area || area == "请选择区县") {
          alert('请选择区县！')
          return false
        }
        //校验手机号
        if(!validatePhone()){
          return false;
        }
        if (!description) {
          alert('请填写您的需求描述！')
          return false
        }
        var req = {
          "tenantId": 1,
          "busiType": busiType,
          "province": province,
          "provinceCode": provinceCode,
          "city": city,
          "cityCode": cityCode,
          "area": area,
          "areaCode": areaCode,
          "contactMan": contactMan,
          "phone": phone,
          "description": description,
          "source": "官网"
        }
        req = JSON.stringify(req)
        $.ajax({
          url: addr + "market/addSalesLead",
          type: "POST",
          contentType: 'application/json',
          data: req,
          dataType: "json",
          crossDomain: true,
          success: function (res) {
            if (res.code == 200) {
              $(".apply_dialog").fadeOut();
              $(".success_dialog").fadeIn();
              $(".dialog_shadow").fadeIn(300);
              var x = 3;
              var timer = setInterval(function () {
                x--;
                if (x > 0) {
                  $(".success_dialog .sd_seconds").html(x)
                } else {
                  $(".success_dialog").fadeOut();
                  $(".dialog_shadow").fadeOut();
                  $(".success_dialog .sd_tips1").css({ "display": "block" });
                  $(".success_dialog .sd_tips2").html("自动消失")
                  $("body").css({ "overflow": "auto" });
                  clearInterval(timer);
                }
              }, 1000)
              $('input.ad_name').val("");
              $('input.ad_phone').val("");
              $('.ad_note').val("");
              $('.ad_province').val("0");
              $('.ad_city').val("0");
              $('.ad_area').val("0");
            } else {
              alert(res.msg)
            }
          }
        })
      })
      $(".apply_dialog .ad_province").change(function () {
        var provinceId = $(".apply_dialog .ad_province").children('option:selected').val()
        getCities(provinceId)
      })
      $(".apply_dialog .ad_city").change(function () {
        var cityId = $(".apply_dialog .ad_city").children('option:selected').val()
        getAreas(cityId)
      })
    }
    function getProvinces() {
      $("#defaultProvince").siblings().remove();
      $("#defaultCity").siblings().remove();
      $("#defaultArea").siblings().remove();
      $.ajax({
        url: addr + "config/provinces",
        type: "POST",
        data: "",
        dataType: "json",
        contentType: 'application/json',
        crossDomain: true,
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            $(".apply_dialog .ad_province").append('<option value="' + res.data[i].provinceid + '">' + res.data[i].province + '</option>')
          }
        }
      })
    }
    function getCities(id) {
      var req = {
        "provinceid": id
      }
      req = JSON.stringify(req)
      $("#defaultCity").siblings().remove();
      $("#defaultArea").siblings().remove();
      $.ajax({
        url: addr + "config/cities",
        type: "POST",
        contentType: 'application/json',
        data: req,
        dataType: "json",
        crossDomain: true,
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            $(".apply_dialog .ad_city").append('<option value="' + res.data[i].cityid + '">' + res.data[i].city + '</option>')
          }
        }
      })
    }
    function getAreas(id) {
      var req = {
        cityid: id
      }
      req = JSON.stringify(req)
      $("#defaultArea").siblings().remove();
      $.ajax({
        url: addr + "config/areas",
        type: "POST",
        contentType: 'application/json',
        data: req,
        dataType: "json",
        crossDomain: true,
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            $(".apply_dialog .ad_area").append('<option value="' + res.data[i].areaid + '">' + res.data[i].area + '</option>')
          }
        }
      })
    }
    function getSourceOptions() {
      $(".apply_dialog .ad_type").empty();
      var req = {
        "typeCode": "sales_lead_busi_type"
      }
      req = JSON.stringify(req)
      $.ajax({
        url: addr + "config/dictionary",
        type: "POST",
        contentType: 'application/json',
        data: req,
        dataType: "json",
        crossDomain: true,
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            $(".apply_dialog .ad_type").append('<option value="' + res.data[i].itemCode + '">' + res.data[i].itemValue + '</option>')
          }
          if(CheckUrl('hotel')){
            $('.ad_type').val("4");
          }else if(CheckUrl('house')){
            $('.ad_type').val("3");
          }else if(CheckUrl('office')){
            $('.ad_type').val("9");
          }else if(CheckUrl('product')){
            $('.ad_type').val("8");
          }else if(CheckUrl('ecologyCooperation')){
            $('.ad_type').val("6");
          }else{
            $('.ad_type').val("1");
          }
        }
      })
    }
    function CheckUrl(name){ 
      var reg=eval("/"+name+"/g");
      var r = window.location.pathname; 
      var flag=reg.test(r);
      if(flag){
        return true;
      }else{
        return false;
      } 
    }
    function validatePhone() {
      var req = {
        phone: $('.ad_phone').val()
      }
      var result = true;
      req = JSON.stringify(req)
      $.ajax({
        url: addr + "market/phoneDuplicateDetect",
        type: "POST",
        contentType: 'application/json',
        data: req,
        async:false,
        dataType: "json",
        crossDomain: true,
        success:function (res) {
          if(res.code != 200){
            // $('.apply_dialog .phone_err').css({
            //   'opacity':'1'
            // })
            alert("该手机号已提交信息")
            result = false
          }else{
            result = true
          }
        }
      })
      return result;
    }
    function getLength(str) {
      myLen = 0;
      i = 0;
      for (; (i < str.length) && (myLen <= 400); i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
          myLen++;
        else
          myLen += 2;
      }
      return myLen;
    }
    // 初始化表单提交成功弹窗
    function successDialog(target) {
      var content = "<div class='success_dialog'><h1>提交成功！</h1><p class='sd_tips1'>我们将在3小时内联系您!请保持手机畅通。</p><p><span class='sd_seconds'>3</span>秒后<span class='sd_tips2'>自动消失</span></p><i class='sd_close'></i></div>"
      target.append(content)
      $(".success_dialog .sd_close").click(function () {
        $(".success_dialog").fadeOut();
        $("body").css({ "overflow": "auto" });
      })
    }
  }
})(jQuery)