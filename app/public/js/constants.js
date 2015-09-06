angular
.module( "networkTroubleshooter")

.constant("API", {
    base: "dntrs-tinray.rhcloud.com/api",
    version: "1.0",
    user: {
      prefix: 'user',
      postRequestBody: {
        UpdateUserProfile: "current",
        /* 
         * Format: /user/current                                     
         * Usage:  Update the profile of current login user
         *
         */
        UpdateSingleUserProfile: "" 
        /* 
         * Format: /user/:prop/:value                                        
         * Usage:  Update the profile of user(s) whose value of property :prop is :value.
         *
         */
      },
      getRequestBody: {
        GetUserProfile: "current",
        /* 
         * Format: /user/current                                      
         * Usage:  Get the profile of current login user.
         *
         */
        GetSingleUserProfile: "", 
        /* 
         * Format: /user/:prop/:value                                        
         * Usage:  Get the profile of user(s) whose value of property :prop is :value. 
         *
         */
        GetAllUserSingleField: "" 
      }
    }
})

.constant("ProfilePatterns",{
	'電話': /^\d{10}$/i,
	'房號': /^\d{3}$/i,
	'學號': /^\w\d{8}$/i
})

.constant("Schedule",{
    startTime: 9.5,  /* Starts at 9 am */
    endTime: 23.5,  /* Ends at 11 pm */

    numOfDateToChooseFrom: 5,
    numOfSchedule: 3
})

.constant("UserIdentity",{
    unauthenticatedUser: 'x',
    authenticatedUser: 'o'
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});