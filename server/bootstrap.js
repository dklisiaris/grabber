// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  if(Folders.find({isDefault: true}).count() < 1){
    var creator = Roles.getUsersInRole('system').fetch()[0];
    if(creator){
      var commonFields = {isDefault: true, private: false, createdBy: creator._id}
      var defaultFolders = [
        Object.assign({name: "Sport", icon: "sport-c.png"}, commonFields),
        Object.assign({name: "News", icon:"news-c.png"}, commonFields),
        Object.assign({name: "Lifestyle", icon: "lifestyle.png"}, commonFields),
        Object.assign({name: "Finance & Business", icon: "finance.png"}, commonFields),
        Object.assign({name: "Market", icon: "market-c.png"}, commonFields),
        Object.assign({name: "Health", icon: "health.png"}, commonFields),
        Object.assign({name: "Fashion & Beauty", icon: "beauty-c.png"}, commonFields),
        Object.assign({name: "Food & Drink", icon: "food.png"}, commonFields),
        Object.assign({name: "Travel & Tourism", icon: "travel.png"}, commonFields),
        Object.assign({name: "Family & Kids", icon: "family.png"}, commonFields),
        Object.assign({name: "Education and Work", icon: "education-c.png"}, commonFields),
        Object.assign({name: "Internet & Computing", icon: "computing.png"}, commonFields),
        Object.assign({name: "Arts & Culture", icon: "arts-c.png"}, commonFields),
        Object.assign({name: "Energy and Environments", icon: "energy-c.png"}, commonFields),
        Object.assign({name: "Entertainment", icon: "entertainment.png"}, commonFields),
        Object.assign({name: "Weather", icon: "weather.png"}, commonFields),
        Object.assign({name: "Advertisements", icon: "ads-c.png"}, commonFields),
        Object.assign({name: "Useful", icon: "useful.png"}, commonFields),
        Object.assign({name: "Residence and Decoration", icon: "residence-c.png"}, commonFields),
        Object.assign({name: "Sciences & Research", icon: "science-c.png"}, commonFields),
        Object.assign({name: "Society and Human", icon: "society.png"}, commonFields),
        Object.assign({name: "Cars & Motorcycles", icon: "car.png"}, commonFields),
        Object.assign({name: "Communication & Advertising", icon: "communication.png"}, commonFields),
        Object.assign({name: "Politics and History", icon: "politics.png"}, commonFields),
        Object.assign({name: "Government & Administration", icon: "government.png"}, commonFields)
      ];
    }

    _.each(defaultFolders, function(folder){
      Folders.insert(folder);
    });

  }
});