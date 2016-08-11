'use strict';

// TODO: sort by cat value
function sortByCat(habbits) {
    if (Array.isArray(habbits)) {
        return habbits.sort( (a,b) => {
            if (a.category > b.category) {
                return 1;
            } else if (a.category < b.category) {
                return -1
            } else {
                if (a.last_completed > b.last_completed) {
                    return 1;
                } else if (a.last_completed < b.last_completed) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }
}

function sortCats(cats) {
    if (!Array.isArray(cats)) return [];
    return cats.sort( (a,b) => {
        if (a.index > b.index) {
            return 1;
        } else if (a.index < b.index) {
            return -1;
        } else {
            return 0;
        }
    });
}

module.exports = {
    sortByCat,
    sortCats
};
