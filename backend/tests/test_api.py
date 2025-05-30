import unittest
from pyramid import testing
from wardrobe_wise_backend.views import api
from wardrobe_wise_backend.models import Product, User, DBSession
from pyramid.testing import DummyRequest

class TestProductAPI(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        # Setup DBSession or mock here if needed

    def tearDown(self):
        testing.tearDown()

    def test_create_product_default_stock(self):
        request = DummyRequest(json_body={'name': 'Test Product', 'price': 100})
        # Call create_product view
        response = api.create_product(request)
        self.assertEqual(request.response.status, 201)
        self.assertEqual(response['name'], 'Test Product')
        self.assertEqual(response['price'], 100)
        self.assertEqual(response['stock'], 0)

    def test_create_product_with_stock(self):
        request = DummyRequest(json_body={'name': 'Test Product 2', 'price': 200, 'stock': 10})
        response = api.create_product(request)
        self.assertEqual(request.response.status, 201)
        self.assertEqual(response['stock'], 10)

    def test_get_products(self):
        request = DummyRequest()
        response = api.get_products(request)
        self.assertIsInstance(response, list)

if __name__ == '__main__':
    unittest.main()
