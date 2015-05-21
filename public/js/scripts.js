/* global jQuery */
(function ($) {
  'use strict';

  // POST new link
  function postLink(url, title, author) {
    if (url === '' || title === '' || author === 0) {
      return;
    }

    var data = {
      url   : url,
      title : title,
      author: author
    };
    $.post('/links/', data, function (data) {
    });
  }

  // Get all links and render them
  function getLinks() {
    var $contentBlock = $('.content__links');
    if ($contentBlock.length === 0) {
      return;
    }

    var template = Handlebars.compile($("#singleLinkTemplate").html());

    $.get('http://localhost:3000/links', function (data) {
      $contentBlock.empty();
      $.each(data, function (index, value) {
        value.date = moment(value.date).format('LLL');
        $contentBlock.append(template(value));
      });
    });
  }

  $(function () {
    // Form submission handler
    $('.post-link-form').submit(function (e) {
      e.preventDefault();

      var url = $('#post-form-url').val();
      postLink(url, 'New: ' + url, 'random');
    });

    // Log out button
    $('#logout-button').click(function (e) {
      e.preventDefault;

      $.ajax({
        url   : 'http://localhost:3000/login',
        method: 'DELETE'
      }).done(function () {
        document.location.reload(true);
      });
    });

    // Upvote / Downvote
    $('body').on('click', '.link__vote', function (e) {
      e.preventDefault();

      var type = $(this).attr('data-vote'),
          linkId = $(this).parents('.link').attr('id');

      $.ajax({
        url   : 'http://localhost:3000/links/' + linkId + '/' + type,
        method: 'POST'
      }).done(function () {
        getLinks();
      });
    });

    // Interval for Ajax polling
    var intervalID = window.setInterval(getLinks, 1000);
  });
})(jQuery);