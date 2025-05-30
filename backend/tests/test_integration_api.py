import unittest
import requests

class TestIntegrationAPI(unittest.TestCase):
    base_url = "http://127.0.0.1:6543"

    def test_login_and_get_products(self):
        # Example integration test: login and then get products list
        login_data = {"username": "christopher", "password": "cronous2407"}
        login_response = requests.post(f"{self.base_url}/login", json=login_data)
        self.assertEqual(login_response.status_code, 200)
        token = login_response.json().get("token")
        self.assertIsNotNone(token)

        headers = {"Authorization": f"Bearer {token}"}
        products_response = requests.get(f"{self.base_url}/products_list", headers=headers)
        self.assertEqual(products_response.status_code, 200)
        self.assertIsInstance(products_response.json(), list)

    # Add more integration tests as needed for other endpoints

if __name__ == "__main__":
    unittest.main()
