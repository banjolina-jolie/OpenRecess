var __ = require('underscore');

exports.sendSMS = function(req, res) {
  var accountSid = "";
  var authToken = "";
  var client = require('twilio')(accountSid, authToken);

  var messageContent = "I hate you";
  var toSMS = "+15133074346";
  var fromSMS = "+14159928245";

  client.sms.messages.create({
      body: messageContent,
      to: toSMS,
      from: fromSMS
  }, function(err, message) {
      if (err) {
        console.log('error');
      }
      console.log('Sending SMS to: ' + message.from);
      console.log('Message content: ' + message.body);
      console.log('Status of text message is: ' + message.status);
  });
};

exports.retrieveSMS = function(req, res) {
  console.log('retrieving SMS');
  var accountSid = "";
  var authToken = "";
  var client = require('twilio')(accountSid, authToken);
  var allSms;
  client.sms.messages.list(function(err, data) {
    allSms = getSmsContent(data.sms_messages);
  });
};

// Packages msg content into [{dialedTo, sid, msgContent(body), date, direction}]
var getSmsContent = function(data) {
  var messageInfo = [];
  __.each(data, function(item) {
    messageData = {
      phone: item.from,
      sid : item.sid,
      body: item.body,
      date: item.date_created,
      direction: item.direction
    };
    messageInfo.push(messageData);
  });
  console.log(messageInfo);
  return messageInfo;
};

// Combine and merge all texts from the same phone number.
var inboundNum = function(data) {
};