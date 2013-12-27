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
		obj.append('<div id="isusefull-location" style="display:none;">' + settings.pluginPath + '</div>');
		var page = obj.find('#isusefull-location').html();

		// Title
		obj.append('<h4>' + settings.text + '</h4>');

		// YES and NO buttons
		var elements  = '<input type="radio" name="isusefull" class="isusefull" value="yes" /> ' + settings.textYes + '<br />';
			elements += '<input type="radio" name="isusefull" class="isusefull" value="no" /> ' + settings.textNo;
		obj.append('<p id="isusefull-options">' + elements + '</p>');

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
			url: settings.pluginPath + "scripts/iu-save-vote.php",
			data: {
				page: page,
				selectedOption: selectedOption
			},
			success: function(data) {
				obj.find('#isusefull-options').remove();
				obj.find('#isusefull-alerts').html( settings.messages.success );
			},
			error: function(e) {
				obj.find('#isusefull-alerts').html( settings.messages.error );
			}
		});

		return this;
	};

})(jQuery);