export default {
    s3: {
    REGION: "us-east-1", BUCKET: "notes-app-api-dev-serverlessdeploymentbucket-zypltii4x42s"
    }, 
    apiGateway: {
    REGION: "us-east-1",
    URL: "https://48nmq1vfgi.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_alhcpnVxb", 
        APP_CLIENT_ID: "4vmtqir95fe0v32dbl065ogs8a", 
        IDENTITY_POOL_ID: "us-east-1:59fa6686-b05a-416b-8bc9-4249f0222638",
    },
    MAX_FILE: 5000000
};
