angular
.module( "networkTroubleshooter")
.service("Session", function () {
	
	this.create = function (webToken, userId, userRole) {
		this.token = webToken;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function () {
		this.token = null;
		this.userId = null;
		this.userRole = null;
	};
});