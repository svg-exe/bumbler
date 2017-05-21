// check and or set password

const bcrypt = require('bcryptjs')
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const SALT_SIZE = 10;

// load login hash
var LOGIN_HASH = _.trim(process.env.bumblrhash);
if (!LOGIN_HASH){
  try{
     LOGIN_HASH = _.trim(fs.readFileSync(path.join(process.cwd(),'./.bumblrhash'),'utf8'))
  }catch(e){
    LOGIN_HASH = false;
  }
}

exports.genHash = function genHash(password,callback){
  bcrypt.genSalt(SALT_SIZE, function(err, salt) {
    if (err){return callback(err)}
    bcrypt.hash(password, salt, callback);
  });
}


exports.check = function check(password,done){
  console.log(password);
  console.log(LOGIN_HASH);
  if (!LOGIN_HASH){
    throw new Error('login hash not defined')
  }
  return bcrypt.compare(password,LOGIN_HASH,done);
}