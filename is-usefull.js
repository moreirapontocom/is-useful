(function($) {
	$.fn.isusefull = function(params) {

		obj = $(this);

		defaults = {
			text	: "This content was usefull?",
			textYes	: "Yes",
			textNo	: "No",
			messages : {
				error : "Error on save your vote",
				success : "Thank you!"
			},
			pluginPath: document.location.hostname + '/is-usefull/'
		};
		var settings = $.extend(true, {}, defaults, params);

		// Page's URL
		obj.append('<div id="isusefull-location" style="display: none;">' + window.location + '</div>');
		var page = obj.find('#isusefull-location').html();

		// Title
		obj.append('<h4>' + settings.text + '</h4>');

		// YES and NO buttons
		var elements  = '<input type="radio" name="isusefull" class="isusefull" value="yes" /> ' + settings.textYes + ' (<span id="count-yes"></span>)<br />';
			elements += '<input type="radio" name="isusefull" class="isusefull" value="no" /> ' + settings.textNo + ' (<span id="count-no"></span>)';
		obj.append('<p id="isusefull-options">' + elements + '</p>');

		// Counters
		obj.append('<span id="isusefull-avg" style="display: none;">0</span></p>');
		calculateAVG(settings,page);

		// Alerts
		obj.append('<p id="isusefull-alerts"></p>');

		obj.find('.isusefull').click(function() {
			saveVote(settings,page,$(this).val());
		});

		return this;
	};

	var saveVote = function(settings,page,selectedOption) {
		$.ajax({
			type: "POST",
			url: "http://localhost/is-usefull/scripts/iu-save-vote.php",
			data: {
				page: page,
				selectedOption: selectedOption
			},
			success: function(data) {
				obj.find('#isusefull-options').remove();
				obj.find('#isusefull-alerts').html( settings.messages.success );
				calculateAVG(settings,page);
			},
			error: function(e) {
				obj.find('#isusefull-alerts').html( settings.messages.error );
			}
		});

		return this;
	};

	var calculateAVG = function(settings,page) {
		$('#isusefull-avg').load('http://localhost/is-usefull/scripts/iu-getAVG.php', { page: page }, function() {
			var count = obj.find('#isusefull-avg').html();
				count = count.split("|");

			obj.find('#count-yes').html(count[0]);
			obj.find('#count-no').html(count[1]);
		});

		return this;
	}

})(jQuery);