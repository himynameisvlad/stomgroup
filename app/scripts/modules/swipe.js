export default function() {

  var mc = new Hammer(document.getElementById('body'));

  mc.on("swipe", function(ev) {
    if (ev.direction === 4) {
      let $panelToClose = $('.is-visible.from-right');
      if ($panelToClose.length){
        $panelToClose.removeClass('is-visible')
      }
    }else if (ev.direction === 2) {
      let $panelToClose = $('.is-visible.from-left');
      if ($panelToClose.length){
        $panelToClose.removeClass('is-visible')
      }
    }
  });


  // $("body").swipe( {

  //   swipeRight:function(event, direction, distance, duration, fingerCount) {
  //     let $panelToClose = $('.is-visible.from-right');
  //     if ($panelToClose.length){
  //       $panelToClose.removeClass('is-visible')
  //     }

  //   },
  //   swipeLeft:function(event, direction, distance, duration, fingerCount) {
  //     let $panelToClose = $('.is-visible.from-left');
  //     if ($panelToClose.length){
  //       $panelToClose.removeClass('is-visible')
  //     }

  //   },

  //   threshold: 100
  // });

}