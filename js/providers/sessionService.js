angular
.module( "networkTroubleshooter")
.service("Session", function ($cookieStore) {
	
	this.token = $cookieStore.get('token');
	this.fb_token = $cookieStore.get('fb_token');

	this.store = function (webToken, fbToken) {
		console.log("Setting web token: ", webToken );
		console.log("Setting fb token: ", fbToken );
		this.token = webToken;
		this.fb_token = fbToken;
		$cookieStore.put('token',webToken);
		$cookieStore.put('fb_token',fbToken);
	};
	this.destroy = function () {
		this.token = this.fb_token = null;
		$cookieStore.remove('token');
		$cookieStore.remove('fb_token');
	};
		
});