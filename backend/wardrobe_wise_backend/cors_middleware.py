def cors_tween_factory(handler, registry):
    def cors_tween(request):
        if request.method == 'OPTIONS':
            response = request.response
            response.status_code = 200
        else:
            response = handler(request)
        origin = request.headers.get('Origin')
        allowed_origins = ['http://localhost:3000', 'http://localhost:3001']
        if origin in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = origin
        else:
            response.headers['Access-Control-Allow-Origin'] = 'null'
        response.headers.update({
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        })
        return response
    return cors_tween
