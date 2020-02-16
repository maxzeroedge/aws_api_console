import fs from 'fs';
import os from 'os';
import electron from 'electron';

const homedir = os.homedir();
let file = ''
if(fs.existsSync(file)){
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
    creds[v.substring(0, firstEquals).trim()] = v.substring(firstEquals+1).trim()
});

export const utils = creds;