var assert = require('assert');

/**
 * 
 * @param {*} bot 
 * @param {*} messages 
 * @param {*} done 
 */
function testBot(bot, connector, messages, done) {

  console.log("**************** TEST BOT");
  /**
   * Evento gatillado al enviarse el primer mensaje
   */
  bot.on('send', function (message) {
    console.log("send");
      
    if (step <= messages.length && step++ >= 1) {
      var check = messages[step - 2];
      
      checkInMessage(message, check, assert, (err) => {

        if (err) { 
          assert(false);
          done();
        }

        proceedNextStep(check, done);
      });
      
    } else {
      assert(false);
      setTimeout(done, 10); // Enable message from connector to appear in current test suite
    }
    done();
  });

  /**
   * 
   * @param {*} message 
   * @param {*} check 
   * @param {*} assert 
   * @param {*} callback 
   */
  function checkInMessage(message, check, assert, callback) {
    
    console.log("checkInMessage: " + JSON.stringify(message));
    console.log("check: " + JSON.stringify(check));

    /**
     * Valida typo de respuesta
     */
    if (check.type) {
      assert(message.type === check.type);
    }

    /**
     * Valida consistencia del mensaje
     */
    if (typeof check.in === 'function') {
      return check.in(message, assert, callback);
    } else {

      if (check.in) {
        if (check.in.test ? check.in.test(message.text) : message.text === check.in) {
          assert(true);
        } else {
          console.error('<%s> does not match <%s>', message.text, check.in);
          assert(false);
        }
      }
      return callback();
    }
  }

  /**
   * 
   * @param {*} check 
   * @param {*} done 
   */
  function proceedNextStep(check, done) {
    console.log("proceedNextStep");
    if (check.out) {
      connector.processMessage(check.out);
    }

    if (step - 1 == messages.length) {
      setTimeout(done, 10); // Enable message from connector to appear in current test suite
    }
  }

  /**
   * Inicio de la conversacion del bot 
   */
  var step = 1;
  if (messages.length && messages[0].out) {
    step = 2;
    connector.processMessage(messages[0].out);
  }
}

/**
 * 
 */
module.exports = {
  testBot
};