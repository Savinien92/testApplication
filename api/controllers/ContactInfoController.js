/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	save:function(req, res){

		//YOUR CODE GOES HERE
		ContactInfo.create(req.allParams(), function (err, contact){
			if (err) {
				res.json(err)
			}
			res.json(contact)
		})
	}
	
};

