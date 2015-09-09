angular
.module( "networkTroubleshooter")

.constant("Testing",false)

.constant("API", {
    base: "http://140.112.196.15:3000/api",
    version: "1.0",
    api: {
        Login: "auth/login",
        /* 
         * Format: /auth/login                                     
         * Usage:  Login.  Return JWT to users
         * Method: POST
         */
        UpdateUserProfile: "user/current",
        /* 
         * Format: /user/current                                     
         * Usage:  Update the profile of current login user
         * Method: POST
         */
        UpdateSingleUserProfile: "user" ,
        /* 
         * Format: /user/:prop/:value                                        
         * Usage:  Update the profile of user(s) whose value of property :prop is :value.
         * Method: POST
         */
        GetUserProfile: "user/current",
        /* 
         * Format: /user/current                                      
         * Usage:  Get the profile of current login user.
         * Method: GET
         */
        GetSingleUserProfile: "user", 
        /* 
         * Format: /user/:prop/:value                                        
         * Usage:  Get the profile of user(s) whose value of property :prop is :value. 
         * Method: GET
         */
        GetAllUserSingleField: "user" 
    }
})
.constant("RestrictedRoute",[
  ['profile']
])
.constant("Profile",{
  patterns: {
    '電話': /^\d{10}$/i,
    '房號': /^\d{3}$/i,
    '學號': /^\w\d{8}$/i
  },
  mappings: {
    name: '真實姓名',
    room_number: '房號',
    student_id: '學號',
    phone_number: '電話'
  }
  	
})

.constant("Schedule",{
    startTime: 9.5,  /* Starts at 9 am */
    endTime: 23.5,  /* Ends at 11 pm */

    numOfDateToChooseFrom: 5,
    numOfSchedule: 3
})

.constant("Identity",{
    status: {
        NotRegistered: 'unregistered',
        Registered: 'registered'
    },
    authorizedBy: {
        None: 'none',
        FB: 'fb',
        Backend: 'back'
    }
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});