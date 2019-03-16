function saveUserDetails(username, password, notes) {
  var url = 'http://localhost:3000/users/' + username;
  var data = {
    "notes": notes,
    "pass": password
  }
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}
export default saveUserDetails
