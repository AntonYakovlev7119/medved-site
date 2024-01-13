const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("medvedDB.db");
const fs = require("fs");
const Content = require("../models/Content");
const ApiError = require("../models/Error");
let content = {};
let products = [];
let orders = [];

class Admin {
  static async getCmsPage(req, res, next) {
    try {
      content = await Content.getAllPagesContent();
      const section = req.query.section;
      if (section) getListData();

      function getListData() {
        const section_content = {
          title: content[section].name,
          content: content[section].content,
        };
        return res.json(section_content);
      }
      

      return res.render("admin", { req, content });
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static async getСatalogPage(req, res, next) {
    try {
      products = await Content.getProducts();

      function getProducts() {
        const product_id = req.query.product_id;
        if (product_id) {
          products.forEach((elem) => {
            if (elem.id == product_id) {
              return res.json(elem);
            }
          });
        }
      }

      getProducts();

      return res.render("admin", { req, products });
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static async getOrdersPage(req, res, next) {
    try {
      orders = await Content.getAllOrders();

      return res.render("admin", { req, orders });
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static signOut(req, res) {
    res.clearCookie("jwt");
    return res.redirect("/login");
  }

  static async saveCmsChahges(req, res, next) {
    const section = req.query.section;
    const contents = req.body.content;
    try {
      db.run(
        "UPDATE cms_data SET content = ? WHERE section = ?",
        contents,
        section
      );

      content = await Content.getAllPagesContent();
      res.redirect("/admin/cms");
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static async createProduct(req, res, next) {
    try {
      const product_title = req.body.product__name;
      const product_desc = req.body.product__description;
      const product_price = req.body.product__price;
      let product_img = req.file;

      if (!product_img) {
        product_img = "no_img.jpg";
      } else {
        product_img = product_img.filename;
      }

      db.run(
        "INSERT INTO products (title, description, price, img) VALUES (?,?,?,?)",
        product_title,
        product_desc,
        product_price,
        product_img
      );

      res.redirect("/admin/catalog_management");
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static async editProduct(req, res, next) {
    try {
      const product_id = req.params.id;
      const product_title = req.body.product__name;
      const product_desc = req.body.product__description;
      const product_price = req.body.product__price;
      let product_img_file = req.file;

      if (!product_img_file) {
        db.run(
          "UPDATE products SET title=?, description=?, price=? WHERE id=?",
          product_title,
          product_desc,
          product_price,
          product_id
        );
      } else {
        product_img_file = product_img_file.filename;
        db.run(
          "UPDATE products SET title=?, description=?, price=?, img=? WHERE id=?",
          product_title,
          product_desc,
          product_price,
          product_img_file,
          product_id
        );
      }

      res.redirect("/admin/catalog_management");
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const product_id = req.params.id;
      const product_img = req.query.img;

      if (product_img !== "no_img.jpg")
        fs.unlinkSync(`./public/product_images/${product_img}`);

      db.run("DELETE FROM products WHERE id=?", product_id);

      res.redirect("/admin/catalog_management");
    } catch (err) {
      return next(new ApiError(err.status, err.message));
    }
  }
}

module.exports = { Admin };
