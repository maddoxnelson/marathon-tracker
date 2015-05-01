(function($){

	var runs = {
		clickEvents : function () {
			$('.run').on('click', function () {
				console.log('slidedown')
				console.log('drawMap')
				console.log('plot run')
			});
		},
		getRuns : function () {
			/* hits the flask api and returns json list of archived runs, including
				google spreadsheet associated with the run
				various title information associated with the run
				if it exists, the base route for the run
			*/
			var that = this;

			$.get('/archived_runs.json', function (data) {
				var runs = data.objects;
				var html = "";

				for (var item in runs) {
					var run = runs[item];

					html += '<div class="run">' + run.run_title + '</div>';

				}

				$('.archived-runs').html(html);

				that.clickEvents();
			});
		},
		runEvents : function () {
			this.getRuns();
		}
	};

	var init = function () {
		runs.runEvents();
	};

	init();
})(jQuery);