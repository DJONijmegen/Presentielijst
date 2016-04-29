'use strict'

var presentielijst = {};

const weekdagen = {
    lang: [ 'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ],
    kort: [ 'Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za' ]
}

let vandaag = new Date();

$( '#vandaag' ).html(
    weekdagen.lang[ vandaag.getDay() ] + ' ' +
    vandaag.getDate() + '-' +
    vandaag.getMonth() + '-' +
    vandaag.getFullYear()
);

let dagdeel = vandaag.toISOString().substr( 0, 10 ); 

let checkboxchecker = function() {
    console.log( "checkbox: ", this.id, this.checked ) ;

    if ( presentielijst.vrijwilligers[ this.id ] ) {
	if ( ! presentielijst.vrijwilligers[ this.id ].hasOwnProperty( 'aanwezig' ) ) {
	    presentielijst.vrijwilligers[ this.id ].aanwezig = {};
	}
	presentielijst.vrijwilligers[ this.id ].aanwezig[ dagdeel ] = this.checked;
    }
    if ( presentielijst.deelnemers[ this.id ] ) {
	if ( ! presentielijst.deelnemers[ this.id ].hasOwnProperty( 'aanwezig' ) ) {
	    presentielijst.deelnemers[ this.id ].aanwezig = {};
	}
	presentielijst.deelnemers[ this.id ].aanwezig[ dagdeel ] = this.checked;
    }
}

let maaklijst = function( data, element ) {
    let list = [];
    let n;
    
    for ( n in data ) { 
	list.push( { "id": n, "naam": data[n].naam } );
    }

    list.sort( function( a, b ) { if ( a.naam < b.naam ) return -1; if ( a.naam > b.naam ) return 1; return 0; }); 
    $.each( 
	list,
	function( i, v ) { 
	    $(element).append( '<div class="checkbox"><label><input id="' + v.id + '" type="checkbox" value="' + v.id + '">' + v.naam + '</label></div>' ); 
	    $( '#' + v.id ).click( checkboxchecker );
    } );
};

$.get( 'presentielijst.json', function( data ) { 
    presentielijst = data; 
    maaklijst( data.deelnemers, '#deelnemers' ); 
    maaklijst( data.vrijwilligers, '#vrijwilligers' ); 
} );

var save = function() {
    $.post( 'save.php', presentielijst, null, 'json' );
}


$('#savebutton').click( function() {
    console.log( 'savebutton', this  );
    save();
} );

// vim: set sw=4 sts=4 si:
