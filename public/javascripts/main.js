$('#status-list').change(function(){

  $.ajax({
    url: '/status',
    data: {status: this.value},
    method: 'POST',
    headers: {
      "accept": "application/json",
      "content-type": "json"
    },
    success: function(data){
      $('#responseCheck').text('ok' + JSON.stringify(res));
    },
    error: function(){console.log('whyyyyyyy');}
  })
});