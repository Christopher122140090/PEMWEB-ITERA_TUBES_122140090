from pyramid.config import Configurator
from pyramid.response import Response

def hello_world_view(request):
    return Response('Hello from Pyramid backend!')

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_view(hello_world_view, route_name='home')
    
    # Add API routes
    config.add_route('api_products', '/api/products')
    config.add_route('api_product_by_id', '/api/products/{id}') # Add this line

    config.scan('wardrobe_wise_backend.views') # Scan the views directory
    return config.make_wsgi_app()
