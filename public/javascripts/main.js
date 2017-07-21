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
      $('#responseCheck').text('Status: ' + JSON.stringify(data));
    },
    error: function(){console.log('whyyyyyyy');}
  })
});