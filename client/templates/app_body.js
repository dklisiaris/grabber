var SELECTED_BOOKMARK_KEY = 'selectedBoomark';
Session.setDefault(SELECTED_BOOKMARK_KEY, null);

Template.appBody.helpers({
  bookmarks: function() {
    let folderId = FlowRouter.getParam('_id');
    return Bookmarks.find({folderId: folderId}, {sort: {createdAt : -1}});
  },

  selectedBookmark: function() {    
    if(Session.get(SELECTED_BOOKMARK_KEY) !== null){
      return Bookmarks.findOne({_id: Session.get(SELECTED_BOOKMARK_KEY)});
    }
  },

});

Template.appBody.events({
  "click .new-folder": function (event) {
    if(Meteor.userId()){
      Meteor.call("addFolder", Folders.defaultName(), null, true, function(err, folderId) {      
        Meteor.setTimeout(function(){ FlowRouter.go('/folders/' + folderId); }, 10);      
      });      
    } else {
      Meteor.setTimeout(function(){ FlowRouter.go('/signin'); }, 10);
    }
  },
  "submit .new-bookmark": function (event) {
    // This function is called when the new task form is submitted
    var url = event.target.bookmark.value;
    var currentFolder = FlowRouter.getParam('_id');

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

Template.appBody.onCreated(function() {
  var self = this;
  self.autorun(function() {
    if(FlowRouter.getRouteName() === 'folder'){
      self.subscribe('bookmarks', FlowRouter.getParam('_id'));
    } 
  });
});