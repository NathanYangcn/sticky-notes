var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize('', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});

// 测试链接情况专用
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

// 定义数据库表结构 {id:1, text:hello, time:create, time: }
var Note = sequelize.define('note', {
	text: {
		type: Sequelize.STRING
	},
	uid: {
		type: Sequelize.STRING
	}
	// author: {
	// 	type: Sequelize.STRING
	// }
});

// 同步写法，但因为异步的存在，所以不起作用，需要改变写法
// // 看数据库是否存在，如果没有就创建
// Note.sync({force: true});
// // 创建一条数据
// Note.create({text: 'hello world'})
// // 查找一条数据
// Note.findAll().then(function(notes){
// 	console.log(notes);
// })

// 已经建立了表结构，所以此时可以注销掉
// Note.sync().then(function(){
// 	Note.create({text: 'hello world'})
// }).then(function(){
// 	Note.findAll({raw: true}).then(function(notes){
// 		console.log(notes)
// 	})
// });
// // 查找一条数据-查找条件
// Note.findAll({raw: true,where:{id:2}}).then(function(notes){
// 	console.log(notes)
// })

module.exports.Note = Note;