window.onload = function(){
	const btn1 = document.getElementById('btn1');
	const inputs = document.getElementsByTagName('input');

	btn1.addEventListener('click', function() {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/sign_in');
		// create object with user data
		let userData = {
			username: inputs[0].value,
			password: inputs[1].value
		};
		// Set the content type
		xhr.setRequestHeader('Content-Type', 'application/json');
		// send data
		xhr.send(JSON.stringify(userData));

		xhr.onload = function() {
			alert(this.responseText);
			if (this.responseText !== 'Login error'){
				$('#authorization').remove();
			}
		};

		xhr.onerror = function() {
			alert('server error!');
		}
	});

	const btn2 = document.getElementById('btn2');

	btn2.onclick = function() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/logout');
		xhr.send();
		xhr.onload = function() {
			alert(this.responseText);
		};
	};
}