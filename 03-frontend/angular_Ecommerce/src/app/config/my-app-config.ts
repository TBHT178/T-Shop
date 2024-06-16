export default {

    oidc:{
        clientId: '0oahqntpl1h9ClC1I5d7',
        issuer: 'https://dev-15829471.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']  
        // scopes provide access to information about a user
        // openid: required for authentication requests, profile: user's name, phone, etc, email: user's email
    }
}
