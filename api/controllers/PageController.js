/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	home: function (req, res) {

 		return res.view('landingpage');

 	},
	admin: function (req, res) {

 		return res.view('adminpage');

	}

 }