!(function ($) {
  // $.validator.setDefaults({
  //   submitHandler: function() {
  //     alert("提交事件!");
  //   }
  // });
  // $('#loginForm').validate();
})(jQuery)

$.validator.setDefaults({
  submitHandler: function() {
    alert("提交事件!");
  }
});
$().ready(function() {
  // 在键盘按下并释放及提交后验证提交表单
  $("#loginForm").validate({
      rules: {
        firstname: "required",
        lastname: "required"
      },
      messages: {
        firstname: "请输入您的名字",
        lastname: "请输入您的姓氏"
      }
  });
});