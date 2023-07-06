const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.put('/products/:code', (req, res) => {
  const productCode = req.params.code;
  const newData = req.body;
  const dbInternalFilePath = path.join(__dirname, 'db-internal.json');

  const dbInternalContent = JSON.parse(fs.readFileSync(dbInternalFilePath, 'utf8'));
  const productIndex = dbInternalContent.products.findIndex(product => product.code === productCode);

  if (productIndex === -1) {
    const newProduct = {
      code: productCode,
      ...newData
    };
    dbInternalContent.products.push(newProduct);
  } else {
    const existingProduct = dbInternalContent.products[productIndex];
    dbInternalContent.products[productIndex] = { ...existingProduct, ...newData };
  }

  fs.writeFileSync(dbInternalFilePath, JSON.stringify(dbInternalContent, null, 2));
  res.status(200).json(dbInternalContent.products[productIndex]);
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
