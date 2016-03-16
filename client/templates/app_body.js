var EDITING_KEY = 'editingFolder';
Session.setDefault(EDITING_KEY, false);

var SELECTED_BOOKMARK_KEY = 'selectedBoomark';
Session.setDefault(SELECTED_BOOKMARK_KEY, null);

Template.appBody.helpers({
  folders: function () {
    return Folders.find({}, {sort: {createdAt: -1}});
  },
  // currentFolder: function () {    
  //   folderId =  Router.current().params.query.f;
  //   return folderId === undefined ? null : Folders.findOne({_id: folderId});
  // },
  editing: function() {
    return Session.get(EDITING_KEY);
  },
  bookmarksReady: function() {
    return Router.current().bookmarksHandle.ready();
  },

  bookmarks: function(folderId) {
    return Bookmarks.find({folderId: folderId}, {sort: {createdAt : -1}});
  },

  selectedBookmark: function() {    
    if(Session.get(SELECTED_BOOKMARK_KEY) !== null){
      return Bookmarks.findOne({_id: Session.get(SELECTED_BOOKMARK_KEY)});
    }
  },

});

var editFolder = function(folder, template) {
  Session.set(EDITING_KEY, true);
  
  // force the template to redraw based on the reactive change
  Tracker.flush();
  template.$('.js-edit-form input[type=text]').focus();
};

var saveFolder = function(folder, template) {
  Session.set(EDITING_KEY, false);  
  Meteor.call("renameFolder", folder._id, template.$('[name=name]').val());
};

var deleteFolder = function(folder) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to delete folders.");
  }

  if (folder.createdBy !== Meteor.userId()) {
    return alert("You can delete only your own folders.");
  }

  if (Folders.find({createdBy: Meteor.userId()}).count() === 1) {
    return alert("Sorry, you cannot delete the final folder!");
  }

  var message = "Are you sure you want to delete the folder " + folder.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    Bookmarks.find({folderId: folder._id}).forEach(function(bookmark) {      
      Meteor.call("removeBookmark", bookmark._id);
    });    
    Meteor.call("removeFolder", folder._id);

    
    Meteor.setTimeout(function(){ Router.go('home'); }, 10);
    return true;
  } else {
    return false;
  }
};

var toggleFolderPrivacy = function(folder) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to make private folders.");
  }
  if (folder.createdBy === Meteor.userId()) {    
    Meteor.call("setPrivacy", folder._id, !folder.private);
  }
};

Template.appBody.events({
  "submit .new-bookmark": function (event) {
    // This function is called when the new task form is submitted
    var url = event.target.bookmark.value;
    var currentFolder = Router.current().params._id;

    Meteor.call("addBookmark", url, currentFolder, function(err, bookmarkId) {      
      Meteor.call("refreshBookmark", bookmarkId);
    });
    
    // Clear form
    event.target.bookmark.value = "";

    // Prevent default form submit
    return false;
  },

  "submit #update-bookmark-form": function (event, template) {
    var data = {      
      title: event.target.title.value,
      url: event.target.url.value,
      image: event.target.image.value,
      folderId: event.target.folder.value
    };
    
    var bookmarkId = Session.get(SELECTED_BOOKMARK_KEY);
    
    Meteor.call("updateBookmark", bookmarkId, data);

    new freewall('#grid').fitWidth();
    $('.chat-collapse').sideNav('hide'); 

    return false;
  },

  "click .new-folder": function (event) {
    if(Meteor.userId()){
      Meteor.call("addFolder", Folders.defaultName(), 'Description', true, function(err, folderId) {      
        Meteor.setTimeout(function(){ Router.go('/folders/' + folderId); }, 10);      
      });      
    } else {
      Meteor.setTimeout(function(){ Router.go('/signin'); }, 10);
    }
    
  },

  'click .js-cancel': function() {
    Session.set(EDITING_KEY, false);
  },

  'click .js-toggle-privacy': function() {
    toggleFolderPrivacy(this);
  },

  'blur input[type=text]': function(event, template) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (Session.get(EDITING_KEY))
      saveFolder(this, template);
  },

  'submit .js-edit-form': function(event, template) {
    event.preventDefault();
    saveFolder(this, template);
  },
  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel': function(event) {
    event.preventDefault();
    Session.set(EDITING_KEY, false);
  },

  'change .folder-edit': function(event, template) {
    if ($(event.target).val() === 'edit') {
      editFolder(this, template);
    }
    event.target.selectedIndex = 0;
  },
  
  'click .js-edit-folder': function(event, template) {
    editFolder(this, template);
  }, 

  'click .js-delete-folder': function(event, template) {
    deleteFolder(this, template);    
  } 
});

Template.appBody.onRendered(function () {  
  var window_width = $(window).width();

  /*Preloader*/
  $(window).load(function() {
    setTimeout(function() {
      $('body').addClass('loaded');      
    }, 200);
  });  
  
  $('.show-search').click(function() {
    $('.search-out').fadeToggle( "50", "linear" );
  });

  // Check first if any of the task is checked
  $('#task-card input:checkbox').each(function() {
    checkbox_check(this);
  });

  // Task check box
  $('#task-card input:checkbox').change(function() {
    checkbox_check(this);
  });

  // Check Uncheck function
  function checkbox_check(el){
      if (!$(el).is(':checked')) {
          $(el).next().css('text-decoration', 'none'); // or addClass            
      } else {
          $(el).next().css('text-decoration', 'line-through'); //or addClass
      }    
  }

  /*----------------------
  * Plugin initialization
  ------------------------*/

  // Materialize Slider
  $('.slider').slider({
    full_width: true
  });

  // Materialize Dropdown
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 125,
    constrain_width: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on click
    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });

  // Materialize Tabs
  $('.tab-demo').show().tabs();
  $('.tab-demo-active').show().tabs();

  // Materialize Parallax
  $('.parallax').parallax();
  $('.modal-trigger').leanModal();

  // Materialize scrollSpy
  $('.scrollspy').scrollSpy();

  // Materialize tooltip
  $('.tooltipped').tooltip({
    delay: 50
  });

  // Materialize sideNav  

  //Main Left Sidebar Menu
  $('.button-collapse').sideNav({
    edge: 'left', // Choose the horizontal origin      
  });
  
  //Main Left Sidebar Chat
  $('.chat-collapse').sideNav({
    menuWidth: 360,
    edge: 'right',
  });
  $('.chat-close-collapse').click(function() {
    $('.chat-collapse').sideNav('hide');
  });
  $('.chat-collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  // Pikadate datepicker
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  // Perfect Scrollbar
  $('select').not('.disabled').material_select();
    var leftnav = $(".page-topbar").height();  
    var leftnavHeight = window.innerHeight - leftnav;
  $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
    suppressScrollX: true
  });
    var righttnav = $("#chat-out").height();
  $('.rightside-navigation').height(righttnav).perfectScrollbar({
    suppressScrollX: true
  });

  // Fullscreen
  function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
    else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  $('.toggle-fullscreen').click(function() {
    toggleFullScreen();
  });

  // Toggle Flow Text
  var toggleFlowTextButton = $('#flow-toggle')
  toggleFlowTextButton.click(function() {
    $('#flow-text-demo').children('p').each(function() {
      $(this).toggleClass('flow-text');
    })
  });
  
  
  //Toggle Containers on page
  var toggleContainersButton = $('#container-toggle-button');
  toggleContainersButton.click(function() {
    $('body .browser-window .container, .had-container').each(function() {
      $(this).toggleClass('had-container');
      $(this).toggleClass('container');
      if ($(this).hasClass('container')) {
        toggleContainersButton.text("Turn off Containers");
      }
      else {
        toggleContainersButton.text("Turn on Containers");
      }
    });
  });

  // Detect touch screen and enable scrollbar if necessary
  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    }
    catch (e) {
      return false;
    }
  }
  if (is_touch_device()) {
    $('#nav-mobile').css({
      overflow: 'auto'
    });
    $('.hidden').css('visibility','visible').css({opacity:1});
  }
});