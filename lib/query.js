//Database
module.exports = {
    upsert: async function(model, key, data) {
        options = { upsert: true };
        const result = await model.findOneAndUpdate(key, { $set: data }, options)
    }
}