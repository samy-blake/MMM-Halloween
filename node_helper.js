const NodeHelper = require("node_helper");
const Log = require("logger");

module.exports = NodeHelper.create({
  TempRoomsConfig: {},


  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "LOG":
        Log.log(this.name + ": " + payload);
        break;
    }
  },

});
