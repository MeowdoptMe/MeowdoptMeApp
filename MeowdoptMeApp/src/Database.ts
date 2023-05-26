const databaseUrl = 'http://localhost:8000/';
const loginUrl = databaseUrl + 'user-auth/login/';
const registerUrl = databaseUrl + 'user-auth/register/';
const resetPasswordUrl = databaseUrl + 'user-auth/request-password-reset/';

const Database = {loginUrl, registerUrl, resetPasswordUrl};

export default Database;
