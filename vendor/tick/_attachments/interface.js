$( document ).ready( function()
{
  $( '.tick' ).ticker(
  {
    delay       : 1000,
    incremental : -1,
    separators  : true
  });
});