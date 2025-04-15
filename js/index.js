$(document).ready(function () {
    var $carousel = $('.carousel-list');
    var $items = $('.cards');
    var currentIndex = 0;
    var itemCount = $items.length;
    var autoPlayTimer;
    var autoPlayDelay = 1000; // 自動播放間隔，單位毫秒
    var cardWidth = 300; // 一張卡片的寬度，單位像素

    // 如果卡片數量小於2，不需要輪播
    if (itemCount < 2) return;

    // 設置初始位置
    function resetCarousel() {
        var translateX = -currentIndex * cardWidth + 'px';
        $carousel.css('transform', 'translateX(' + translateX + ')');
    }

    // 自動播放
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(function () {
            // 增加索引，準備顯示下一張
            currentIndex++;

            // 如果已經是最後一張之後，重置為第一張
            if (currentIndex >= itemCount) {
                currentIndex = 0;
            }

            // 移動到新的位置
            resetCarousel();
        }, autoPlayDelay);
    }

    // 停止自動播放
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // 滑鼠進入停止，離開繼續
    $('.carousel-container').hover(
        function () {
            stopAutoPlay();
        },
        function () {
            startAutoPlay();
        }
    );

    // 響應式調整 - 當窗口大小改變時，重新定位輪播
    $(window).resize(function () {
        resetCarousel();
    });

    // 設置初始位置，確保從第一張開始
    currentIndex = 0;
    resetCarousel();

    // 開始自動播放
    startAutoPlay();
});