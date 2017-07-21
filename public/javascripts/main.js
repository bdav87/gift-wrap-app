var statuses = ['Incomplete',
'Pending',
'Shipped',
'Partially Shipped',
'Refunded',
'Cancelled',
'Declined',
'Awaiting Payment',
'Awaiting Pickup',
'Pending',
'Awaiting Shipment',
'Completed',
'Awaiting Fulfillment',
'Manual Verification Required',
'Disputed',
'Partially Refunded'];


$('#status-list').change(function(){
  var status_id = this.value;
  $.post('/status', {
    status_id: status_id
  }).done(
    function(res){
      var resTest = JSON.parse(res);
      $('#responseCheck').text('Orders with gift wrapping will change to status: '  + statuses[resTest]);
    }
  );

});

$('#checkHook').click(function(){
  $.get('/webhook').done(function(res){
    $('#hook').text(res);
  });
});