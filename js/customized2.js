$(document).ready(function () {
    $('.btn').click(function () {
      const seatOption = $('#seat option:selected').text();
      const materialOption = $('#material option:selected').text();
      const length = $('#length').val();
      const width = $('#width').val();
  
      if (!seatOption || seatOption.includes('請選擇') ||
          !materialOption || materialOption.includes('請選擇') ||
          !length || !width) {
        alert('請完整填寫所有項目！');
        return;
      }
  
      const message = `估價懇請加LINE，歡迎複製訊息:你好老闆！我要訂做沙發樣式 [${seatOption}] 材料選擇 [${materialOption}]，大約長 [${length}m] 寬 [${width}m]，謝謝！`;
  
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
  