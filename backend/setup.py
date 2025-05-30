from setuptools import setup, find_packages

setup(
    name='wardrobe_wise_backend',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'pyramid',
        'cornice',
        'sqlalchemy',
        'passlib',
        'waitress',
    ],
    entry_points={
        'paste.app_factory': [
            'main = wardrobe_wise_backend:main',
        ],
    },
)
