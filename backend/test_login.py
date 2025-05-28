import requests

def test_login():
    url = "http://localhost:6543/login"
    data = {
        "username": "christopher",
        "password": "cronous2407"
    }
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)

if __name__ == "__main__":
    test_login()
