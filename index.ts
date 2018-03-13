import express from 'express'
import { v4 } from 'uuid'

const app = express();

app.use(express.json());

console.log(v4())
console.log(v4().replace(/-/g, ''))


app.post('/authenticate', (req, resp, next) => {
    console.log(req.body)
    const payload = req.body;
    if (!payload.agent.name || !payload.agent.version || !payload.username || !payload.password) {
        const err = {
            "error": "Unsupported Media Type",
            "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
        }
        resp.status(301);
        resp.send(err);
    }
    resp.send({
        "accessToken": "random access token",      // hexadecimal
        "clientToken": "client identifier",        // identical to the one received
        "availableProfiles": [                     // only present if the agent field was received
            {
                "id": "profile identifier",        // hexadecimal
                "name": "player name",
                "legacy": false            // In practice, this field only appears in the response if true. Default to false.
            }
        ],
        "selectedProfile": {                       // only present if the agent field was received
            "id": "uuid without dashes",
            "name": "player name",
            "legacy": false
        },
        "user": {                                  // only present if requestUser was true in the request payload
            "id": "user identifier",               // hexadecimal
            "properties": [
                {
                    "name": "preferredLanguage",   // might not be present for all accounts
                    "value": "en"                  // Java locale format (https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#toString--)
                },
                {
                    "name": "twitch_access_token", // only present if a twitch account is associated (see https://account.mojang.com/me/settings)
                    "value": "twitch oauth token"  // OAuth 2.0 Token; alphanumerical; e.g. https://api.twitch.tv/kraken?oauth_token=[...]
                    // the Twitch API is documented here: https://github.com/justintv/Twitch-API
                }
            ]
        }
    })
})
function randomGeneration(){
    random();
}
app.post('/refresh', (req, resp) => {

})

app.post('/validate', (req, resp) => {

})

app.post('/signout', (req, resp) => {

})

app.post('/invalidate', (req, resp) => {

})


app.listen(8080, () => {
    console.log('Server Start.')
});

