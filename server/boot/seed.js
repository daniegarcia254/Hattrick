var async = require('async');

module.exports = function (app) {
	console.info('Checking DB schema');
	console.info('==================');

	var models = app.models();
	models.forEach(function (Model) {
		var ds = Model.getDataSource();
		ds.isActual(Model.modelName, function (err, actual) {
			console.log('Checking ' + Model.modelName + '...');
			if (!actual) {
				console.log(Model.modelName+' DB structure is NOT UPDATED. Updating model:');
				ds.autoupdate(function(err,result){
					if (err) console.log('ERROR updating model '+Model.modelName, err);
					else console.log('Model '+Model.modelName+' UPDATED OK');
				});
			} else {
				console.log('Model '+ Model.modelName +' is UP TO DATE');
			}
		});
	});

	var Role = app.models.Role;
	var roles =["PLAYER","ADMIN"];
	console.log('creating roles...');
	async.eachSeries(roles, function (roleName, callback) {
		Role.findOrCreate({
			where: {
				name: roleName
			}
		}, {
			name: roleName
		}, callback);
	}, function (err) {
		console.log('Roles created');
	});
};
