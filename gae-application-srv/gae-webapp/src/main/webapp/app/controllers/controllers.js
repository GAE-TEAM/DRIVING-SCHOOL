﻿/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like the break AngularJS controllers into separate files.
  Kept them together here since they're small and it's easier to look through them.
  example. 

  #######################################################################*/

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('CustomersController', function($scope, customersService) {

	// I like to have an init() for controllers that need to perform some
	// initialization. Keeps things in
	// one place...not required though especially in the simple example below
	init();

	function init() {
		$scope.customers = customersService.getCustomers();
	}

	$scope.insertCustomer = function() {
		var firstName = $scope.newCustomer.firstName;
		var lastName = $scope.newCustomer.lastName;
		var city = $scope.newCustomer.city;
		customersService.insertCustomer(firstName, lastName, city);
		$scope.newCustomer.firstName = '';
		$scope.newCustomer.lastName = '';
		$scope.newCustomer.city = '';
	};

	$scope.deleteCustomer = function(id) {
		customersService.deleteCustomer(id);
	};
});

//Define ngDialog
app.controller("ngDialogBox", function($scope){
	
});
// this controller retrieves data from bookingService
app.controller('MainSchedulerCtrl', function($scope) {

	$(document).ready(function() {

		$('#calendar').fullCalendar({
			header : {
				left : 'prev,next today',
				center : 'title',
				right : 'month,agendaWeek,agendaDay'
			},
			defaultDate : '2014-09-12',
			selectable : true,
			selectHelper : true,
			select : function(start, end) {
				$("#dialog-form").dialog("open");
				// var title = prompt('Event Title:');
				// var eventData;
				// if (title) {
				// eventData = {
				// title: title,
				// start: start,
				// end: end
				// };
				// $('#calendar').fullCalendar('renderEvent', eventData, true);
				// // stick? = true
				// }
				// $('#calendar').fullCalendar('unselect');
			},
			editable : true,
			eventLimit : true, // allow "more" link when too many events
			events : [ {
				title : 'All Day Event',
				start : '2014-09-01'
			}, {
				title : 'Long Event',
				start : '2014-09-07',
				end : '2014-09-10'
			}, {
				id : 999,
				title : 'Repeating Event',
				start : '2014-09-09T16:00:00'
			}, {
				id : 999,
				title : 'Repeating Event',
				start : '2014-09-16T16:00:00'
			}, {
				title : 'Conference',
				start : '2014-09-11',
				end : '2014-09-13'
			}, {
				title : 'Meeting',
				start : '2014-09-12T10:30:00',
				end : '2014-09-12T12:30:00'
			}, {
				title : 'Lunch',
				start : '2014-09-12T12:00:00'
			}, {
				title : 'Meeting',
				start : '2014-09-12T14:30:00'
			}, {
				title : 'Happy Hour',
				start : '2014-09-12T17:30:00'
			}, {
				title : 'Dinner',
				start : '2014-09-12T20:00:00'
			}, {
				title : 'Birthday Party',
				start : '2014-09-13T07:00:00'
			}, {
				title : 'Click for Google',
				url : 'http://google.com/',
				start : '2014-09-28'
			} ]
		});

		

	});
	
	
	$("#dialog-form").dialog({
		modal : true,
		autoOpen : false,
		width : 400,
		buttons : [ {
			text : "Ok",
			click : function() {
				$(this).dialog("close");
			}
		}, {
			text : "Cancel",
			click : function() {
				$(this).dialog("close");
			}
		} ]
	});

});

// This controller retrieves data from the customersService and associates it
// with the $scope
// The $scope is bound to the order view
app
		.controller(
				'CustomerOrdersController',
				function($scope, $routeParams, customersService) {
					$scope.customer = {};
					$scope.ordersTotal = 0.00;

					// I like to have an init() for controllers that need to
					// perform some initialization. Keeps things in
					// one place...not required though especially in the simple
					// example below
					init();

					function init() {
						// Grab customerID off of the route
						var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID)
								: 0;
						if (customerID > 0) {
							$scope.customer = customersService
									.getCustomer(customerID);
						}
					}

				});

// This controller retrieves data from the customersService and associates it
// with the $scope
// The $scope is bound to the orders view
app.controller('OrdersController', function($scope, customersService) {
	$scope.customers = [];

	// I like to have an init() for controllers that need to perform some
	// initialization. Keeps things in
	// one place...not required though especially in the simple example below
	init();

	function init() {
		$scope.customers = customersService.getCustomers();
	}
});

app.controller('NavbarController', function($scope, $location) {
	$scope.getClass = function(path) {
		if ($location.path().substr(0, path.length) == path) {
			return true
		} else {
			return false;
		}
	}
});

// This controller is a child controller that will inherit functionality from a
// parent
// It's used to track the orderby parameter and ordersTotal for a customer. Put
// it here rather than duplicating
// setOrder and orderby across multiple controllers.
app.controller('OrderChildController', function($scope) {
	$scope.orderby = 'product';
	$scope.reverse = false;
	$scope.ordersTotal = 0.00;

	init();

	function init() {
		// Calculate grand total
		// Handled at this level so we don't duplicate it across parent
		// controllers
		if ($scope.customer && $scope.customer.orders) {
			var total = 0.00;
			for (var i = 0; i < $scope.customer.orders.length; i++) {
				var order = $scope.customer.orders[i];
				total += order.orderTotal;
			}
			$scope.ordersTotal = total;
		}
	}

	$scope.setOrder = function(orderby) {
		if (orderby === $scope.orderby) {
			$scope.reverse = !$scope.reverse;
		}
		$scope.orderby = orderby;
	};

});
