// Dialog Box
$("#dialog-form").dialog(
		{
			modal : true,
			autoOpen : false,
			width : 300,
			open : function(event, ui) {
				jQuery('.ui-dialog-titlebar-close').removeClass(
						"ui-dialog-titlebar-close").html('<span>x</span>');
			},
			buttons : [
					{
						text : "Ok",
						click : function() {

							if ($("#lastname").val() != ""
									&& $('#name').val() != ""
									&& $('#startdatepicker').val() != ""
									&& $('#enddatepicker').val() != "") {

								var startTime = $("#startdatepicker").val();
								var endTime = $("#enddatepicker").val();

								var start = Window.start.time(startTime);
								var end = Window.end.time(endTime);
								var title = "Creneau";

								eventData = {
									title : title,
									start : start,
									end : end
								// allDay : allDay
								// editable: false
								};
								$('#calendar').fullCalendar('renderEvent',
										eventData, true); //
								// stick? = true

								$(this).dialog("close");
							}

						}
					}, {
						text : "Annuler",
						click : function() {
							$(this).dialog("close");
						}
					} ]
		});

// dialog box to delete events
$('#dialog-delete').dialog(
		{
			modal : true,
			autoOpen : false,
			width : 300,
			open : function(event, ui) {
				jQuery('.ui-dialog-titlebar-close').removeClass(
						"ui-dialog-titlebar-close").html('<span>x</span>');
			},
			buttons : [ {
				text : 'Ok',
				click : function() {

					var calEvent = Window.calEvent;
					console.log(calEvent.id);
					$('#calendar').fullCalendar('removeEvents', calEvent.id);
					$(this).dialog('close');

				}

			}, {
				text : 'Annuler',
				click : function() {
					$(this).dialog('close');

				}

			}

			]

		});
// start date picker
$("#startdatepicker").datetimepicker({
	datepicker : false,
	format : 'H:i'
});

// end date picker
$("#enddatepicker").datetimepicker({
	datepicker : false,
	format : 'H:i'
});
