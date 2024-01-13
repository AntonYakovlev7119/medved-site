const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("medvedDB.db");
const ApiError = require("./Error");

class Content {
  static getPageContent(pages) {
    if (pages > 2) pages.length = 2;
    try {
      return new Promise((res, rej) => {
        const content = {};
        db.all(
          "SELECT * FROM cms_data WHERE page IN (?,?)",
          pages,
          (err, data) => {
            if (err) throw err;
            data.forEach((elem) => {
              content[elem.section] = elem.content;
            });
            res(content);
          }
        );
      });
    } catch (err) {
      next(
        ApiError.badRequest(
          "Не получилось получить данные страницы из базы данных"
        )
      );
    }
  }

  static getAllPagesContent() {
    try {
      return new Promise((res, rej) => {
        const content = {};
        db.all(
          "SELECT * FROM cms_data",

          (err, data) => {
            if (err) throw err;
            data.forEach((elem) => {
              content[elem.section] = {
                name: elem.name,
                content: elem.content,
              };
            });
            res(content);
          }
        );
      });
    } catch (err) {
      next(
        ApiError.badRequest(
          "Не получилось получить данные страницы из базы данных"
        )
      );
    }
  }

  static getProducts() {
    try {
      return new Promise((res, rej) => {
        const products = [];
        db.all("SELECT * FROM products", (err, data) => {
          data.forEach((elem) => {
            products.push({
              id: elem.id,
              title: elem.title,
              desc: elem.description,
              price: elem.price,
              img: elem.img,
            });
          });
          res(products);
        });
      });
    } catch (err) {
      next(
        ApiError.badRequest(
          "Не получилось получить данные продукции из базы данных"
        )
      );
    }
  }

  static getAllOrders() {
    try {
      return new Promise((res, rej) => {
        const orders = [];
        db.all("SELECT * FROM orders", (err, data) => {
          data.forEach((elem) => {
            orders.push({
              id: elem.id,
              client: elem.client,
              telephone: elem.telephone,
              cart: elem.cart,
              cart_count: elem.cart_count,
              order_notes: elem.order_notes,
              request_type: elem.request_type,
              status: elem.status,
              date: elem.date,
            });
          });
          res(orders);
        });
      });
    } catch (err) {
      next(
        ApiError.badRequest(
          "Не получилось получить данные продукции из базы данных"
        )
      );
    }
  }

  static async getClientOrder(order_id) {
    const id = order_id;
    return new Promise((res, rej) => {
      db.get("SELECT cart FROM orders WHERE id=?", id, (err, data) => {
        res(data.cart);
      });
    });
  }

  static createCartOrder(client_cart) {
    try {
      const cart = client_cart;
      const cart_order = JSON.stringify(cart.cart);

      db.run(
        "INSERT INTO orders (client, telephone, cart, cart_count, order_notes, request_type, status, date) VALUES (?,?,?,?,?,?,?, strftime('%Y-%m-%d', date('now')))",
        cart.name,
        cart.telephone,
        cart_order,
        cart.cart_count,
        cart.order_notes,
        "корзина",
        "new"
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  static test() {
    try {
    } catch (err) {
      next(
        ApiError.badRequest(
          "Не получилось получить данные продукции из базы данных"
        )
      );
    }
  }
}

module.exports = Content;
