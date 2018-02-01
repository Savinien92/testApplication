/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	save: function (req, res) {

		//YOUR CODE GOES HERE
		ContactInfo.create(req.allParams()).exec(function (err, record){
			if (err) {
				res.json(err)
			}
			res.json(record)
		})
	},

	get: function (req, res) {
		ContactInfo.find().exec(function (err, records) {
			res.json(records)
		})
	},

	delete: function (req, res) {
		var param = { id: req.param('id')}

		ContactInfo.destroy(param).exec(function (err){
			if (err) {
				res.json(err)
			}
			res.json(true)
		})
	}
	
};

