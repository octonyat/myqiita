import './index.css';
import $ from 'jquery';

const getItemsButton = $('#get_items_button');
const postItemForm = $('#post_item_form');
const resultElement = $('.result span');

getItemsButton.on('click', () => {
  const url = '/api/v2/items';

  resultElement.text('loading...');
  $.ajax({
    url: url,
    type: 'GET',
    data: {
      page: 1,
      per_page: 2,
      query: 'sakura'
    }
  })
  .then(data => {
    console.log('data: ', data);
    resultElement.text(JSON.stringify(data));
  }).fail(xhr => {
    console.log(xhr.responseJSON);
    resultElement.text(JSON.stringify(xhr.responseJSON));
  });
});

postItemForm.on('submit', event => {
  event.preventDefault();
  const url = '/api/v2/items';

  resultElement.text('loading...');
  $.ajax({
    url: url,
    type: 'POST',
    data: postItemForm.serialize()
  })
  .then(data => {
    console.log('data', data);
    resultElement.text(JSON.stringify(data));
  }).fail(xhr => {
    console.log(xhr.responseJSON);
    resultElement.text(JSON.stringify(xhr.responseJSON));
  });
});
