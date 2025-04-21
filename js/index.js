
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item'); 
    const originalItems = items.length / 2;
    let currentPosition = 0; 
    let scrollSpeed = 1; 
    let animationId;

    function init() {
        
        Promise.all(Array.from(document.querySelectorAll('.carousel-item img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })).then(() => {
            setupCarousel();
        });
    }

    // 設置輪播牆
    function setupCarousel() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const itemWidth = containerWidth * 0.25;
        items.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });

        track.style.transform = 'translateX(0)';
        startAnimation();
        setupEventListeners();
    }

    // 開始滾動動畫
    function startAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        function animate() {
            currentPosition += scrollSpeed;
            const itemWidth = items[0].offsetWidth;
            if (currentPosition >= itemWidth * originalItems) {
                currentPosition = 0;
            }
            track.style.transform = `translateX(${-currentPosition}px)`;
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }

    // 設置事件監聽器
    function setupEventListeners() {
        document.querySelector('.carousel-container').addEventListener('mouseenter', function () {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
        document.querySelector('.carousel-container').addEventListener('mouseleave', function () {
            if (!animationId) {
                startAnimation();
            }
        });
    }
    init();
});

  