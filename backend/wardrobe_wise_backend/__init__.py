from pyramid.config import Configurator
from pyramid.response import Response
from cornice import Service
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from sqlalchemy import engine_from_config
from .models import DBSession, Base, User # Import User model
from passlib.hash import pbkdf2_sha256 # Import password hashing utility
from pyramid.view import view_config
from . import cors_middleware
from .views import auth  # pastikan view login/logout terdaftar
import logging
from pyramid.security import Allow, Authenticated

class RootFactory:
    __acl__ = [
        (Allow, Authenticated, 'authenticated'),
    ]
    def __init__(self, request):
        pass

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """ 
    config = Configurator(settings=settings, root_factory=RootFactory)

    # Configure SQLAlchemy
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    # Basic Authentication Setup
    authn_policy = AuthTktAuthenticationPolicy(
        'somesecret', # Replace with a real secret
        hashalg='sha512',
        timeout=86400, # Token valid for 24 hours
        reissue_time=3600, # Reissue token after 1 hour
        debug=True # Set to False in production
    )
    authz_policy = ACLAuthorizationPolicy()

    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)

    # Add CORS tween middleware
    config.add_tween('wardrobe_wise_backend.cors_middleware.cors_tween_factory')

    # Add CORS headers for frontend localhost:3000
    def add_cors_headers_response(event):
        response = event.response
        response.headers.update({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        })

    config.add_subscriber(add_cors_headers_response, 'pyramid.events.NewResponse')

    # Setup logging for error tracking
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger('wardrobe_wise_backend')

    def log_request_errors(event):
        request = event.request
        if request.exception:
            logger.error(f"Exception occurred: {request.exception}", exc_info=True)

    config.add_subscriber(log_request_errors, 'pyramid.events.NewRequest')

    # Pastikan Cornice service terdaftar
    config.include('cornice')

    # Add route for root URL to avoid 404
    config.add_route('home', '/')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    from .views import auth as auth_views
    config.add_view(auth_views.login, route_name='login', renderer='json', request_method='POST')
    config.add_view(auth_views.login_options, route_name='login', request_method='OPTIONS')
    config.add_view(auth_views.logout, route_name='logout')
    config.add_view(auth_views.logout_options, route_name='logout', request_method='OPTIONS')
    # Add Cornice services for /products and /inventory
    from .views import api as api_views
    # Register parameterized product routes
    config.add_route('get_product', '/products/{id}')
    config.add_view(api_views.get_product, route_name='get_product', renderer='json', request_method='GET', permission='authenticated')
    config.add_route('update_product', '/products/{id}')
    config.add_view(api_views.update_product, route_name='update_product', renderer='json', request_method='PUT', permission='authenticated')
    config.add_route('delete_product', '/products/{id}')
    config.add_view(api_views.delete_product, route_name='delete_product', renderer='json', request_method='DELETE', permission='authenticated')
    # Register parameterized user routes
    config.add_route('get_user', '/users/{id}')
    config.add_view(api_views.get_user_by_id, route_name='get_user', renderer='json', request_method='GET', permission='authenticated')
    config.add_route('update_user', '/users/{id}')
    config.add_view(api_views.update_user, route_name='update_user', renderer='json', request_method='PUT', permission='authenticated')
    config.add_route('delete_user', '/users/{id}')
    config.add_view(api_views.delete_user, route_name='delete_user', renderer='json', request_method='DELETE', permission='authenticated')
    # Scan views folder secara eksplisit agar semua endpoint (termasuk /login) terdaftar
    config.scan('wardrobe_wise_backend.views')
    return config.make_wsgi_app()

@view_config(route_name='home', renderer='json')
def home_view(request):
    return {'message': 'Welcome to the Wardrobe Wise Backend API'}
