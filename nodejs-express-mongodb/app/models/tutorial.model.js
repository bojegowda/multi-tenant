const {
    tenantModel,
    tenantlessModel
} = require('../lib/multiTenant');
const mongoose = require('mongoose');

// module.exports = mongoose => {
//     const Tutorial = tenantlessModel(
//         "tutorial",
//         mongoose.Schema({
//             title: String,
//             description: String,
//             published: Boolean
//         }, {
//             timestamps: true
//         })
//     );

//     return Tutorial;
// };

const Tutorial = new mongoose.Schema({
    title: String,
    description: String,
    published: Boolean
}, {
    timestamps: true
});

module.exports = tenantModel('tutorial', Tutorial);