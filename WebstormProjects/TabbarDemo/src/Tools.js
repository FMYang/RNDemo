import {Dimensions} from "react-native";

/**
 * Created by yangfangming On 2018/5/28
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

Array.prototype.indexOf = function(val) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if(index > -1) {
        this.splice(index, 1);
    }
};

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height