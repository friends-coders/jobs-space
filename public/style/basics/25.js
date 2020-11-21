(function($) {
    $.exists = function(selector) {
      return ($(selector).length > 0);
    }
    if ($.exists('#tb-svg-wave')) {
      var colors = ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)'];
      var componentWidth = "100%";
      var componentHeight = "200";
      var width = 400,
        height = 32,
        deepth = 150,
        speed = 3,
        speedOffset = 1,
        focus = 0.5,
        offset = -width * 0.75,
        waveCount = 0;
      var x = [0, offset];
      var cacheData = ["", ""];
  
      var svgWave = document.querySelector('#tb-svg-wave');
      var paths = svgWave.querySelectorAll('path');
      var path1 = paths[0],
        path2 = paths[1];
  
      config();
      var oldFunc = window.onresize;
      window.onresize = function() {
        oldFunc && oldFunc();
        config(true);
      }
  
      requestAnimationFrame(wave);
  
      function config(resize) {
        cacheData = ["", ""];
        svgWave.setAttribute('width', componentWidth);
        svgWave.setAttribute('height', componentHeight);
        var pxWidth = componentWidth == "100%" ? svgWave.parentNode.clientWidth : componentWidth;
        waveCount = Math.ceil(pxWidth / width / 1) + 1;
        if (resize == true) return;
        path1.setAttribute('fill', colors[0]);
        path2.setAttribute('fill', colors[1]);
  
      }
  
      function wave() {
        path1.setAttribute('d', generateData(0));
        path2.setAttribute('d', generateData(1));
        x[0] -= speed;
        x[1] -= (speed + speedOffset);
        requestAnimationFrame(wave);
      }
  
      function generateData(index) {
        if (x[index] % (width * 2) == 0) {
          x[index] = 0;
        }
        var startX = x[index],
          startY = height;
        var start = [startX, startY].join(',');
  
        if (cacheData[index] == "") {
          var c_x1 = width / 4 * (focus + 1),
            c_y1 = c_y2 = -height / 2,
            c_x2 = width - c_x1,
            c_x = width,
            c_y = 0;
          var curvetoUp = [c_x1, c_y1, c_x2, c_y2, c_x, c_y].join(' ');
          c_y1 = c_y2 = height / 2;
          var curvetoDown = [c_x1, c_y1, c_x2, c_y2, c_x, c_y].join(' ');
          var curvetoData = "";
          for (var i = 0; i < waveCount; i++) {
            curvetoData = curvetoData + 'c' + curvetoUp + 'c' + curvetoDown;
          }
  
          var end = 'l0,' + deepth + ' l-' + waveCount * width * 2 + ',0Z'
          cacheData[index] = [curvetoData, end].join('');
        }
        return ['M', start, cacheData[index]].join('');
      }
    }
  })(jQuery);