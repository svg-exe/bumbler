/*
take a post and hydrate it

*/


module.exports = function(j){

  j.permalink = '/post/'+j.id+'.html';

  // create widgets for assets
  j.assets.forEach(asset=>{
    var type = asset.type;
    if (type == 'image'){
      asset.widget = `<img src="${asset.href}"></img>`
    }else if (type == 'audio'){
      asset.widget = `<audio controls src="${asset.href}"></audio>`
    }else if (type = "video"){
      asset.widget = `<video controls src="${asset.href}"></video>`
    }else{
      asset.widget = `Link to attachment: <a href="${asset.href}">${asset.href}</a>`
    }
  });

  j.englishDate = isoDateToEnglish(j.date);

  return j;

}

function isoDateToEnglish(d){
  var d = d;
  if (typeof d != 'string'){
    d = d.toISOString();
  }

  var dt = d.split(/[t\-]/ig);
  var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  return months[Number(dt[1])-1] +' '+dt[2]+ ', '+dt[0];
}