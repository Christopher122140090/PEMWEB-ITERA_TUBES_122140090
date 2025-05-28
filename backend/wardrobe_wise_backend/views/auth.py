from pyramid.security import remember, forget
from pyramid.response import Response
from pyramid.httpexceptions import HTTPFound
from ..models import DBSession, User
from passlib.hash import pbkdf2_sha256
import json

def login(request):
    print('LOGIN VIEW CALLED')  # DEBUG: pastikan view ini benar-benar di-scan
    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return Response(body=json.dumps({'error': 'Username and password required'}).encode('utf-8'), status=400)

        user = DBSession.query(User).filter(User.username == username).first()
        if user and pbkdf2_sha256.verify(password, user.password):
            headers = remember(request, user.id)
            return Response(body=json.dumps({'message': 'Login successful'}).encode('utf-8'), headers=headers)
        else:
            return Response(body=json.dumps({'error': 'Invalid username or password'}).encode('utf-8'), status=401)
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        error_message = f"{str(e)}\n{error_trace}"
        return Response(body=json.dumps({'error': error_message}).encode('utf-8'), status=500)

def logout(request):
    headers = forget(request)
    return HTTPFound(location='/', headers=headers)

def login_options(request):
    # Agar preflight CORS untuk /login selalu sukses
    response = Response()
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
    })
    return response

def logout_options(request):
    response = Response()
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
    })
    return response
