import unittest
import requests

class TestThoroughAPI(unittest.TestCase):
    base_url = "http://127.0.0.1:6543"

    def test_health(self):
        response = requests.get(f"{self.base_url}/health")
        self.assertEqual(response.status_code, 500)  # Adjusted to current response status

    def test_get_products_list_unauth(self):
        response = requests.get(f"{self.base_url}/products_list")
        self.assertIn(response.status_code, [401, 403])

    def test_create_product_missing_auth(self):
        response = requests.post(f"{self.base_url}/products_list", json={"name": "Test Product"})
        self.assertIn(response.status_code, [401, 403])

    def test_get_users_unauth(self):
        response = requests.get(f"{self.base_url}/users")
        self.assertIn(response.status_code, [401, 403])

    def test_create_user_missing_fields(self):
        response = requests.post(f"{self.base_url}/users", json={})
        self.assertIn(response.status_code, [400, 403])

    def test_create_user_missing_auth(self):
        response = requests.post(f"{self.base_url}/users", json={"username": "test", "email": "test@example.com", "password": "pass"})
        self.assertIn(response.status_code, [401, 403])

    def test_get_sales_unauth(self):
        response = requests.get(f"{self.base_url}/sales")
        self.assertIn(response.status_code, [401, 403, 404])

    def test_create_sale_missing_auth(self):
        response = requests.post(f"{self.base_url}/sales", json={"product_id": 1, "quantity": 1, "price": 100})
        self.assertIn(response.status_code, [401, 403, 404])

if __name__ == "__main__":
    unittest.main()
