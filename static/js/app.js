$(document).ready(function() {
    var video = $('video').get(0);
    navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
      video.srcObject = stream;
    });
  
    $('#capture-btn').click(function() {
      var label = $('#label-input').val();
      var canvas = $('<canvas />', {
        width: video.videoWidth,
        height: video.videoHeight
      });
      var canvas_div = $('<div />', {
        class: 'col-sm-6'
      });
      canvas_div.append(canvas);
      $('#images-container .row').append(canvas_div);
      var context = canvas.get(0).getContext('2d');
      context.drawImage(video, 0, 0, canvas.width(), canvas.height());
      var img = canvas.get(0).toDataURL();
      $.post('/save', { img: img, label: label }, function() {
        var img_div = $('<div />', {
          class: 'col-sm-6'
        });
        var img_thumbnail = $('<img />', {
          class: 'img-thumbnail',
          src: img
        });
        var label_p = $('<p />', {
          text: label
        });
        img_div.append(img_thumbnail);
        img_div.append(label_p);
        $('#images-container .row').prepend(img_div);
      });
    });
  });
  