
/* Этот код будет работать по современному стандарту ES5
 ========================= */
"use strict";


/* Шпора по JQuery - http://jquery.page2page.ru/tags/ifr.html
 ========================= */
$(document).ready(function() {

	/* ПЕРЕМЕННЫЕ
	 ========================= */
	var __var = (function () {
		return {
			text : value
		}
	}());

});

/* СОЗДАЕМ СВОИ ФУНКЦИИ
 ========================= */
$.fn.nameFucn = function( options ) {
	options = {
		nameOpt : options.nameOpt || 'default value'
	}
};

/* PHP AJAX FORM
 ========================= */
var FormSender = ( function () {

	/* ПОДКЛЮЧАЕМ ПРОСЛУШКУ СОБЫТИЙ
	 ========================= */
	function __setUpListener () {
		$('.class')
			.on('submit', __showResult);
	};

	/* ОБРАБОТКА SUBMIT ФОРМЫ
	 ========================= */
	function __showResult ( event ) {
		event.preventDefault();

		var form = $(this),
				url = '/ajax.php', //mail.php
				dataType = 'JSON',
				defObject = __ajaxForm( form, url, dataType);

		defObject.done( function (answer) {
			console.log('Все пришло');
		});
	};

	/* УНИВЕРСАЛЬНАЯ ФУНКЦИЯ AJAX
	 ========================= */
	function __ajaxForm ( form, url, dataType ) {
		var data = form.serialize(),
				defObject = $.ajax({
						type: 'POST',
						url: url,
						dataType: dataType,
						data: data
					})
					.fail( function () {
						console.log('Проблемы на стороне сервера');
				});

		return defObject;
	};

	/* ВОЗРАЩАЕМ В ГЛОБАЛЬНУЮ ЛБЛАСТЬ ВИДИМОСТИ
	 ========================= */
	return {
		init: function () {
			__setUpListener();
		}
	};
}());
FormSender.init();