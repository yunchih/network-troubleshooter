angular
.module( "networkTroubleshooter")
.controller( "logoutController", function( Session, User ){

	Session.destroy();
	User.logout();
	$scope.setCurrentUser({});
	
});