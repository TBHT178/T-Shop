export default {

    oidc:{
        clientId: '0oahpiqidfGT00oRn5d7',
        issuer: 'https://dev-56555381.okta.com',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']  
        // scopes provide access to information about a user
        // openid: required for authentication requests, profile: user's name, phone, etc, email: user's email
    }
}
