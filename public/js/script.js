$(()=> {
console.log('script loaded')
let currentInput = '';

$('#search').on('click', (e)=> {
	e.preventDefault();
	console.log('clicked')
	const lat = $('#lat-input').val();
	const long = $('#long-input').val();
	console.log(lat, long);
	callAPI(lat, long)
});

const callAPI = (lat, long) => {
	console.log('inside call api with values ', lat, long);
	const myData = {};
	$.ajax({
		url: 'http://localhost:3000/spa/search',
		// url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyBjBE7uURX_dTn-izB4RVxGwbsO-99ii54`,
		type: 'POST',
		data: {
			lat: lat,
			long: long
		},
		success: data => {
			console.log('!!!!! data back from my backend calling google',data);
			renderSpas(data);
			// myData.data = data;
		},
		error: err => {
			console.log('error', err)	
		}
	})
}

const renderSpas = (spas) => {
	console.log('inside renderSpas', spas);
	const results = $('.results').empty();
	spas.forEach(spa => {
		// create the container
		const container = $('<div>').addClass('individual-container')
		// console.log('this is the SPA', spa)
	  let name = $('<h3>').text(spa.name).appendTo(container);
	  let vicinity = $('<h3>').html(spa.vicinity).appendTo(container);
	 //  let anchor = $('<h3>').text(spa.photos.html_attributions
		// ).appendTo(container);

      let image = spa.icon ? spa.icon : 'https://c1.staticflickr.com/9/8411/8706485644_dcc5d37b5b_b.jpg';
      let img = $('<img>',{
        src: image,
        class: 'show-image'
      }).appendTo(container);
      $('<br/>').appendTo(container);
      let button = $('<button>Save</button>')
      button.on('click', createSpa);
      button.appendTo(container); 
      container.appendTo(results);
	})
}


const createSpa = (event) => {
	console.log('inside createSpa ');
	let theInfo = event.target.parentNode.children;
	const newSpa = {
		"name": theInfo[0].innerText,
		"address": theInfo[1].innerText,
	}
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/spa',
		// dataType: "window.location.reload()",
		data: newSpa,
	success: newSpa => {
		console.log('spa inserted correctly', newSpa);
		},
	error: err => {
		console.log('error', err)
			}	
		})
	}



$('.deleteBtn').on('click', function(e) {
	console.log("hi");
	e.preventDefault();
	console.log('delete button clicked')

	const spaId = e.target.id;
	console.log(spaId);
	deleteSpa(spaId);

	const deleteSpa = (spaId) => {
	
	$.ajax({
		type: 'DELETE',
		url: `/spa/${spaId}`,
		success: favoriteSpas => {
			console.log('spa deleted correctly');
			window.location.reload();
			},
		error: err => {
			console.log('error', err)
				}	
			});
		}

	})
})

