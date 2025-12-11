// 改为ES Modules写法
import express from 'express';
import { getPosts } from '../controllers/postController.js'; // 必须添加.js扩展名

const router = express.Router();

router.get('/', getPosts);

export default router; // 替换 module.exports = router
