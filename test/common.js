var assert = require('assert');

/**
 * 
 * @param {*} bot 
 * @param {*} messages 
 * @param {*} done 
 */
async function testBot(bot, connector, messages, done) {
  var response = true;
  console.log("**************** TEST BOT");

  /**
   * Inicio de la conversacion del bot 
   */
  var step = 0;

  messages.forEach(m => {
    console.log(JSON.stringify(m));
    connector.processMessage(m.in);
    
  });
  console.log("ASSERT: " + response);
  assert(response);



  /**
   * Evento gatillado al enviarse el primer mensaje
   */
  bot.on('send', function (message) {
    console.log("send");
    var check = messages[step];
    console.log(JSON.stringify(check));

    if(!check){
      done();
    }

    if (check.out) {
      console.log(message.text + " == " + check.out);
      if (message.text != check.out) {
        console.log();
        response = false;
      }
    }
    step++;

  });

}

/**
 * 
 */
module.exports = {
  testBot
};