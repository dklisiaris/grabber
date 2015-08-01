Template.sidebar.helpers({
  folders: function () {
    return Folders.find({}, {sort: {views: -1}});
  }
});