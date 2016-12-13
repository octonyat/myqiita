const PORT = require('./environments').PORT;

const fs = require('fs');
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const clientErrorObject = {
  message: 'Something is wrong with the Client',
  type: 'client_error'
};
const serverErrorObject = {
  message: 'Something is wrong with the Server',
  type: 'server_error'
};
const REQUEST_DUMMY_WAIT_TIME = 1000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * 投稿の一覧取得モックエンドポイント
 */
app.get('/api/v2/items', (req, res) => {
  const query = req.query;
  console.log('query: ', query);

  const page = query.page;
  const perPage = query.per_page;
  const searchQuery = query.query;
  /*
   * モックに利用する json データサンプルは下記　Qiita の API ドキュメントから引用しました。
   * http://qiita.com/api/v2/docs#get-apiv2items
   */
  fs.readFile('mock-server/data/items.json', (err, data) => {
    if (err) throw err;
    if (data) {
      setTimeout(() => {
        try {
          let parsedData = JSON.parse(data);

          if (perPage) {
            parsedData = parsedData.slice(0, perPage);
          }

          res.status(200).send(parsedData);
        } catch (ex) {
          res.status(400).send(clientErrorObject);
        }
      }, REQUEST_DUMMY_WAIT_TIME);
    } else {
      res.status(500).send(serverErrorObject);
    }
  });
});

app.post('/api/v2/items', (req, res) => {
  const body = req.body;
  console.log('body: ', body);

  if (!body.title || !body.body) {
    console.log(clientErrorObject);
    res.status(400).send(clientErrorObject);
    return;
  }
  /*
   * モックに利用する json データサンプルは下記　Qiita の API ドキュメントから引用しました。
   * http://qiita.com/api/v2/docs#get-apiv2items
   */
  fs.readFile('mock-server/data/item.json', (err, data) => {
    if (err) throw err;
    if (data) {
      setTimeout(() => {
        try {
          const item = JSON.parse(data);
          item.body = body.body;
          item.title = body.title;

          if (body.tags) {
            item.tags = body.tags.split(' ');
          }

          res.status(201).send(item);
        } catch (ex) {
          res.status(400).send(clientErrorObject);
        }
      }, REQUEST_DUMMY_WAIT_TIME);
    } else {
      res.status(500).send(serverErrorObject);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started: http://locahost:${PORT}/`);
});
