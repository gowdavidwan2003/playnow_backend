import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();


// const whitelist = ['https://play-now-chi.vercel.app/'];

// // Set up CORS options
// const corsOptions = {
//     origin: function (origin, callback) {
//         // Check if the request origin is in the whitelist
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

// // Use CORS middleware with options
// app.use(cors(corsOptions));

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


// routes
import userRouter from "./routes/user.router.js"
import videoRouter from "./routes/video.router.js"
import tweetRouter from "./routes/tweet.router.js"
import commentRouter from "./routes/comment.router.js"
import subscriptionRouter from "./routes/subscription.router.js"
import likeRouter from "./routes/like.router.js"
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)

export { app }