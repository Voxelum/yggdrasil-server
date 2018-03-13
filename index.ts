import express from 'express'
import { v4 } from 'uuid'

const app = express();

app.use(express.json());

console.log(v4())
console.log(v4().replace(/-/g, ''))

app.post('/authenticate', (req, resp, next) => {
    console.log(req.body)
})

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

