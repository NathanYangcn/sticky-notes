var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var EventCenter = require('./eventCenter.js').EventCenter;

var NoteManager = (function () {
    // 加载数据
    function load() {
        $.ajax({
            type: 'get',
            url: '/api/notes'
        }).done(function (ret) {
            if(ret.status == 0){
                $.each(ret.data, function(idx, article) {
                    new Note({
                        id: article.id,
                        context: article.text
                    })
                });
                EventCenter.fire('waterfall');
            }else {
                Toast('服务器出错了!');
            }
        }).fail(function () {
            Toast('网络异常!');
        })
    }
    // 添加note
    function add($ct) {
        new Note($ct);
    }
    return {
        load: load,
        add: add
    }
})();

module.exports.NoteManager = NoteManager;