var db = require('./models');

// db.author.findOrCreate({where: {name: "Brian"}}).spread(function(author, created) {
//   author.createPost({title: "A new post", body: "Some text"}).then(function(post) {
//     console.log(post.get());
//   })
// });

// db.tag.create({name:"sechsay"}).then(function(tag){
//   console.log(tag.get());
// })

db.post.findById(1).then(function(post){
  db.tag.findOrCreate({where:{name: "fartsy"}}).spread(function(tag, created){
    post.addTag(tag).then(function(){
      console.log("a post titled "+ post.title+" now has a tag of " + tag.name)
    });
  });
});

