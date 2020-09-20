const { response } = require("../helpers/response");
const { InsertTransactionValidation } = require("../helpers/validation");
const {
  insertTransactionsModel,
  insertTransactionDetailsModel,
  getAllTransactionsModel,
  getMyTransactionsModel,
  getTransactionDetailsModel,
} = require("../models/transactions");
const { getProductDetailsModel } = require("../models/products");
const { getDetailMyAddressModel } = require("../models/profile");

module.exports = {
  insertTransactions: async (req, res) => {
    try {
      const dummy = req.body.items;
      const user_id = req.decoded.result[0].id;
      const data = {
        total: parseInt(req.body.total),
        shipping_address: parseInt(req.body.address),
        user_id: user_id,
      };
      console.log(data);

      const validation = InsertTransactionValidation(data);
      if (validation.error === undefined) {
        const inserted = await insertTransactionsModel(data);
        data.id = inserted.id;
        data.user = req.decoded.result[0];
        const address = await getDetailMyAddressModel(
          inserted.shipping_address
        );
        data.address = address[0];
        dummy.map(async (data) => {
          data.order_id = inserted.id;
          await insertTransactionDetailsModel(data);
        });
        inserted.items = dummy;
        return response(res, true, inserted, 200);
      }
      let errorMessage = validation.error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");
      return response(res, false, errorMessage, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  getAllTransactions: async (req, res) => {
    try {
      const result = await getAllTransactionsModel();
      return response(res, true, result, 200);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  getMyTransactions: async (req, res) => {
    try {
      const id = req.decoded.result[0].id;
      const result = await getMyTransactionsModel(id);
      if (result.length !== 0) {
        return response(res, true, result, 200);
      }
      return response(res, false, "Transactions Not Found", 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  getTransactionDetails: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getTransactionDetailsModel(id);
      if (result.length !== 0) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Transaction with ID = ${id} not found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
