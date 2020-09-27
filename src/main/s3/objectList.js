'use strict';

import * as AWS from 'aws-sdk';
import {utils} from '../utils';

export const getS3Buckets = async (attrs) => {
    AWS.config.update({
        "accessKeyId":utils.ACCESS_KEY,
        "secretAccessKey":utils.ACCESS_SECRET,
        "signatureVersion":"v4",
        "region": utils.AWS_REGION || "us-east-1"
    })
    const S3 = new AWS.S3();
    try{
        const params = {
            Name: attrs.bucketName
        }
        let buckets = await S3.listObjects({}).promise();
        return {
            buckets: buckets.$response.data.Buckets.map(v=>{
                return {
                    "title": v.Name,
                    "date": v.CreationDate
                }
            })
        };
    } catch(e){
        console.log(e)
    }
    return {};
}