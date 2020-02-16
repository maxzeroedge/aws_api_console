'use strict';

import * as AWS from 'aws-sdk';
import {utils} from '../utils';

export const getLogGroups = async (attrs) => {
    AWS.config.update({
        "accessKeyId":utils.ACCESS_KEY,
        "secretAccessKey":utils.ACCESS_SECRET,
        "signatureVersion":"v4",
        "region": utils.AWS_REGION
    })
    const CloudWatchLogs = new AWS.CloudWatchLogs();
    try{
        const params = {
            limit: 50
        };
        if(attrs){
            if(attrs.searchTerm){
                params.logGroupNamePrefix = attrs.searchTerm;
            }
            if(attrs.lastKey){
                params.nextToken = attrs.nextToken;
            }
            if(attrs.limit){
                params.limit = 50;
            }
        }
        let logGroups = await CloudWatchLogs.describeLogGroups(params).promise();
        return {
            logGroups: logGroups.$response.data.logGroups.map(v=>{
                return {
                    "title": v.logGroupName,
                    "id": v.arn
                }
            }),
            nextToken: logGroups.$response.data.nextToken
        };
    } catch(e){
        console.log(e)
    }
    return {};
}