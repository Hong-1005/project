$(document).ready(function() {
  // 所有文字區塊
  const textBlocks = $(".text-block");
  
  // 初始隱藏所有文字區塊
  textBlocks.css("opacity", 0);
  
  // 檢查元素是否在視野中
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
          rect.bottom >= 0
      );
  }
  
  // 處理滾動事件
  function handleScroll() {
      textBlocks.each(function() {
          if (isElementInViewport(this) && $(this).css("opacity") == 0) {
              // 當元素進入視野且尚未顯示時，執行淡入效果
              $(this).animate({ opacity: 1 }, 1000);
          }
      });
  }
  
  // 監聽滾動事件
  $(window).on("scroll", handleScroll);
  
  // 頁面加載時檢查一次
  handleScroll();
  
  // 實現循環淡入淡出效果
  let activeIndex = 0;
  let isAnimating = false;
  
  // 自動輪播功能
  function startAutoFade() {
      if (isAnimating) return;
      
      isAnimating = true;
      
      // 當前顯示的區塊淡出
      $(textBlocks[activeIndex]).fadeOut(1500, function() {
          // 切換到下一個區塊
          activeIndex = (activeIndex + 1) % textBlocks.length;
          
          // 下一個區塊淡入
          $(textBlocks[activeIndex]).fadeIn(1500, function() {
              isAnimating = false;
              
              // 設置延遲，然後繼續下一輪
              setTimeout(startAutoFade, 4000);
          });
      });
  }
  
  // 根據URL參數決定是否啟用自動輪播
  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  
  // 如果URL中有autoFade=true參數，啟用自動輪播
  if (getUrlParameter('autoFade') === 'true') {
      // 初始顯示第一個區塊，隱藏其他區塊
      textBlocks.hide();
      $(textBlocks[0]).show();
      
      // 延遲啟動自動輪播
      setTimeout(startAutoFade, 4000);
  }

});