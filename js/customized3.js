$(document).ready(function () {
  $('.btn').click(function () {

    const selects = $('.option select');
    if (selects.length < 2) {
      alert("找不到下拉選單，請確認 HTML 結構！");
      return;
    }
    let styleText = selects.eq(0).find("option:selected").text().trim();
    let materialText = selects.eq(1).find("option:selected").text().trim();
    let skinOption = $('.choose input:checked').parent().text().trim() || '（未選擇）';
    let part = $('.parts input').val().trim() || '';
    let length = $('.length input').eq(0).val().trim() || '';
    let width = $('.length input').eq(1).val().trim() || '';


    let message = `估價懇請加LINE，歡迎複製訊息:你好老闆!我要修理沙發樣式[${styleText}]材料選擇[${materialText}]，[${skinOption}]然後局部位子是[${part}]大約長[${length}m]寬[${width}m]，謝謝`;

    $('#customMessage').text(message);

    $('#customModal').fadeIn();
  });

  $('.close').click(function () {
    $('#customModal').fadeOut();
  });
  $(window).click(function (e) {
    if ($(e.target).is('#customModal')) {
      $('#customModal').fadeOut();
    }
  });
});
