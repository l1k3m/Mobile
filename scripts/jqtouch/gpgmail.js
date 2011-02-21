            var jQT = new $.jQTouch({
                icon: 'images/gpgmail_icon.png',
                addGlossToIcon: true,
                startupScreen: 'images/gpgmail_startup.png',
                statusBar: 'black'
            });
            // Some sample Javascript functions:
            $(function(){
                fixCopyPaste($('#text'));
                fixCopyPaste($('#text2'));

                // Show a swipe event on swipe test
                $('#swipeme').swipe(function(evt, data) {
                    $(this).html('You swiped <strong>' + data.direction + '</strong>!');
                });
                $('a[target="_blank"]').click(function() {
                    if (confirm('This link opens in a new window.')) {
                        return true;
                    } else {
                        $(this).removeClass('active');
                        return false;
                    }
                });
                // Page animation callback events
                $('#pageevents').
                    bind('pageAnimationStart', function(e, info){
                        $(this).find('.info').append('Started animating ' + info.direction + '&hellip; ');
                    }).
                    bind('pageAnimationEnd', function(e, info){
                        $(this).find('.info').append(' finished animating ' + info.direction + '.<br /><br />');
                    });
                // Page animations end with AJAX callback event, example 1 (load remote HTML only first time)
                $('#callback').bind('pageAnimationEnd', function(e, info){
                    if (!$(this).data('loaded')) {                      // Make sure the data hasn't already been loaded (we'll set 'loaded' to true a couple lines further down)
                        $(this).append($('<div>Loading</div>').         // Append a placeholder in case the remote HTML takes its sweet time making it back
                            load('ajax.html .info', function() {        // Overwrite the "Loading" placeholder text with the remote HTML
                                $(this).parent().data('loaded', true);  // Set the 'loaded' var to true so we know not to re-load the HTML next time the #callback div animation ends
                            }));
                    }
                });
                // Orientation callback event
                $('body').bind('turn', function(e, data){
                    $('#orient').html('Orientation: ' + data.orientation);
                });
            });


/* Option: default sign --------------------------------------------------- */
$(function() {
                $('input[name="defaultSign"]').bind('click',function() {
                        if($(this).is(':checked')) {
                            dbSetDefaultSign(1);
                        } else  {
                            dbSetDefaultSign(0);
                        }
                });
});
//todo: invoke and use dbIsDefaultSign() here.
/* ------------------------------------------------------------------------ */

 function fixCopyPaste(el) {
        el.bind('paste', function(e) {
            var element = $(this).context;

            var text = $(this).val();
            var start = element.selectionStart;
            var pastedText = e.originalEvent.clipboardData.getData('text/plain');
            $(this).val(text.substring(0, element.selectionStart)
                +pastedText
                +text.substring(element.selectionEnd, text.length));
            element.selectionStart = start+pastedText.length;
            element.selectionEnd = element.selectionStart;
        });
    }


