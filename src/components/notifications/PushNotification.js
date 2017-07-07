import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    senderID: "YOUR GCM SENDER ID",
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
});

module.exports = PushNotification;

// PushNotification.localNotificationSchedule({
//     message: this.state.details,
//     title: this.state.title,
//     date: new Date(Date.now() + (60 * 1000)) 
// })