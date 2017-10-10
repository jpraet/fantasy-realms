$(document).ready(function() {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({suits: cardsBySuit});
  $('#cards').html(html);
});
