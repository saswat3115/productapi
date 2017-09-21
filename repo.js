var db = require('diskdb');
db.connect('data', ['products']);


exports.findByCategory = function (category) {
    return db.products.find({
        "category": category.toLowerCase()
    });
};

exports.findByBrandAndCategory = function (brand, category) {
    return db.products.find({
        "brand":brand.toLowerCase(),
        "category": category.toLowerCase()
    });
};


