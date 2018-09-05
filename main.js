$('#searchbutton').on('click', function(event){
  event.preventDefault(); //gets rid of the pound sign for anchor tags
  let loader = '<div class="loader">Loading...</div>';
  let beginningurl = 'https://www.reddit.com/r/';
  let usersearch = $('#searchbox').val();
  let endurl = '.json'
  let url = beginningurl + usersearch + endurl;
  console.log(url);
  $('#postdata').html(loader);
  let promise = $.ajax({
    type: 'GET',
    url: url
  });

  promise.then(function(titles){
    console.log('success', titles);
    let html = '';
    titles.data.children.forEach(function(title){
      html += `
      <div id='post'>
        <span id='posttitle'><a href='${title.data.url}'>${title.data.title}</a></span>
        <br><br>
        <img id='postimg' src='${title.data.thumbnail}'>
        <br>
        <span id='score'> ${title.data.score}</span>
        <span id='author'>${title.data.author}</span>
        <br>
        </div>
        <br>
      `;
    });
    $('#postdata').html(html);

  },
  function(){
    console.log('error',error);//checking for errors
  });

});
