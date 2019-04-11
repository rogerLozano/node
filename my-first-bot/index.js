var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
});

// Chat conector é responsável pela comunicação com o bot framework Connector Service
// Serviço que gerencia a conexão com mútiplos canais suportados (Skype, Menseger, etc)  
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Criação de um end point startando o conector 
server.post('/api/messages', connector.listen())

// Criação de um UniversalBot passando o chatConnector como parâmetros 
// Uma função função anônima para tratar todas as mensagens recebidas pelo bot
// Representando o Dialog raiz 
// O UniversalBot é o main(cérebro) do chat bot é responsável por gerenciar toda convsersa e a iteração com o usuário

var bot = new builder.UniversalBot(connector, function (session) {

    bot.dialog("askName", [
        function (session) {
            setTimeout(function (){
                session.send("Olá meu nome é Jupter!")
                builder.Prompts.text(session, "Qual o seu nome?")
            },2000)
        },

        function (session, results) {
            session.userData.name = results.response;
           
            setTimeout(function(){
                session.send("Então %s, em que posso te ajudar ?", session.userData.name);
                builder.Prompts.text(session, "Algum assunto que deseja saber mais? ")
            },2000)
        },
        function(session,results){
            session.userData.name = results.response;
            
            setTimeout(function(){     
               session.send("O que ao certo vc gostaria de saber sobre %s ? ",session.userData.name); 
               builder.Prompts.text(session,"Deseja um site ou fórum na NET?")
            },2000)
        },
        function(session,results){
            session.userData.name = results.response;
            
            setTimeout(function(){
                session.send("Minha melhor recomendação é o site da GOOGLE"); 
                session.send("Segue abaixo o link"); 
                session.send("www.google.com"); 
            })
        }       
    ]);
        
     bot.dialog("teste",[
        function (session){
            session.send("It seems!"); 
            builder.Prompts.text(session, "So what your name ?"); 
        }, 

        function(session,result){
            session.userData.name = resulst.response; 
            session.send("Olá mundo!"); 
        }
     ]   
     )
         session.beginDialog("askName");
    })

// A comunicação entre os os usuários e o bot é feita através de mensagens
// que são representadas pela classe Message, que representa a estrutura da mensagem 
// O objeto session é o responsável pela troca de mensagens entre o usuário e o bot, possuindo métodos para envio e recepão de mensagens 