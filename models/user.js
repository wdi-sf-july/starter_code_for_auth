var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, DataTypes){
   var User = sequelize.define('user', {
     username: { 
        type: DataTypes.STRING, 
        unique: true, 
        validate: {
          len: [6, 30],
          }
    },
    password: {
        type:DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    
    {
      classMethods: {
        associate: function (db){
          User.hasMany(db.post);
        },
        encryptPassword: function (pswrd) {
          // Add a salt to obfuscate the raw pswrd
          var hash = bcrypt.hashSync(pswrd, salt);
          return hash;
        },
        comparePswrd: function (inputPswrd, dbPswrd){
          // Don't salt twice
          return bcrypt.compareSync(inputPswrd, dbPswrd);
        },
        createNewUser: function (newUser, err, success) {
          if (newUser.password.length < 6){
            err(new Error("PASSWORD TOO-SHORT"));
          } else {
            newUser.password = this.encryptPassword(newUser.password);
            User.create(newUser)
            .failure(function (error){
              console.error(error);

              if( error.username ) {
                err(new Error("We didn't want to say your username was too short, but yeah..."));
              } else {
                err(new Error("My reply is no... concentrate and ask again..."));
              }
            })
            .ok(function (user){
              success(user, {message: "Welcome!!"});
            })
          }
        },
        authorize: function(userParams, err, success) {
          User.find({
            where: {username: userParams.username}
          })
          .complete(function(error, user){
            var verified;
            console.log("YOUR ERRROR SIR", error)
            if (error || !user) {
              err(new Error("FAILED TO LOGIN"))
            } else {
              verified = User.comparePswrd(userParams.password, user.dataValues.password);
              if(verified) {
                success(user);
              } else {
                err(new Error("whhhat was that pswrd or username??"))
              }
            }
          })
        }
      }
    } //close classMethods outer 

  ); // close define user
  return User;
}; // close User function

