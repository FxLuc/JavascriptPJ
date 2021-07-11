window.fbAsyncInit = () => {
    FB.init({
        appId      : 1123915621464064,
        xfbml      : true,
        version    : 'v11.0'
    })
    FB.AppEvents.logPageView()
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
        return
    }
    js = d.createElement(s)
    js.id = id
    js.src = "https://connect.facebook.net/vi_VN/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk')) //IIFE - Immediately Invoked Function Expression