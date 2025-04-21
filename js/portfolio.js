$(function () {
    const $drag = $('#drag');
    const $cover = $('.cover');
    const $picture = $('.picture');

    // jQuery UI - 滑鼠拖拉
    $drag.draggable({
        axis: 'x',
        containment: 'parent',
        scroll: false,
        drag() {
            let dragPosition = $(this).css('left');
            $cover.css('width', dragPosition);
        },
    });
    let isTouching = false;

    $drag.on('touchstart', function (e) {
        isTouching = true;
        e.preventDefault();
    });

    $(document).on('touchmove', function (e) {
        if (!isTouching) return;

        const touch = e.originalEvent.touches[0];
        const pictureOffset = $picture.offset().left;
        const pictureWidth = $picture.width();
        let touchX = touch.pageX - pictureOffset;

        if (touchX < 0) touchX = 0;
        if (touchX > pictureWidth) touchX = pictureWidth;


        $drag.css('left', touchX + 'px');
        $cover.css('width', touchX + 'px');
    });

    $(document).on('touchend', function () {
        isTouching = false;
    });
});
