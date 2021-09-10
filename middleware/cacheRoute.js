const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

module.exports.cache = (duration) => {return (req, res, next) => {
    // Important: PUT, DELETE and POST methods should never be cached.
    if (req.method !=='GET') {
        console.log('Cannot cache non-GET methods')
        return next();
    }
    // use the request's full URL as a key and cache.get to check if we have a response cache for request URL
    const key = req.originalUrl
    const cachedResponse = myCache.get(key)
    // if it exists, send cache back
    if (cachedResponse) {
        res.send(cachedResponse)
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            myCache.set(key, body, duration);
            res.sendResponse(body)
        }
        next();
    }
}
}