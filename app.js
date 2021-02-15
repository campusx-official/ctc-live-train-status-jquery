$(document).ready(function(){

	let trainNo,journeyDate;

	$('#live_status_btn').click(function(){

		trainNo = $('#train_no').val();
		//journeyDate = $('#journey_date').val();

		//alert(typeof journeyDate);
		//console.log(trainNo);
		
		// create an AJAX request
		$.ajax({
			url:"https://indianrailapi.com/api/v2/livetrainstatus/apikey/30c382602bfa67c8a7c580e6cfe2becb/trainnumber/" + trainNo + "/date/20210215",
			success:function(data){
				console.log(data);
				let station_name = data.CurrentStation.StationName;
				let arrival = data.CurrentStation.ActualArrival;
				let delay = data.CurrentStation.DelayInArrival;

				routeArr = data.TrainRoute;

				let sample = "";

				for(let i=0;i<routeArr.length;i++){
					sample = sample +  `
					<tr>
						<td>${routeArr[i].StationName}</td>
						<td>${routeArr[i].ActualArrival}</td>
						<td>${routeArr[i].ActualDeparture}</td>
						<td>${routeArr[i].DelayInArrival}</td>
					</tr>
					`;
				}

				$('#current_status').html(`
					<h4>
						Crossed 
						<span class="text-danger">
							${station_name}
						</span>
						at ${arrival}
					</h4>
					<p>Delayed by ${delay}</p>
					`);

				$('#status_table').html(`
					<table class="table">
						<thead>
							<tr>
								<th>Station</th>
								<th>Arrival Status</th>
								<th>Departure Status</th>
								<th>Delay</th>
							</tr>
						</thead>
						<tbody>
							${sample}
						</tbody>
					</table>
					`);
			},
			error:function(err){
				alert("Some error occured");
			}
		})
	})
})