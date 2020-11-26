const {
    Schema
} = require('mongoose')
const mongoose = require('mongoose');

const {
    getCurrentTenantId,
} = require('./storage')

/**
Function will return another function, which will further return a mongoose discriminator.
The only difference here is that everytime you use the mongoose model, you will have to call a function,
but it will give you a freedom of passing tenant-based data. 
*/
exports.tenantModel = function (name, schema, options) {
    return (props = {}) => {
        // add new props to the schema
        schema.add({
            tenantId: String
        })

        // create a mongoose model
        const Model = mongoose.model(name, schema, options)

        const {
            skipTenant
        } = props
        // getCurrentTenantId() is a function will returns current tenant
        // this function uses continuation-local-storage npm package

        const tenantId = getCurrentTenantId()

        console.log(tenantId);

        // if no tenant or you want to skip tenant specific descrimintor, return actual model
        if (!tenantId || skipTenant) return Model

        // set the descriminatorKey for the model
        Model.schema.set('discriminatorKey', 'tenantId')

        // set the descriminator name
        const discriminatorName = name + '-' + tenantId

        // check if a descriminator already exists
        const existingDiscriminator = (Model.discriminators || {})[discriminatorName]

        // if it does exist, simply return that. Otherwise create new
        return existingDiscriminator || Model.discriminator(discriminatorName, new Schema({}), `${tenantId}`)
    }
}

// this function will return simple model,
// so that you write the consistent code like calling the Model function to access the model
exports.tenantlessModel = function (name, schema, options) {
    return () => mongoose.model(name, schema, options)
}