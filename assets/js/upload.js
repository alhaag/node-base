$(function() {
  $('.image-editor').cropit({
    exportZoom: 2, // multiplicador do tamanho de exportação
    imageBackground: true,
    width:400,
    height:250,
    minZoom: 'fit', // | fill
    smallImage: 'allow',
    imageBackgroundBorderWidth: 50
  });

  $('.export').click(function() {
    var imageData = $('.image-editor').cropit('export');
    window.open(imageData);
  });

  $('.select-image-btn').click(function() {
    $('.cropit-image-input').click();
  });
});

$(document).ready(function () {

});
