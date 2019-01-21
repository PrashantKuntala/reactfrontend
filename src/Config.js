// Below are setting for the app that need to be configured before building and deploying to any server.
//  
// --------------------- HELP --------------------------
// 
// apiURL : url to the server which is hosting your api
// appURL : url to the server where you intend to deploy this frontend application
// siteAvailability : can be either (private | public)
// samplesEndpoint :  samples endpoint to use based above defined 'siteAvailability'
// 


const settings = {
    "apiURL" : "http://172.29.0.74:8080",
    "appURL" : "http://172.29.0.74:3000",
    "siteAvailability" : "private",
    "samplesEndpoint" : "/reviewSamples" 
}

module.exports = {
    settings : settings
}