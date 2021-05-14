import axios from "axios";
import { BASE } from "../../Utils";

const ITEMS_URL = `items/`;

class ItemService {
  //GET ALL ITEMS
  getAllItemFromShoppingList(user_name, user_email, shopping_list_id) {
    console.log(`getting all items from shopping list: ${shopping_list_id}`);
    console.log(
      BASE + ITEMS_URL + `${user_name}/${user_email}/${shopping_list_id}`
    );
    return axios.get(
      BASE + ITEMS_URL + `${user_name}/${user_email}/${shopping_list_id}`,
      {
        responseType: "json",
      }
    );
  }
  // GET SINGLE ITEM
  getSingleItemFromShoppingList(
    user_name,
    user_email,
    shopping_list_id,
    item_name
  ) {
    console.log(`getting ${item_name} from shopping list: ${shopping_list_id}`);
    return axios.get(
      BASE +
        ITEMS_URL +
        `${user_name}/${user_email}/${shopping_list_id}/${item_name}`,
      {
        responseType: "json",
      }
    );
  }

  // CREATE SINGLE ITEM
  async createItemInsideShoppingList(
    user_name,
    user_email,
    shopping_list_id,
    item_details
  ) {
    console.log(`creating item inside ${shopping_list_id}`);
    await axios
      .post(
        BASE + ITEMS_URL + `${user_name}/${user_email}/${shopping_list_id}`,
        item_details
      )
      .then((response) => {
        alert(
          `created item ${item_details} in shopping list ${shopping_list_id}`
        );
        console.log(response);
      })
      .catch((error) => {
        alert(
          `failed to create item ${item_details} in shopping list ${shopping_list_id}`
        );
        console.log(error);
      });
  }

  // UPDATE SINGLE ITEM
  async updateSingleItem(
    user_name,
    user_email,
    shopping_list_id,
    item_name,
    item_details
  ) {
    console.log(`updating ${item_name}`);
    await axios
      .put(
        BASE +
          ITEMS_URL +
          `${user_name}/${user_email}/${shopping_list_id}/${item_name}`,
        item_details
      )
      .then((response) => {
        alert(`${item_name} updated`);
        console.log(response);
      })
      .catch((error) => {
        alert(`failed to update ${item_name}`);
        console.log(error);
      });
  }

  // DELETE SINGLE ITEM
  deleteSingleItem(user_name, user_email, shopping_list_id, item_name) {
    console.log(`deleting item ${item_name}`);
    return axios.delete(
      BASE +
        ITEMS_URL +
        `${user_name}/${user_email}/${shopping_list_id}/${item_name}`
    );
  }
}

export default new ItemService();
