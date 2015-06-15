$().ready(function(){
	var time = new Date();
	var current_time 	= time.getTime();
	/* Custom time creation for comparison */
	var morning_start 	= time.setHours(parseInt('00',10),parseInt('00',10),parseInt('00',10),0); // 00:00:00 Hrs
	var morning_end 	= time.setHours(parseInt('06',10),parseInt('59',10),parseInt('59',10),0); // 06:59:59 Hrs
	var after_morning 	= time.setHours(parseInt('07',10),parseInt('00',10),parseInt('00',10),0); // 07:00:00 Hrs
	var after_evening 	= time.setHours(parseInt('18',10),parseInt('59',10),parseInt('59',10),0); // 18:59:59 Hrs
	var night_start 	= time.setHours(parseInt('19',10),parseInt('00',10),parseInt('00',10),0); // 19:00:00 Hrs
	var night_end 		= time.setHours(parseInt('23',10),parseInt('59',10),parseInt('59',10),0); // 23:59:59 Hrs
<?php if((int)$minimum_time_interval > 23){ ?>	// for minimum interval as per selected value from previous selection is more than one day
	if( current_time > morning_start && current_time < morning_end ){
		// from 00:00:00 to 06:59:59 Hrs , Date can be same date. Time will increase .
		$('.datetime').datepicker({
			dateFormat: 'yy-mm-dd',
			minDate: 0,
		});
		Date.prototype.addHours= function(h){
			var copiedDate = new Date();
			copiedDate.setTime(this.getTime() + (h*60*60*1000)); 
			var mins = copiedDate.getMinutes();
			var quarterHours = Math.round(mins/30);
			if (quarterHours == 2)
			{
				copiedDate.setHours(copiedDate.getHours()+1);
			}
			var rounded = (quarterHours*30)%60;
			copiedDate.setMinutes(rounded);
			return copiedDate;
		}
		}
		$('.timeonly').timepicker({
			'minTime': new Date().addHours(16), // increase time by 16hrs from now.
			'maxTime': '10:01pm',
			'timeFormat': 'h:i A'
		});
	} else if( current_time > after_morning && current_time < after_evening ){
		// from 07:00:00 to 18:59:59 Hrs , Date will be next day. Time will be static.
		$('.datetime').datepicker({
			dateFormat: 'yy-mm-dd',
			minDate: 1,
		});
		$('.timeonly').timepicker({
			'minTime': '10:00am',
			'maxTime': '10:01pm',
			'timeFormat': 'h:i A'
		});
	} else if( current_time > night_start && current_time < night_end ){
		// from 19:00:00 to 23:59:59 Hrs , Date will be next day. Time will increase .
		$('.datetime').datepicker({
			dateFormat: 'yy-mm-dd',
			minDate: 1,
		});
		Date.prototype.addHours= function(h){
			var copiedDate = new Date();
			copiedDate.setTime(this.getTime() + (h*60*60*1000)); 
			var mins = copiedDate.getMinutes();
			var quarterHours = Math.round(mins/30);
			if (quarterHours == 2)
			{
				copiedDate.setHours(copiedDate.getHours()+1);
			}
			var rounded = (quarterHours*30)%60;
			copiedDate.setMinutes(rounded);
			return copiedDate;
		}
		$('.timeonly').timepicker({
			'minTime': new Date().addHours(16),	// increase time by 16 hrs
			'maxTime': '10:01pm',
			'timeFormat': 'h:i A'
		});
	}
<?php }else{ ?> // for minimum interval as per selected value from previous selection is less than one day
	if( current_time < night_start ){
		// if time is less than 19:00:00 hrs, Date can be same day
		$('.datetime').datepicker({
			dateFormat: 'dd-mm-yy',
			minDate: 0,
		});
	}else{
		// if time is more than 19:00:00 hrs, Date will be next day
		$('.datetime').datepicker({
			dateFormat: 'dd-mm-yy',
			minDate: 1,
		});
	}
	$('.datetime').change(function(){
		$('[name="timepicker"]').val('');		// update timepicker to remove previous value if any
		$('.timeonly').timepicker('remove');		// remove timepicker from dom
		var date = $(this).val().split("-");		// custome time format change for calculation
		var new_date = new Date();		
		var format_date = date[2]+'-'+date[1]+'-'+date[0];
		if(new Date(format_date).getTime() > new Date(new_date).getTime()){	// compare selected date with now.
			// if selected date is more than today then show all time values.
			$('.timeonly').timepicker({
				'minTime': '10:00am',
				'maxTime': '10:01pm',
				'timeFormat': 'h:i A'
			});
		}else{
			// if selected date is today
			if( current_time < night_start ){
				// if current time is less than 19:00:00 hrs then time will be +3 hrs from now.
				Date.prototype.addHours= function(h){
				var copiedDate = new Date();
				var check_min_time = copiedDate.getHours();
				if( parseInt(check_min_time,10) < parseInt(5,10) ){	// for time less than 05:00:00 hrs
					return '10:00am';
				}else{	// for time more than 05:00:00 hrs, time range start from now + 3hrs.
					copiedDate.setTime(this.getTime() + (h*60*60*1000)); 
					var mins = copiedDate.getMinutes();
					var quarterHours = Math.round(mins/30);
					if (quarterHours == 2)
					{
					copiedDate.setHours(copiedDate.getHours()+1);
					}
					var rounded = (quarterHours*30)%60;
					copiedDate.setMinutes(rounded);
					return copiedDate;
				}
				}
				$('.timeonly').timepicker({
					'minTime': new Date().addHours(3),
					'maxTime': '10:01pm',
					'timeFormat': 'h:i A'
				});
			}else{
				// if time is more than 19:00:00 hrs time range show all.
				$('.timeonly').timepicker({
					'minTime': '10:00am',
					'maxTime': '10:01pm',
					'timeFormat': 'h:i A'
				});
			}
		}
	});
<?php } ?>
});
