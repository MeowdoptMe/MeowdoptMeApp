import axios, {isAxiosError} from 'axios';
import Database from './Database';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

async function login(username: string, password: string) {
  try {
    const response = await axios.post(Database.loginUrl, {
      username,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.detail) {
        throw e.response.data.detail;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function register(username: string, email: string, password: string) {
  try {
    await axios.post(Database.registerUrl, {
      username,
      email,
      password,
    });
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.email) {
        throw e.response.data.email[0];
      }
      if (e?.response?.data?.username) {
        throw e.response.data.username[0];
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function resetPassword(email: string) {
  try {
    await axios.post(Database.resetPasswordUrl, {email});
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.email) {
        throw e.response.data.email[0];
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function changeMail(email: string, token: string) {
  try {
    await axios.post(
      Database.changeMailUrl,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    if (isAxiosError(e)) {
      throw e.response?.data.detail;
    }
    throw e;
  }
}

async function changePassword(
  currentPassword: string,
  newPassword: string,
  token: string,
) {
  try {
    await axios.post(
      Database.changePasswordUrl,
      {current_password: currentPassword, new_password: newPassword},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    if (isAxiosError(e)) {
      throw e.response?.data.detail;
    }
    throw e;
  }
}

async function deleteAccount(id: number, token: string) {
  const url = `${Database.usersUrl}${id}/`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    if (isAxiosError(e)) {
      throw e.response?.data.detail;
    }
    throw e;
  }
}

export default {
  sleep,
  login,
  register,
  resetPassword,
  isValidEmail,
  changeMail,
  changePassword,
  deleteAccount,
};
