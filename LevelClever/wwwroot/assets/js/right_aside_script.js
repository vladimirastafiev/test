// listen for hammer overall document

var element = document.querySelector('.right-aside-container');

var swipe = new Hammer(element);
// detect swipe and call to a function
swipe.on('swiperight swipeleft', function(e) {
  e.preventDefault();
  if (e.type == 'swiperight') {
    // open right aside
    $(element).animate({
        width: '0%'
    });
    
  } else {
    // close left aside
    $(element).animate({
        width: '80%'
    });
  }

});