import requests

BASE_URL = "http://localhost:6543"

def test_login_success():
    url = f"{BASE_URL}/login"
    data = {
        "username": "christopher",
        "password": "cronous2407"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected 200 OK got {response.status_code}"
    print("test_login_success passed")

def test_login_wrong_password():
    url = f"{BASE_URL}/login"
    data = {
        "username": "christopher",
        "password": "wrongpassword"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 401, f"Expected 401 Unauthorized, got {response.status_code}"
    print("test_login_wrong_password passed")

def test_login_nonexistent_user():
    url = f"{BASE_URL}/login"
    data = {
        "username": "nonexistentuser",
        "password": "any"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 401, f"Expected 401 Unauthorized, got {response.status_code}"
    print("test_login_nonexistent_user passed")

def test_login_missing_fields():
    url = f"{BASE_URL}/login"
    data = {}
    response = requests.post(url, json=data)
    assert response.status_code == 400, f"Expected 400 Bad Request, got {response.status_code}"
    print("test_login_missing_fields passed")

if __name__ == "__main__":
    test_login_success()
    test_login_wrong_password()
    test_login_nonexistent_user()
    test_login_missing_fields()
    print("All login tests passed.")
