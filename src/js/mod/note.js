require('css/note.css');

var EventCenter = require('mod/eventCenter.js').EventCenter;
var Toast = require('mod/toast.js').Toast;

function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.setStyle();
    this.bindEvent();
}

Note.prototype = {
    // 颜色池
    colorPool: [
        ['#ea9b35','#efb04e'],
        ['#dd598b','#e672a2'],
        ['#eee34b','#f2eb67']
    ],
    // 默认参数
    defaultOpts: {
        id: '',
        $ct: $('#content').length>0 ? $('#content') : $('body'),
        context: '请输入...'
    },
    // 合并参数
    initOpts: function (opts) {
        this.opts = $.extend({}, this.defaultOpts, opts||{});
        if(this.opts.id){
            this.id = this.opts.id;
        }
    },

    createNote: function () {
        var self = this;
        var tpl = ''
            + '<div class="note">'
            +   '<div class="note-head">'
            +       '<span class="iconfont icon-clip"></span>'
            +       '<span class="delete iconfont icon-delete"></span>'
            +   '</div>'
            +   '<div class="note-body" contenteditable="true"></div>'
            + '</div>';
        this.$note = $(tpl);
        this.$note.find('.note-body').html(this.opts.context);
        this.opts.$ct.append(this.$note);
        if(!this.id) {
            this.$note.css({
                'left': self.opts.$ct.width()/2 - $('.note').outerWidth(true)/2,
                'top': -30
            })
        }  //新增放到右边,此处不可以使用bottom，否则会排版错乱，具体原因不详，待排查
        EventCenter.fire('waterfall');
    },

    setStyle: function () {
        var color = this.colorPool[Math.floor(Math.random()*3)];
        this.$note.find('.note-head').css('background-color', color[0]);
        this.$note.find('.note-body').css('background-color', color[1]);
    },

    bindEvent: function () {
        var self = this,
            $note = this.$note,
            $noteHead = $note.find('.note-head'),
            $noteBody = $note.find('.note-body'),
            $noteDelete = $note.find('.delete');

        // 保存逻辑：模拟判断内容是否相等或者为空，从而判定是否保存内容-contenteditable属性不会自动判断
        $noteBody.on('focus', function() {
            $noteBody.data('before', $noteBody.html());
            if($noteBody.html() == '请输入...') $noteBody.html('');
        });
        $noteBody.on('blur', function() {
            if( $noteBody.html() == '' ) $noteBody.html('请输入...');
            if( $noteBody.data('before') != $noteBody.html() ) {
                $noteBody.data('before', $noteBody.html());
                if(self.id){
                    self.edit($noteBody.html());
                }else{
                    self.add($noteBody.html());
                }
                EventCenter.fire('waterfall');
            }else {
                if(!self.id){
                    self.$note.remove();
                    Toast('内容为空');       
                }
                EventCenter.fire('waterfall');
            };
        });
        $noteDelete.on('click', function(){
            self.delete();
        })
    },

    edit: function (msg) {
        $.ajax({
            url: '/api/notes/edit',
            type: 'post',
            data: {
                id: this.id,
                note: msg
            }
        }).done(function (ret) {
            if(ret.status === 0){
                Toast('修改成功！');
            }else {
                Toast(ret.errorMsg);
            }
        }).fail(function () {
            Toast('网络异常！请稍后再试。');
        })
    },
    // 本身可被添加，但由管理器控制是否添加
    add: function (msg) {
        var self = this;
        $.ajax({
            url: '/api/notes/add',
            type: 'post',
            data: {
                note: msg
            }
        }).done(function (ret) {
            if(ret.status === 0){
                Toast('添加成功！');
            }else {
                self.$note.remove();
                EventCenter.fire('waterfall');
                Toast(ret.errorMsg);
            }
        }).fail(function () {
            Toast('网络异常！请稍后再试。');
        })
    },
    delete: function () {
        var self = this;
        $.ajax({
            url: '/api/notes/delete',
            type: 'post',
            data: {
                id: this.id
            }
        }).done(function (ret) {
            if(ret.status === 0){
                self.$note.remove();
                EventCenter.fire('waterfall');
                Toast('删除成功！');
            }else {
                Toast(ret.errorMsg);
            }
        }).fail(function () {
            Toast('网络异常！请稍后再试。');
        })
    }
};

module.exports.Note = Note;