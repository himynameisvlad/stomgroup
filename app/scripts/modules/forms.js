export default function () {
  $('.field input')
  .on('focus', function () { $(this).siblings('label').hide(); })
  .on('blur',  function () { if (!$(this).val()) $(this).siblings('label').show(); });

  $.mask.definitions['~'] = '[0-69-9]+';

  $('input[name="phone"]').mask("+7(~99) 999-99-99").keyup(function (e) {
  	let $this = $(this);
  	console.log($this.val().length);
  	if (!$this.val() && (e.which === 55 || e.which === 56)){
  		console.log('yes');
  	}
  });

  //validation
  $.validator.setDefaults({

		errorClass:'form_error',
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().parent());
		},

	});

	$.validator.addMethod('customphone', function (value, element) {
		return this.optional(element) ||
		/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
	}, "Incorrect phone number" );

	$('form').each(function () {

		let $that = $(this);
		let data = {};

		$(this).validate({

			submitHandler: function (form) {

				$.ajax({

					url: ajaxurl,
					type: 'POST',
					data: {
						action: 'mail',
						data: $(form).serialize()
					},
					success: function (response) {
						console.log(response)
						//document.location.href = response;
					},

					error: function (response) {
						alert('Error. Please try later')
					},

				});

			},

			rules: {
				phone: {
					required:true,
					customphone: true,
				},
			},

		});

	});
};
