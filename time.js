$().ready(function(){
	<?php if( strtotime(date('H:i:s')) > strtotime('19:00:00') ){ ?>
	// for today, till 19:00:00 hrs date selection can be today. After 19:00:00 hrs start date will be tomorrow.
	$('.datetime').datepicker({
		dateFormat: 'dd-mm-yy',
		minDate: 1,
	});
	<?php }else{ ?>
	$('.datetime').datepicker({
		dateFormat: 'dd-mm-yy',
		minDate: 0,
	});
	<?php } ?>
	$('.datetime').change(function(){
		$('[name="timepicker"]').val('');   // empty timepicker value to remove previous selection
		$('.timeonly').timepicker('remove');  // remove timpicker assigned to input field from DOM
		var date = $(this).val().split("-");  // get selected date
		var new_date = new Date();
		var format_date = date[2]+'-'+date[1]+'-'+date[0];  // change format of date to compare if any other format except default datepicker format
		if(new Date(format_date).getTime() > new Date(new_date).getTime()){   // compare date for assigning timepicker.
			$('.timeonly').timepicker({
				'minTime': '10:00am',
				'maxTime': '10:01pm',
				'timeFormat': 'h:i A'
			});
		}else{
			<?php if( strtotime(date('H:i:s')) < strtotime('19:00:00') ){ ?>
			// if time is less than 19:00:00 hrs timepicker show current time + 3 hrs time.
			Date.prototype.addHours= function(h){
			  var copiedDate = new Date();
			  var check_min_time = copiedDate.getHours();
			  if( parseInt(check_min_time,10) < parseInt(7,10) ){
			    // for any time before 07:00:00 hrs start time will be 10:00:00 hrs.
				  return '10:00am';
		  	 }else{
		  	  // get current time and add 3 hrs.
				  copiedDate.setTime(this.getTime() + (h*60*60*1000)); 
				  var mins = copiedDate.getMinutes();
				  var quarterHours = Math.round(mins/30);
				  // to conserve any minute related updation. as only hours get updated not minutes.
				  if (quarterHours == 2)
				  {
				    copiedDate.setHours(copiedDate.getHours()+1);
				  }
				  var rounded = (quarterHours*30)%60;
				  copiedDate.setMinutes(rounded);
				  return copiedDate;
		  	 }
			}
			// add +3 hours to current time
			$('.timeonly').timepicker({
				'minTime': new Date().addHours(3),
				'maxTime': '10:01pm',
				'timeFormat': 'h:i A'
			});
			<?php }else{ ?>
			// for date selected != today show full range of time.
			$('.timeonly').timepicker({
				'minTime': '10:00am',
				'maxTime': '10:01pm',
				'timeFormat': 'h:i A'
			});
			<?php } ?>
		}
	});
});
