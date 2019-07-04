access key ID: AKIAW44FXQLJ47YA2FGK
secret access key: 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 

pool-id: us-east-1_alhcpnVxb
app-client: 4vmtqir95fe0v32dbl065ogs8a

domain name: notes-app-shine

gateway-id: 48nmq1vfgi

identity-pool-id us-east-1:59fa6686-b05a-416b-8bc9-4249f0222638
invoke url: https://48nmq1vfgi.execute-api.us-east-1.amazonaws.com/dev

npx aws-api-gateway-cli-test --username='a1995080130@gmail.com' --password='Shine0125951!' --app-client-id='4vmtqir95fe0v32dbl065ogs8a' --identity-pool-id='us-east-1:59fa6686-b05a-416b-8bc9-4249f0222638' --cognito-region='us-east-1' --path-template='/notes' --user-pool-id='us-east-1_alhcpnVxb' --invoke-url='https://48nmq1vfgi.execute-api.us-east-1.amazonaws.com/dev' --api-gateway-region='us-east-1' --method='POST' --body='{"content":"hello world","attachment":"hello.jpg"}'
npx aws-api-gateway-cli-test --username a1995080130@gmail.com --password Shine0125951! --app-client-id 4vmtqir95fe0v32dbl065ogs8a --identity-pool-id us-east-1:59fa6686-b05a-416b-8bc9-4249f0222638 --cognito-region us-east-1 --path-template /notes --user-pool-id us-east-1_alhcpnVxb --invoke-url https://48nmq1vfgi.execute-api.us-east-1.amazonaws.com/dev --api-gateway-region us-east-1 --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"

{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "mobileanalytics:PutEvents",
          "cognito-sync:*",
          "cognito-identity:*"
        ],
        "Resource": [
    "*"
    ] },
        {
          "Effect": "Allow",
          "Action": [
    "s3:*"
          ],
          "Resource": [
            "arn:aws:s3:::notes-app-api-dev-serverlessdeploymentbucket-zypltii4x42s/private/${cognito-identity.amazonaws.com:sub}/*"
    ] },
        {
          "Effect": "Allow",
          "Action": [
              "execute-api:Invoke"
              ],
      "Resource": [
        "arn:aws:execute-api:us-east-1:*:48nmq1vfgi/*/*/*"
] }
]
}
 

                //"arn:aws:execute-api:us-east-1:*:48nmq1vfgi/*/*/*"//
                notes-app-api-dev-serverlessdeploymentbucket-zypltii4x42s

                "arn:aws:s3:::notes-app-api-dev-serverlessdeploymentbucket-zypltii4x42s/private/${cognito-identity.amazonaws.com:sub}/*"


                aws lambda add-permission --function-name arn:aws:lambda:us-east-1:474337477331:function:notes-app-api-dev-create --source-arn arn:aws:execute-api:us-east-1:474337477331:48nmq1vfgi/*/POST/notes --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction