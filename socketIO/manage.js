/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

module.exports = {

    setSocketInstance: function (IO) {
        require("./socket")(IO);
    }
};