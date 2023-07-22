# Satosa Auth0 Action

## Deploy the action

```sh
$ npm run deploy
```

### Environment Variables

|Environment Variable|Required|Default|Description|
|:-:|:-:|:-:|:-:|
|`SATOSA_ORGANIZATION_ID`|Yes||The organization ID of your Satosa tenant|
|`SATOSA_DOCUMENT_ID`|Yes||The document ID to prompt users to acknowlege when after login|
|`SATOSA_API_KEY`|Yes||The [API key](https://dashboard.satosa.com/developers) with access to your Satosa tenant|
|`CALLBACK_URL`|No|Will use your Auth0 redirect URI|The url to redirect users after acknowledging the document|
|`AUTH0_CUSTOM_DOMAIN`|No||Auth0 custom domain|
|`AUTH0_DOMAIN`|Yes||Auth0 tenant domain|
|`AUTH0_CLIENT_ID`|Yes||Auth0 tenant client ID|
|`AUTH0_CLIENT_SECRET`|Yes||Auth0 tenant client secret|
