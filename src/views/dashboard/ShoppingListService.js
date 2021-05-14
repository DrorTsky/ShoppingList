import axios from "axios";
import { BASE } from "../../Utils";

const SHOPPING_LISTS_URL = `shopping_list/`;

class ShoppingListService {
  getAllShoppingListsOfUser(user_name, user_email) {
    console.log(`getting all shopping lists related to ${user_name}`);
    console.log(BASE + SHOPPING_LISTS_URL + `${user_name}/${user_email}`);
    return axios.get(BASE + SHOPPING_LISTS_URL + `${user_name}/${user_email}`, {
      responseType: "json",
    });
  }

  async createShoppingList(user_name, user_email, shopping_list_details) {
    console.log(`creating a single shopping list`);
    await axios
      .post(
        BASE + SHOPPING_LISTS_URL + `${user_name}/${user_email}`,
        shopping_list_details
      )
      .then((response) => {
        alert(`created shopping list ${shopping_list_details}`);
        console.log(response);
      })
      .catch((error) => {
        alert(`failed to create shopping list ${shopping_list_details}`);
        console.log(error);
      });
  }

  async addUserToShoppingList(user_name, user_email, shopping_list_id) {
    console.log(`adding user to shopping list ${shopping_list_id}`);
    await axios
      .put(
        BASE +
          SHOPPING_LISTS_URL +
          `${user_name}/${user_email}/${shopping_list_id}`
      )
      .then((response) => {
        alert(`${user_name} added`);
        console.log(response);
      })
      .catch((error) => {
        alert(`failed to add user ${user_name}`);
        console.log(error);
      });
  }

  deleteSingleShoppingList(user_name, user_email, shopping_list_id) {
    console.log(`deleting shopping list ${shopping_list_id}`);
    return axios.delete(
      BASE +
        SHOPPING_LISTS_URL +
        `${user_name}/${user_email}/${shopping_list_id}`
    );
  }
}

export default new ShoppingListService();
