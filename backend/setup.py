\
import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_chameleon', # Or another templating engine if needed, but let's start simple
    'pyramid_debugtoolbar',
    'waitress',
    'cornice', # cornice is good for building REST APIs with Pyramid
    'SQLAlchemy', # Add SQLAlchemy for database interaction
    'psycopg2-binary', # Add PostgreSQL driver
    'passlib', # Add passlib for password hashing
]

setup(name='wardrobe_wise_backend',
      version='0.0',
      description='wardrobe_wise_backend',
      long_description=README + '\\n\\n' + CHANGES,
      classifiers=[
          "Programming Language :: Python",
          "Framework :: Pyramid",
          "Topic :: Internet :: WWW/HTTP",
          "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
      ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(exclude=['tests']),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      entry_points={
          'paste.app_factory': [
              'main = wardrobe_wise_backend:main',
          ],
      },
      )
