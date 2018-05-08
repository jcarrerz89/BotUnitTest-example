var assert = require('assert');
var jquery = require('jquery');
/**
 * 
 * @param {*} bot 
 * @param {*} messages 
 * @param {*} done 
 */
var step = 0;
var response = true;

function testBot(bot, connector, messages, done) {
  
  console.log("***TEST BOT***");

  function sendMessage(){
    connector.processMessage(messages[step].in);
  }

  bot.on('send',  function(message){
    var check = messages[step++];
    if (check.out) {
      console.log(message.text + " == " + check.out +":"+ (message.text==check.out));
      response = (message.text == check.out);
    }
    if (messages.length>step && response){
      sendMessage();
    }else{ 
      done();
    }
  });
  
  sendMessage();
  assert(response);
}


module.exports = {
  testBot
};