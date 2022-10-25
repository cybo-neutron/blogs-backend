import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import PostController from '@/resources/post/post.controller';
import validEnv from '@/utils/validEnv';

validEnv();
const app = new App([new PostController()],Number(process.env.PORT));

app.listen();