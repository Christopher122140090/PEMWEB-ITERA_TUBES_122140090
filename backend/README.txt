# WardrobeWise Backend (Pyramid)

This is the backend for the WardrobeWise application, built with Python Pyramid and implementing RESTful API endpoints for product management.

## Setup

1.  Navigate to the `backend` directory.
2.  Install dependencies:
    ```bash
    pip install -e .
    ```

## Running the Application

To run the application, use the following command:

```bash
pserve development.ini
```

## API Endpoints

The API provides the following endpoints:

*   `/products` (GET, POST)
*   `/products/{id}` (GET, PUT, DELETE)
*   `/login` (POST)

Authentication is required for product endpoints. Use the `/login` endpoint with username 'admin' and password 'secret' to obtain a token.

## Testing

To run unit tests and check coverage:

1.  Install testing dependencies:
    ```bash
    pip install pytest pytest-cov
    ```
2.  Run tests with coverage:
    ```bash
    pytest --cov=wardrobe_wise_backend tests/
    ```
