#!/usr/bin/perl -w

use strict;
use Data::Printer;
use JSON::PP;

my $data = JSON::PP->new->decode( join "", <> );

my $deeln = {};
my $vrijw = {};

while ( my ( $id, $info ) = each %$data )  {

	if ( $info->{ group } =~ /^vrijw/ ) {
		delete $info->{ group };
		$vrijw->{ $id } = $info;
	}

	if ( $info->{ group } =~ /^deeln/ ) {
		delete $info->{ group };
		$deeln->{ $id } = $info;
	}


}

print JSON::PP->new->pretty->canonical->encode( { vrijwilligers => $vrijw, deelnemers => $deeln } );
