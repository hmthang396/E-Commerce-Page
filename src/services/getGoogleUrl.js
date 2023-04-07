const redirectGoogleUri = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT;
const googleClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const facebookClientId = process.env.REACT_APP_FACEBOOK_APP_ID;
const redirectFacebookUri = process.env.REACT_APP_FACEBOOK_REDIRECT
export const getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/auth`;
    const options = {
        redirect_uri: redirectGoogleUri,
        client_id: googleClientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: from,
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};


export const getFacebookUrl = (from) => {
    const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`;
    const options = {
        redirect_uri: redirectFacebookUri,
        client_id: facebookClientId,
        response_type: 'code',
        state: from,
    };
    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
}