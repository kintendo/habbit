const habbitService = require('../resources/habbitService');
const catService = require('../resources/categoryService');
const userService = require('../resources/userService');

function initServices(uid) {
    catService.initCats(uid);
    habbitService.initHabbits(uid);
    userService.initUser(uid);
}

module.exports = {
    initServices
}
