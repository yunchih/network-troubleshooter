angular
.module( "networkTroubleshooter")
.service("Session", function ($cookieStore) {
	
	this.token = $cookieStore.get('token');

	this.store = function (webToken) {
		this.token = webToken;
		$cookieStore.put('token',webToken);
	};
	this.destroy = function () {
		this.token = null;
		$cookieStore.remove('token');
	};
		
});