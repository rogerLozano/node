#API NODE.JS 
// * 
var express = require('express') 
var app = express() 

app.listen('3000',()=>{
	console.log('Servidor rodando porta 3000'); 		
}) 

// Conexao com  Banco de dados // 
 const Sequelize  = require('sequelize') 
 const sequelize = new Sequelize('test','','root','123456',{
 	host: 'localhost', 
 	dialect: 'mysql'
 }) 

 sequelize.authenticate()
 	.then(function(){
 		console.log('Conectado com sucesso')
 	}).catch(function(err){
 		console.log('Falha ao conectar: ' + err)
 	}) 

// ** CREATE TABLE	

const Postagem = sequelize.define('postagens',{
	titulo:{
		type: Sequelize.STRING
	}, 
	conteudo: {
		type: Sequelize.TEXT
	}
})

Postagem.create({
	titulo:'Pipipipopopo', 
	conteudo:'hahahahaha'		
})

const Usuario = sequelize.create 


Postagem.sync({
	force:true 
})

