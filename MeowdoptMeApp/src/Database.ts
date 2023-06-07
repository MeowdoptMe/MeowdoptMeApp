const databaseUrl = 'http://localhost:8000/';
const loginUrl = databaseUrl + 'user-auth/login/';
const registerUrl = databaseUrl + 'user-auth/register/';
const resetPasswordUrl = databaseUrl + 'user-auth/request-password-reset/';
const changeMailUrl = databaseUrl + 'user-auth/change-email/';

const Database = {loginUrl, registerUrl, resetPasswordUrl, changeMailUrl};

export default Database;
