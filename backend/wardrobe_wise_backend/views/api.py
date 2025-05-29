from cornice import Service
from pyramid.httpexceptions import HTTPNotFound, HTTPNoContent
from ..models import DBSession, Product, User, InventoryItem # Import DBSession, Product, User, InventoryItem model
from passlib.hash import pbkdf2_sha256
from pyramid.response import Response
from pyramid.view import view_config
import logging

products_service = Service('products', '/products')
users_service = Service('users', '/users', permission='authenticated') # Add permission
health_service = Service('health', '/health')
inventory_service = Service('inventory', '/inventory')

logger = logging.getLogger(__name__)

@products_service.get(permission='authenticated')
def get_products(request):
    """Returns a list of all products from the database."""
    products = DBSession.query(Product).all()
    return [product.to_dict() for product in products]

@inventory_service.get(permission='authenticated')
def get_inventory(request):
    """Returns a list of all inventory items from the database."""
    inventory_items = DBSession.query(InventoryItem).all()
    return [item.to_dict() for item in inventory_items]

@health_service.get()
def health_check(request):
    try:
        # Simple query to check DB connection
        DBSession.execute('SELECT 1')
        return Response('Database connection OK', status=200)
    except Exception as e:
        return Response(f'Database connection failed: {e}', status=500)

@view_config(route_name='home', renderer='json')
def home_view(request):
    return {'message': 'Welcome to the Wardrobe Wise Backend API'}

# Endpoint Pyramid untuk tambah produk
@products_service.post(permission='authenticated')
def create_product(request):
    data = request.json_body
    new_product = Product(
        name=data.get('name'),
        price=data.get('price'),
        stock=data.get('stock'),
    )
    DBSession.add(new_product)
    DBSession.flush()
    DBSession.commit()
    request.response.status = 201
    return new_product.to_dict()

def update_product_pyramid(request):
    product_id = int(request.matchdict['id'])
    data = request.json_body
    product = DBSession.query(Product).filter(Product.id == product_id).first()
    if product:
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        DBSession.flush()
        DBSession.commit()
        return product.to_dict()
    logger.error(f"Product with id {product_id} not found for update.")
    request.response.status = 404
    return {'message': 'Product not found'}

def delete_product_pyramid(request):
    product_id = int(request.matchdict['id'])
    product = DBSession.query(Product).filter(Product.id == product_id).first()
    if product:
        DBSession.delete(product)
        DBSession.flush()
        DBSession.commit()
        request.response.status = 204
        return None
    logger.error(f"Product with id {product_id} not found for delete.")
    request.response.status = 404
    return {'message': 'Product not found'}

@users_service.get()
def get_users(request):
    # Query users from the database
    users = DBSession.query(User).all()
    return [user.to_dict() for user in users]

@users_service.post()
def create_user(request):
    data = request.json_body
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        request.response.status = 400
        return {'message': 'Username, email, and password are required'}

    # Hash the password
    hashed_password = pbkdf2_sha256.hash(password)

    # Create a new user instance
    new_user = User(username=username, email=email, password=hashed_password)

    try:
        # Add the user to the session and commit to the database
        DBSession.add(new_user)
        DBSession.flush() # Assign an ID to the new user
        request.response.status = 201
        return new_user.to_dict()
    except Exception as e:
        DBSession.rollback()
        request.response.status = 400
        return {'message': f'Error creating user: {e}'}

# Hapus semua decorator dengan pattern='/{id}'
def get_user_by_id(request):
    user_id = int(request.matchdict['id'])
    user = DBSession.query(User).filter(User.id == user_id).first()
    if user:
        return user.to_dict()
    else:
        request.response.status = 404
        return {'message': 'User not found'}

def update_user(request):
    user_id = int(request.matchdict['id'])
    user = DBSession.query(User).filter(User.id == user_id).first()

    if not user:
        request.response.status = 404
        return {'message': 'User not found'}

    data = request.json_body
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        # Hash the new password
        user.password = pbkdf2_sha256.hash(data['password'])

    try:
        DBSession.flush()
        return user.to_dict()
    except Exception as e:
        DBSession.rollback()
        request.response.status = 400
        return {'message': f'Error updating user: {e}'}

def delete_user(request):
    user_id = int(request.matchdict['id'])
    user = DBSession.query(User).filter(User.id == user_id).first()

    if not user:
        request.response.status = 404
        return {'message': 'User not found'}

    try:
        DBSession.delete(user)
        DBSession.flush()
        request.response.status = 204 # No Content on successful deletion
        return None
    except Exception as e:
        DBSession.rollback()
        request.response.status = 400
        return {'message': f'Error deleting user: {e}'}

def get_product_pyramid(request):
    product_id = int(request.matchdict['id'])
    product = DBSession.query(Product).filter(Product.id == product_id).first()
    if product:
        return product.to_dict()
    request.response.status = 404
    return {'message': 'Product not found'}
