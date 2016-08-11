'use strict';

const habbitService = require('../services/habbitService');
const catService = require('../services/categoryService');
const userService = require('../services/userService');

function initServices(uid) {
    catService.initCats(uid);
    habbitService.initHabbits(uid);
    userService.initUser(uid);
}

module.exports = {
    initServices
}
