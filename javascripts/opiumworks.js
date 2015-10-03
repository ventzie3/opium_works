(function($) {
  $( document ).ready(function() {
    $( "div.date-pickers div.form-item-date-holder-from input" ).datepicker({
      dateFormat: "dd/mm/yy"
    }).datepicker('setDate', parseDate('from'));   
    $( "div.date-pickers div.form-item-date-holder-to input" ).datepicker({
      dateFormat: "dd/mm/yy"
    }).datepicker('setDate', parseDate('to'));
    
    $( "#opium-works-form input[type='submit']" ).click(function(event) {
      var buttonClicked = $(this).attr('name');
      
      if(buttonClicked == 'xml-button') {
        $(this).blur();
        
        var link = $('#ow-xml-link');
            from = transformDate($("div.date-pickers div.form-item-date-holder-from input").val()),
              to = transformDate($("div.date-pickers div.form-item-date-holder-to input").val()),
            href = link.attr('href');
        
        link.attr('href', href + '&from=' + from + '&to=' + to);
        link[0].click();
        link.attr('href', href);
        
        event.preventDefault();
      }
      else {
        $( "div.date-pickers div.form-type-date-holder input" ).each(function( index ) {
          var name = $(this).attr('name');
          
          if (buttonClicked == 'date-submit') {
            $("#opium-works-form div.hidden-inputs input[name='" + name + "']").val(transformDate($(this).val()));
          } else if (buttonClicked == 'date-reset') {
            $(this).val('');
            $("#opium-works-form div.hidden-inputs input[name='" + name + "']").val('');
          }
        });
      }
    });
  });
  
  function transformDate(dateStr) {
    var mtch, date;
    dateStr && (mtch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/)) && (date = new Date(parseInt(mtch[3]), parseInt(mtch[2]) - 1, parseInt(mtch[1])));
    
    return typeof date != 'undefined' && isValidDate(date) ? mtch[1] + mtch[2] + mtch[3] : '';
  }
  
  function parseDate(name) {
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(document.location.search);

    var date = results === null ? "" : results[1];
    date && (date = date.match(/(\d{2})(\d{2})(\d{4})/)) && (date = new Date(parseInt(date[3]), parseInt(date[2]) - 1, parseInt(date[1])));
    
    return date && isValidDate(date) ? date : null;
  }
  
  function isValidDate(d) {
    if ( Object.prototype.toString.call(d) !== "[object Date]" )
      return false;
    return !isNaN(d.getTime());
  }
})(jQuery);