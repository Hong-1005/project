$(document).ready(function () {
    // 顯示彈窗
    $(".btn:contains('廠商估價')").on("click", function () {
        $("#quoteModal").fadeIn();
    });

    // 點擊關閉按鈕
    $(".close").on("click", function () {
        $("#quoteModal").fadeOut();
    });

    // 點擊彈窗外部也關閉
    $(window).on("click", function (e) {
        if ($(e.target).is("#quoteModal")) {
            $("#quoteModal").fadeOut();
        }
    });
});
