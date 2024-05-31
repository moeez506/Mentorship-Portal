const notFoundMiddleware = (_, res) => res.send("Route doesn't exist ");

export default notFoundMiddleware;
