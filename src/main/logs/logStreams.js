'use strict';

import * as AWS from 'aws-sdk';
import {utils} from '../utils';

const orderTypes = ["LogStreamName", "LastEventTime"]

export const getLogStreams = async (attrs) => {
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
            limit: 50
        };
        if(attrs.nextToken){
            params.nextToken = attrs.nextToken;
        }
        if(attrs.searchTerm){
            params.logStreamNamePrefix = attrs.searchTerm;
        }
        if(attrs.lastKey){
            params.nextToken = attrs.nextToken;
        }
        if(attrs.limit){
            params.limit = 50;
        }
        if(attrs.orderBy != undefined){
            params.orderBy = orderTypes[attrs.orderBy]
        }
        if(attrs.descending != undefined){
            params.descending = attrs.descending;
        }
        let logStreams = await CloudWatchLogs.describeLogStreams(params).promise();
        return {
            logStreams: logStreams.$response.data.logStreams.map(v=>{
                return {
                    "title": v.logStreamName,
                    "id": v.arn,
                    "createdOn": v.creationTime,
                    "firstEventTimestamp": v.firstEventTimestamp,
                    "lastEventTimestamp": v.lastEventTimestamp,
                }
            }),
            nextToken: logStreams.$response.data.nextToken
        };
    } catch(e){
        console.log(e)
    }
    return [];
}