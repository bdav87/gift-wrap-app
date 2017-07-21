$('#status-list').change(function(){
  var data = JSON.stringify({status: this.value});
  $.ajax({
    url: '/status',
    data: data,
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