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
    $.post('http://localhost:3000/links/', data, function (data) {
      alert('Link submitted! ID: ' + data.id);
    });
  }

  function getLinks() {
    var $contentBlock = $('.content__links');
    if (!$contentBlock.find('.link')) {
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
      var url = $('#post-form-url').val();
      postLink(url, 'New: ' + url, 'random');

      e.preventDefault();
    });

    // Interval for Ajax polling
    var intervalID = window.setInterval(getLinks, 1000);
  });
})(jQuery);