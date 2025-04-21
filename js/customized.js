$(document).ready(function () {
    let locked = false;
  
    $('.thumbnail').on('mouseenter', function () {
      if (!locked) {
        const newSrc = $(this).attr('src');
        $('#mainImage').attr('src', newSrc);
      }
    });
  
    $('.thumbnail').on('click', function () {
      locked = true;
      $('.thumbnail').removeClass('active');
      $(this).addClass('active');
      const newSrc = $(this).attr('src');
      $('#mainImage').attr('src', newSrc);
    });
    $('#mainImage').on('dblclick', function () {
      locked = false;
    });
  });
  