require('css/reset.css');
require('css/index.css');

var NoteManager = require('mod/noteManager.js').NoteManager;
var EventCenter = require('mod/eventCenter.js').EventCenter;
var Note = require('mod/note.js').Note;
var WaterFall = require('mod/waterfall.js').WaterFall;
var GoTop = require('mod/goTop.js').GoTop;

NoteManager.load();

$('.add-note').on('click', function() {
    NoteManager.add({$ct: $('#content')});
});

EventCenter.on('waterfall', function(){
  WaterFall.render($('#content'));
});

GoTop();