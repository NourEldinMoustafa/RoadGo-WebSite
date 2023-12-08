document.getElementsByTagName('form')[0].addEventListener('submit', function (event) {
    event.preventDefault();
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    console.log(username, password)
    fetch(`http://nashed123-001-site1.anytempurl.com/api/User`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!checkLogin(data)) {
                document.getElementById('password').focus();
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    function checkLogin(users) {
        users.forEach(element => {
            if (element['userName'] === username && element['password'] === password) {

                location.href = 'dashboard.html';
                
            }
        });
        return false;

    }
});