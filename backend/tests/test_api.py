import unittest
from pyramid import testing
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from wardrobe_wise_backend.models import Base, DBSession, User, Product
from wardrobe_wise_backend.views import api

class ProductApiTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        # Setup in-memory SQLite database for testing
        self.engine = create_engine('sqlite:///:memory:')
        Base.metadata.create_all(self.engine)
        self.session_factory = sessionmaker(bind=self.engine)
        DBSession.configure(bind=self.engine)
        self.session = DBSession()

    def tearDown(self):
        self.session.close()
        DBSession.remove()
        Base.metadata.drop_all(self.engine)
        testing.tearDown()

    def test_get_products(self):
        from wardrobe_wise_backend.views.api import get_products
        # Add sample products to the database
        product1 = Product(id=1, name='Product A', price=10000, stock=50)
        product2 = Product(id=2, name='Product B', price=15000, stock=30)
        self.session.add_all([product1, product2])
        self.session.commit()

        request = testing.DummyRequest()
        response = get_products(request)
        self.assertEqual(response, [
            {'id': 1, 'name': 'Product A', 'price': 10000, 'stock': 50},
            {'id': 2, 'name': 'Product B', 'price': 15000, 'stock': 30},
        ])

    # Add more tests for create, get_product, update, and delete
    # Remember to consider authentication in your tests

    def test_create_user(self):
        request = testing.DummyRequest(json_body={
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        })
        request.method = 'POST'
        response = api.create_user(request)
        self.assertEqual(request.response.status_code, 201)
        self.assertEqual(response['username'], 'testuser')
        self.assertEqual(response['email'], 'test@example.com')

    def test_get_user_by_id(self):
        user = User(username='user1', email='user1@example.com', password='hashed')
        self.session.add(user)
        self.session.commit()

        request = testing.DummyRequest(matchdict={'id': str(user.id)})
        response = api.get_user_by_id(request)
        self.assertEqual(response['username'], 'user1')
        self.assertEqual(response['email'], 'user1@example.com')

    def test_update_user(self):
        user = User(username='user2', email='user2@example.com', password='hashed')
        self.session.add(user)
        self.session.commit()

        request = testing.DummyRequest(matchdict={'id': str(user.id)}, json_body={
            'username': 'updateduser',
            'email': 'updated@example.com',
            'password': 'newpassword'
        })
        response = api.update_user(request)
        self.assertEqual(response['username'], 'updateduser')
        self.assertEqual(response['email'], 'updated@example.com')

    def test_delete_user(self):
        user = User(username='user3', email='user3@example.com', password='hashed')
        self.session.add(user)
        self.session.commit()

        request = testing.DummyRequest(matchdict={'id': str(user.id)})
        response = api.delete_user(request)
        self.assertIsNone(response)
        self.assertEqual(request.response.status_code, 204)

    def test_get_user_by_id_not_found(self):
        request = testing.DummyRequest(matchdict={'id': '9999'})
        response = api.get_user_by_id(request)
        self.assertEqual(request.response.status_code, 404)
        self.assertEqual(response['message'], 'User not found')

    def test_update_user_not_found(self):
        request = testing.DummyRequest(matchdict={'id': '9999'}, json_body={})
        response = api.update_user(request)
        self.assertEqual(request.response.status_code, 404)
        self.assertEqual(response['message'], 'User not found')

    def test_delete_user_not_found(self):
        request = testing.DummyRequest(matchdict={'id': '9999'})
        response = api.delete_user(request)
        self.assertEqual(request.response.status_code, 404)
        self.assertEqual(response['message'], 'User not found')
