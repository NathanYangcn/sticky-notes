var WaterFall = (function(){
  var $ct;
  var $items;
  //瀑布流图片布局渲染方法 ↓
  function renderd($c){
    $ct = $c;
    $items = $ct.children();

    var ctWidth = $ct.width();
    var itemsWidth = $items.outerWidth(true);
    //初始化 ↓
    var cols = parseInt(ctWidth / itemsWidth);
    var itemsArr = [];
    for(var i = 0; i < cols; i++){
      itemsArr[i] = 0;
    }
    //遍历每个元素，按照规定进行摆放 ↓
    $items.each(function () {
      var $this = $(this);
      var thisHeight = $this.outerHeight(true);

      var minHeight = Math.min.apply(null, itemsArr);
      var minIndex = itemsArr.indexOf(minHeight);

      $this.css({
        top: minHeight,
        left: minIndex * itemsWidth
      });
      itemsArr[minIndex] += thisHeight;
      $ct.height(Math.max.apply(null, itemsArr));
      // $('#content').css('width', cols*itemsWidth); // 不能容器设置宽度，否则监听resize无作用
    });
  }

  //监听窗口宽高的改变，以便重新调用瀑布流函数渲染界面 ↓
  $(window).on('resize', function(){
    renderd($ct);
  });

  return {
    render: renderd
  }
})();

module.exports.WaterFall = WaterFall;