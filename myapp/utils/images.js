const { customAlphabet } = require('nanoid');
const fs = require("fs");

module.exports = {
  async upload({ file }) {
    const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
    let documentname = nanoid();
    let filename = documentname + "." + file.mimetype.split("/")[1];
    let url = require("path").join(__dirname, "../public/images/" + filename);
    console.log("URL: ", url);
    
    try {
      file.mv(url, (err) => {
        if (err) {
          console.error("==> ERROR al subir imagen al servidor", err);
          return null;
        } else {
          console.log("OK se subió con éxito");
        }
      });
    } catch (err) {
      console.error("Something wrong happened removing the file", err);
      return null;
    }
    return filename;
  },

  async delete(url) {
    try {
        fs.unlinkSync(url);
        console.log("File removed");
        return 
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
        return null
      }
  }
}