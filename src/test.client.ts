import { request } from 'http'

const req = request({
    host: "localhost",
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    path: "/authenticate",
    port: 8080,
}, (res => {
    res.on('data', (s) => {
        console.log(s.toString())
    })
    res.on('error', (e) => {
        console.error(e)
    })
}))
req.write(JSON.stringify({
    "agent": {                              // defaults to Minecraft
        "name": "Minecraft",                // For Mojang's other game Scrolls, "Scrolls" should be used
        "version": 1                        // This number might be increased
        // by the vanilla client in the future
    },
    "username": "ci010",      // Can be an email address or player name for
    // unmigrated accounts
    "password": "pass",
    "clientToken": "123",     // optional
    "requestUser": true                     // optional; default: false; true adds the user object to the response
}))
req.end()
