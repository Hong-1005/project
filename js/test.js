// 等待DOM完全加載後執行
document.addEventListener('DOMContentLoaded', function() {
  // 選取所需的DOM元素
  const track = document.querySelector('.carousel-track'); // 輪播軌道
  const items = document.querySelectorAll('.carousel-item'); // 所有輪播項目
  const originalItems = items.length / 2; // 原始項目數（已複製一份用於無縫滾動）
  
  // 輪播相關變量
  let currentPosition = 0; // 初始位置設為0，確保從第一張圖片開始
  let scrollSpeed = 1; // 滾動速度（像素/幀）
  let animationId; // 動畫ID，用於取消動畫
  
  // 初始化函數
  function init() {
      // 確保所有圖片都已載入
      Promise.all(Array.from(document.querySelectorAll('.carousel-item img')).map(img => {
          // 如果圖片已經載入，立即解析Promise
          if (img.complete) return Promise.resolve();
          // 如果圖片未載入，等待載入完成
          return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // 即使載入失敗也繼續
          });
      })).then(() => {
          // 圖片載入完成後初始化輪播
          setupCarousel();
      });
  }
  
  // 設置輪播牆
  function setupCarousel() {
      // 確保正確設置每個項目的寬度
      const containerWidth = document.querySelector('.carousel-container').offsetWidth;
      const itemWidth = containerWidth * 0.25; // 25%的容器寬度
      
      // 設置每個項目的實際寬度
      items.forEach(item => {
          item.style.width = `${itemWidth}px`;
      });
      
      // 確保起始位置為0，第一張圖片完整顯示
      track.style.transform = 'translateX(0)';
      
      // 開始動畫
      startAnimation();
      
      // 設置事件監聽器
      setupEventListeners();
  }
  
  // 開始滾動動畫
  function startAnimation() {
      // 如果已經有動畫在運行，先取消它
      if (animationId) {
          cancelAnimationFrame(animationId);
      }
      
      // 動畫函數
      function animate() {
          // 更新位置
          currentPosition += scrollSpeed;
          
          // 計算每個項目的寬度
          const itemWidth = items[0].offsetWidth;
          
          // 檢查是否需要無縫循環回開始位置
          if (currentPosition >= itemWidth * originalItems) {
              currentPosition = 0;
          }
          
          // 應用新位置
          track.style.transform = `translateX(${-currentPosition}px)`;
          
          // 繼續動畫
          animationId = requestAnimationFrame(animate);
      }
      
      // 開始動畫
      animate();
  }
  
  // 設置事件監聽器
  function setupEventListeners() {
      // 當鼠標懸停在輪播上時暫停
      document.querySelector('.carousel-container').addEventListener('mouseenter', function() {
          // 如果有正在運行的動畫，取消它
          if (animationId) {
              cancelAnimationFrame(animationId);
              animationId = null;
          }
      });
      
      // 當鼠標離開輪播時恢復播放
      document.querySelector('.carousel-container').addEventListener('mouseleave', function() {
          // 如果沒有動畫在運行，重新開始動畫
          if (!animationId) {
              startAnimation();
          }
      });
  }
  
  // 初始化輪播牆
  init();
});