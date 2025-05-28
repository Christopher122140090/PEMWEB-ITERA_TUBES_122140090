from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

DBSession = scoped_session(sessionmaker())
Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    price = Column(Integer)
    stock = Column(Integer)

    def to_dict(self):
        """Converts the Product object to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'stock': self.stock,
        }

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(Text, unique=True, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password = Column(Text, nullable=False) # Store hashed passwords!

    def to_dict(self):
        """Converts the User object to a dictionary (excluding password)."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

class InventoryItem(Base):
    __tablename__ = 'inventory'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'quantity': self.quantity,
        }
