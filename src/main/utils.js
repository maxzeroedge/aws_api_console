import fs from 'fs';
import os from 'os';
import electron from 'electron';

const homedir = os.homedir();
let file = ''
if(fs.existsSync(`${homedir}/.aws/credentials`)){
    file = `${homedir}/.aws/credentials`
} else if(fs.existsSync(`${homedir}/aws_credentials`)){
    file = `${homedir}/aws_credentials`
} else {
    const electron_app_path = electron.remote.app.getPath('userData')
    file = `${electron_app_path}/aws_credentials`
}
const creds = []

fs.readFileSync(file, {encoding: 'UTF-8'}).split("\n").forEach(v=>{
    const firstEquals = v.indexOf("=");
    if(firstEquals < 0){
        return;
    }
    let key = v.substring(0, firstEquals).trim();
    const value = v.substring(firstEquals+1).trim();
    if(key == "aws_access_key_id"){
        key = "ACCESS_KEY"
    } else if(key == "aws_secret_access_key"){
        key = "ACCESS_SECRET"
    }
    creds[key] = value
});

export const utils = creds;