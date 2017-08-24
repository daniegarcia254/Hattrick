// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(app) {
  var Role = app.models.Role;

  function createError(status, message, code) {
    var err = new Error(message);
    err.status = err.statusCode = status;
    err.name = code;
    err.description = message;
    return err;
  };

  function reject(cb) {
    process.nextTick(function() {
      cb(null, false);
    });
  };

  //Role -> Current user
  Role.registerResolver('currentUser', function(role, ctx, cb) {
    if (ctx.modelName !== 'user') return reject(cb);
    var userId = ctx.accessToken.userId;
    if (!userId) return reject(cb);
    console.log("CURRENT USER", userId, ctx.modelId);
    if (parseInt(userId) != parseInt(ctx.modelId)) return cb(createError(401,'Not current user','NOT_CURRENT_USER'));
    else return cb(null,true);
  });

  //Role -> Community admin
  Role.registerResolver('communityAdmin', function(role, ctx, cb) {

    if (ctx.modelName !== 'community') return reject(cb);

    var userId = ctx.accessToken.userId;
    if (!userId) return reject(cb);

    var Community = app.models.community;
    Community.findById(ctx.modelId, function(err, community){
      if (err) return cb(err);
      else if (!community) return cb(createError(404,'Community not found','COMMUNITY_NOT_FOUND'));
      else if (parseInt(community.adminID) !== parseInt(userId)) return cb(createError(401,'User is not the community admin','USER_NOT_COMMUNITY_ADMIN'));
      else return cb(null, true);
    });
  });

  //Role -> Community member
  Role.registerResolver('communityMember', function(role, ctx, cb) {

    if (ctx.modelName !== 'community') return reject(cb);

    var userId = ctx.accessToken.userId;
    if (!userId) return reject(cb);

    var Community = app.models.community;
    Community.findById(ctx.modelId, function(err, community){
      if (err) return cb(err);
      if (!community) return cb(createError(404,'Community not found','COMMUNITY_NOT_FOUND'));
      community.users({where:{ id: userId } }, function(err, user) {
        if (err) return cb(err);
        else if (!user || user.length===0) return cb(createError(401,'User doesn\'t belong to community','USER_DOES_NOT_BELONG_TO_COMMUNITY'));
        else return cb(null, true);
      });
    });
  });
};
