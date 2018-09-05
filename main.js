let postTemplateString = document.querySelector('#post-template').innerHTML;
let renderPosts = Handlebars.compile(postTemplateString);
Handlebars.registerHelper('withCommas', function (subs) {
  return subs.toLocaleString();
});

//Search box functionality & requesting from the right page
$('#searchbutton').on('click', function (event) {
  event.preventDefault(); //gets rid of the pound sign for anchor tags
  let loader = '<div class="loader">Loading...</div>';
  let beginningurl = 'https://www.reddit.com/r/';
  let usersearch = $('#searchbox').val();
  let endurl = '.json'
  let url = beginningurl + usersearch + endurl;




  console.log(url);
  $('#allposts').html(loader);

  let promise = $.ajax({
    type: 'GET',
    url: url
  });

  promise.then(function (response) {
      console.log('success', response);
      console.log('help');
      let renderedPosts = renderPosts({
        posts: response.data.children
      });
      console.log(renderedPosts);
      $('#allposts').html(renderedPosts);

    },

    function (error) {
      console.log('error', error);
      $("#allposts").html('<span id="oops">Houston, we have an error!</span>'); //checking for errors
    })

});