$(document).on( "pagebeforechange", function( e, data ) {
  if ( typeof data.toPage === "string" ) {
    var u = $.mobile.path.parseUrl( data.toPage ),
        re = /^#single/;
    if ( u.hash.search(re) !== -1 ) {
    	$('#profileDiv').empty();
    	showCast( u, data.options );
		e.preventDefault();
    }
  }
});

function showCast( urlObj, options ){
	var castName = urlObj.hash.replace( /.*cast=/, "" ),
	pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
	var $page = $( pageSelector );
	var $header = $page.children( ":jqmData(role=header)" );
	$(".loading").html("<img src='images/loader.gif'>");
	$.ajax({
		url: 'http://www.dancealive.tv/dictionary/'+ castName +'?temptype=jpfinal15-ajax',
		type: 'GET', 
		dataType: 'html',
		success: function(data) {
			$('#displaynone').html(data);
		},
		complete: function() {
			$content = $('#profWrap', $('#displaynone'));
			$('#profileDiv').html($content.html());
			$(".loading").empty();
		}
	});
	
	$page.page();
	$.mobile.changePage( $page, options );
};