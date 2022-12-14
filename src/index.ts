import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import PostController from '@/resources/post/post.controller';
import validEnv from '@/utils/validEnv';
import UserController from '@/resources/user/user.controller';
validEnv();
const app = new App([new PostController(),new UserController()],Number(process.env.PORT));

app.listen();