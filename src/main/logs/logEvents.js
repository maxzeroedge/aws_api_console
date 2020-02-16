'use strict';

import * as AWS from 'aws-sdk';
import * as utils from '../utils';


export const getLogEvents = async (attrs) => {
    AWS.config.update({
        "accessKeyId":utils.ACCESS_KEY,
        "secretAccessKey":utils.ACCESS_SECRET,
        "signatureVersion":"v4",
        "region": utils.AWS_REGION
    })
    const CloudWatchLogs = new AWS.CloudWatchLogs();
    try{
        const params = {
            logGroupName: attrs.logGroupName,
            logStreamName: attrs.logStreamName,
            limit: 50,
            startFromHead: true
        };
        if(attrs.nextToken){
            params.nextToken = attrs.nextToken;
        }
        let logEvents = await CloudWatchLogs.getLogEvents(params).promise();
        return {
            logEvents: logEvents.$response.data.events.map(v=>{
                return {
                    "message": v.message,
                    "timestamp": v.timestamp
                }
            }),
            nextToken: logEvents.$response.data.nextForwardToken
        };
    } catch(e){
        console.log(e)
    }
    return [];
}