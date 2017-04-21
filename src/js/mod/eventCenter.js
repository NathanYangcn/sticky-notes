var EventCenter = (function () {
    // 事件池子
    var events = {};
    // 事件监听端
    function on(evt, handler) {
        // 建立evt名称的所有句柄函数列表
        events[evt] = events[evt] || [];
        events[evt].push({
            handler: handler
        })
    }
    // 事件发送端
    function fire(evt, args) {
        if(!events[evt]){
            return
        }
        // 遍历evt名称并执行所有句柄函数
        for(var i = 0; i < events[evt].length; i++){
            events[evt][i].handler(args);
        }
    }
    return {
        on: on,
        fire: fire
    }
})();

module.exports.EventCenter = EventCenter;