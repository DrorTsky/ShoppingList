import axios from "axios";
import { BASE } from "../../Utils";

const USER_URL = `user/`;

class UserService {
  // GET SINGLE USER
  getSingleUser(user_name, user_email) {
    console.log(`getting ${user_name}`);
    console.log(BASE + USER_URL + `${user_name}@@${user_email}`);
    return axios.get(BASE + USER_URL + `${user_name}@@${user_email}`, {
      responseType: "json",
    });
  }

  // CREATE SINGLE USER
  async createUser(user_details) {
    console.log(`creating user ${user_details["user_name"]}`);
    await axios
      .post(BASE + USER_URL + `add`, user_details)
      .then((response) => {
        console.log(`created user ${user_details}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(`failed to create user ${user_details}`);
        console.log(error);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  }

  // UPDATE SINGLE USER
  async updateSingleUser(user_name, user_email, user_details) {
    console.log(`updating ${user_name}`);
    await axios
      .put(BASE + USER_URL + `${user_name}/${user_email}`, user_details)
      .then((response) => {
        console.log(`${user_name} updated`);
        console.log(response);
      })
      .catch((error) => {
        console.log(`failed to update ${user_name}`);
        console.log(error);
      });
  }
}

export default new UserService();
