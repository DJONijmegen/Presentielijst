<?php

	header( "Content-type: text/json" );

	file_put_contents( 'presentielijst.json', json_encode( $_POST ) );

	print( '{ "success": true }' );

?>

