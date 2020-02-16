import fs from 'fs';
const creds = []
fs.readFileSync('./aws_credentials', {encoding: 'UTF-8'}).split("\n").forEach(v=>{
    const firstEquals = v.indexOf("=");
    creds[v.substring(0, firstEquals).trim()] = v.substring(firstEquals+1).trim()
});

export const utils = creds;