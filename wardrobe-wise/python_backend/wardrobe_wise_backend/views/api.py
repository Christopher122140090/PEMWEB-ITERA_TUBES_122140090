from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPNoContent

# Dummy data for now
products = [
    {'id': 1, 'name': 'Product A', 'price': 10000, 'stock': 50},
    {'id': 2, 'name': 'Product B', 'price': 15000, 'stock': 30},
]

@view_config(route_name='api_products', request_method='GET', renderer='json')
def get_products(request):
    return products

@view_config(route_name='api_products', request_method='POST', renderer='json')
def create_product(request):
    data = request.json_body
    new_product = {
        'id': len(products) + 1, # Simple ID generation
        'name': data.get('name'),
        'price': data.get('price'),
        'stock': data.get('stock'),
    }
    products.append(new_product)
    request.response.status = 201
    return new_product

@view_config(route_name='api_product_by_id', request_method='GET', renderer='json')
def get_product_by_id(request):
    product_id = int(request.matchdict['id'])
    for product in products:
        if product['id'] == product_id:
            return product
    raise HTTPNotFound()

@view_config(route_name='api_product_by_id', request_method='PUT', renderer='json')
def update_product(request):
    product_id = int(request.matchdict['id'])
    data = request.json_body
    for product in products:
        if product['id'] == product_id:
            product.update({
                'name': data.get('name', product['name']),
                'price': data.get('price', product['price']),
                'stock': data.get('stock', product['stock']),
            })
            return product
    raise HTTPNotFound()

@view_config(route_name='api_product_by_id', request_method='DELETE')
def delete_product(request):
    product_id = int(request.matchdict['id'])
    global products
    initial_len = len(products)
    products = [product for product in products if product['id'] != product_id]
    if len(products) < initial_len:
        raise HTTPNoContent()
    raise HTTPNotFound()
