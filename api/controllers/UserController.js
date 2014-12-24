module.exports = {
  chat: function(req, res) {
    res.render('chatpage');
  },
  index: function(req, res) {
    UserPoint.find(function foundUsers(err, users) {
      return res.json(users);
    });
  },
  remove: function(req, res) {
    var id = req.param('id');
    if(!id) {
      return res.json("Nie podano id do usunięcia");
    }
    UserPoint.destroy({id : id}).exec(function(err, users) {
      return res.json("Usunięto id: " + id);
    });
  },
  removeUser: function(req, res) {
    var username = req.param('username');
    if(!username) {
      return res.json("Nie podano username do usunięcia");
    }
    UserPoint.destroy({username : username}).exec(function(err, users) {
      return res.json("Usunięto username: " + username);
    });
  },
  create: function (req, res, next) {
    var user_to_create = req.params.all();
    var lat = req.param('lat');
    var lon = req.param('lon');
    var username = req.param('username');

    console.log(lat);
    console.log(lon);
    if(!lat || !lon || !username) {
      return res.json("Brak latitude, longitude lub username, nie dodano elementu");
    }

    UserPoint.create(user_to_create, function(err, created_user) {
        if (err) return next(err);
        res.json(created_user);
    });
  },
  filter: function(req, res) {
    var dateAfter;
    var dateBefore;
    var username;

    if(req.param('dateAfter')) {
      dateAfter = new Date(req.param('dateAfter'));
    } else {
      dateAfter = new Date('1970-01-01T00:00:00')
    }

    if(req.param('dateBefore')) {
      dateBefore = new Date(req.param('dateBefore'));
    } else {
      dateBefore = new Date('2070-01-01T00:00:00')
    }

    var hasUsername = true;
    if(req.param('username')) {
      username = req.param('username');
    } else {
      hasUsername = false;
    }

    if (hasUsername) {
      UserPoint.find()
        .where({
          and: [
            {createdAt: {'<=': dateBefore, '>=': dateAfter}},
            {username: username}
          ]
        })
        .exec(function (err, users) {
          var parsedUsers = [];
          users.forEach(function (user) {
            if (!user.lat || !user.lon) {
              return;
            }
            var element = {};
            element['id'] = user.id;
            element['lat'] = user.lat;
            element['lon'] = user.lon;
            element['desc'] = user.desc ? user.desc : "";
            element['ts'] = user.ts ? user.ts : "";
            element['username'] = user.username ? user.username : "";
            parsedUsers.push(element);
          });
          return res.json(parsedUsers);
        });
    } else {
      UserPoint.find()
        .where({
          and:[
            {createdAt : { '<=' : dateBefore, '>=' : dateAfter }}
          ]
        })
        .exec(function(err, users) {
          var parsedUsers = [];
          users.forEach(function(user) {
            if(!user.lat || !user.lon) {
              return;
            }
            var element = {};
            element['id'] = user.id;
            element['lat'] = user.lat;
            element['lon'] = user.lon;
            element['desc'] = user.desc ? user.desc : "";
            element['ts'] = user.ts ? user.ts : "";
            element['username'] = user.username ? user.username : "";
            parsedUsers.push(element);
          });
          return res.json(parsedUsers);
        });
    }
  }
};

