from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from wardrobe_wise_backend.models import Base, User
from passlib.hash import pbkdf2_sha256

def add_test_user():
    from sqlalchemy.orm import scoped_session
    from wardrobe_wise_backend.models import DBSession

    # Configure engine and session
    from pyramid.paster import get_appsettings
    import os
    ini_path = os.path.join(os.path.dirname(__file__), 'development.ini')
    settings = get_appsettings(ini_path)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    username = "christopher"
    email = "christopher@example.com"
    password = "cronous2407"
    hashed_password = pbkdf2_sha256.hash(password)

    session = DBSession()

    user = session.query(User).filter(User.username == username).first()
    if user:
        print(f"User {username} already exists.")
    else:
        new_user = User(username=username, email=email, password=hashed_password)
        session.add(new_user)
        session.commit()
        print(f"User {username} added successfully.")

if __name__ == "__main__":
    add_test_user()
