import {cleanEnv,str,port} from 'envalid';

export default function validEnv() : void{
    cleanEnv(process.env,{
        NODE_ENV : str({
            choices : ['development','production'],
        }),
        MONGO_USER : str(),
        MONGO_PASSWORD : str(),
        MONGO_PATH  : str(),
        PORT : port({default : 5000})
    })
}

