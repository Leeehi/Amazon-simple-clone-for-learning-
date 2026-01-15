const xhr = new XMLHttpRequest();

xhr.addEventListener( 'load', () => {
  console.log(xhr.response);
  //console.log(JSON.parse(xhr.response));
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();