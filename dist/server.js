"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const Product_1 = require("./entities/Product");
const express_1 = __importDefault(require("express"));
const product_1 = require("./resolvers/product");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./entities/User");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./constants");
const constants_2 = require("./constants");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "brand404",
    username: "postgres",
    password: "200182",
    logging: true,
    synchronize: true,
    entities: [Product_1.Product, User_1.User],
});
const main = async () => {
    await exports.myDataSource.initialize();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            secure: constants_2.__prod__,
            sameSite: false,
            httpOnly: true,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [product_1.ProductResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=server.js.map