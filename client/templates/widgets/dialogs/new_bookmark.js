Template.newBookmark.events({
  "click .js-add-new-bookmark": function() {
    swal({
      title: "Add new Bookmark",
      text: null,
      type: "input",
      showCancelButton: true,
      confirmButtonColor: "#03a9f4",
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Write/Paste a url"
    }, function(inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("Url cant be blank");
        return false
      }
      var url = inputValue;
      var currentFolder = Router.current().params._id;

      Meteor.call("addBookmark", url, currentFolder, function(err, bookmarkId) {      
        Meteor.call("refreshBookmark", bookmarkId);
      });

    });
  }
});