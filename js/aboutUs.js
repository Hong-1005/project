$(document).ready(function() {
  const textBlocks = $(".text-block");
  textBlocks.css("opacity", 0);
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
              $(this).animate({ opacity: 1 }, 1000);
          }
      });
  }
  
  // 監聽滾動事件
  $(window).on("scroll", handleScroll);
  handleScroll();
  let activeIndex = 0;
  let isAnimating = false;

  function startAutoFade() {
      if (isAnimating) return;
      
      isAnimating = true;
      $(textBlocks[activeIndex]).fadeOut(1500, function() {
          activeIndex = (activeIndex + 1) % textBlocks.length;
          $(textBlocks[activeIndex]).fadeIn(1500, function() {
              isAnimating = false;
              setTimeout(startAutoFade, 4000);
          });
      });
  }
  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  if (getUrlParameter('autoFade') === 'true') {
      textBlocks.hide();
      $(textBlocks[0]).show();
    
      setTimeout(startAutoFade, 4000);
  }

});