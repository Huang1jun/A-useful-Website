// 开发中


// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('express').json;  // 使用 express 内置的 json 中间件
// const morgan = require('morgan');

// const app = express();
// const PORT = process.env.PORT || 5500;

// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser());

// // MongoDB 连接
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // 评论模型
// const CommentSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     postedBy: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// const Comment = mongoose.model('Comment', CommentSchema);

// // 评论API路由
// app.post('/comments', async (req, res) => {
//     try {
//         const comment = new Comment(req.body);
//         await comment.save();
//         res.status(201).send({ message: 'Comment saved', id: comment._id });
//     } catch (error) {
//         res.status(400).send({ message: 'Error saving comment', error });
//     }
// });

// app.get('/comments', async (req, res) => {
//     try {
//         const comments = await Comment.find();
//         res.status(200).send(comments);
//     } catch (error) {
//         res.status(500).send({ message: 'Error fetching comments', error });
//     }
// });

// // AI 对话API路由
// app.post('/api/query', async (req, res) => {
//     const getAccessToken = async () => {
//         const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token`;
//         const params = {
//             grant_type: 'client_credentials',
//             client_id: process.env.API_KEY,
//             client_secret: process.env.SECRET_KEY
//         };
//         try {
//             const response = await axios.get(tokenUrl, { params });
//             return response.data.access_token;
//         } catch (error) {
//             console.error('Error getting access token:', error);
//             return null;
//         }
//     };

//     console.log("Received POST request to /api/query");
//     console.log("Request body:", req.body);

//     const accessToken = await getAccessToken();
//     if (!accessToken) {
//         console.error('Failed to retrieve access token');
//         return res.status(500).json({ error: 'Failed to retrieve access token' });
//     }

//     const apiURL = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${accessToken}`;
//     const payload = {
//         messages: [
//             {role: "user", content: req.body.question}
//         ],
//         temperature: 0.8,
//         top_p: 0.9
//     };

//     try {
//         const response = await axios.post(apiURL, payload, {
//             headers: {'Content-Type': 'application/json'}
//         });
//         res.json({ result: response.data.result });
//     } catch (error) {
//         console.error('Error in making API request:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Something went wrong with the API request' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
