#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔗 SUPABASE SERVICE - PANEL ADMIN
🌐 Servicio para conectar con Supabase desde el panel de administración
"""

import os
import requests
from datetime import datetime

class SupabaseService:
    def __init__(self):
        self.supabase_url = os.getenv('SUPABASE_URL', 'https://zgqrhzuhrwudckwesybg.supabase.co')
        self.supabase_key = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncXJoenVocnd1ZGNrd2VzeWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTI3OTgsImV4cCI6MjA3MTM2ODc5OH0.lUVK99zmOYD7bNTxilJZWHTmYPfZF5YeMJDVUaJ-FsQ')
        self.headers = {
            'apikey': self.supabase_key,
            'Authorization': f'Bearer {self.supabase_key}',
            'Content-Type': 'application/json'
        }
        print(f"✅ Supabase Service inicializado: {self.supabase_url}")

    def get_orders(self):
        """Obtener todas las órdenes"""
        try:
            response = requests.get(
                f'{self.supabase_url}/rest/v1/orders',
                headers=self.headers
            )
            return response.json() if response.status_code == 200 else []
        except Exception as e:
            print(f"Error getting orders: {e}")
            return []

    def get_users(self):
        """Obtener todos los usuarios"""
        try:
            response = requests.get(
                f'{self.supabase_url}/rest/v1/users',
                headers=self.headers
            )
            return response.json() if response.status_code == 200 else []
        except Exception as e:
            print(f"Error getting users: {e}")
            return []

    def get_products(self):
        """Obtener todos los productos"""
        try:
            response = requests.get(
                f'{self.supabase_url}/rest/v1/products',
                headers=self.headers
            )
            return response.json() if response.status_code == 200 else []
        except Exception as e:
            print(f"Error getting products: {e}")
            return []

    def get_banners(self):
        """Obtener todos los banners"""
        try:
            response = requests.get(
                f'{self.supabase_url}/rest/v1/banners',
                headers=self.headers
            )
            return response.json() if response.status_code == 200 else []
        except Exception as e:
            print(f"Error getting banners: {e}")
            return []

    def create_product(self, product_data):
        """Crear un nuevo producto"""
        try:
            response = requests.post(
                f'{self.supabase_url}/rest/v1/products',
                headers=self.headers,
                json=product_data
            )
            return response.json() if response.status_code in [200, 201] else None
        except Exception as e:
            print(f"Error creating product: {e}")
            return None

    def update_product(self, product_id, product_data):
        """Actualizar un producto"""
        try:
            response = requests.patch(
                f'{self.supabase_url}/rest/v1/products?id=eq.{product_id}',
                headers=self.headers,
                json=product_data
            )
            return response.json() if response.status_code == 200 else None
        except Exception as e:
            print(f"Error updating product: {e}")
            return None

    def delete_product(self, product_id):
        """Eliminar un producto"""
        try:
            response = requests.delete(
                f'{self.supabase_url}/rest/v1/products?id=eq.{product_id}',
                headers=self.headers
            )
            return response.status_code in [200, 204]
        except Exception as e:
            print(f"Error deleting product: {e}")
            return False

    def create_banner(self, banner_data):
        """Crear un nuevo banner"""
        try:
            response = requests.post(
                f'{self.supabase_url}/rest/v1/banners',
                headers=self.headers,
                json=banner_data
            )
            return response.json() if response.status_code in [200, 201] else None
        except Exception as e:
            print(f"Error creating banner: {e}")
            return None

    def update_banner(self, banner_id, banner_data):
        """Actualizar un banner"""
        try:
            response = requests.patch(
                f'{self.supabase_url}/rest/v1/banners?id=eq.{banner_id}',
                headers=self.headers,
                json=banner_data
            )
            return response.json() if response.status_code == 200 else None
        except Exception as e:
            print(f"Error updating banner: {e}")
            return None

    def delete_banner(self, banner_id):
        """Eliminar un banner"""
        try:
            response = requests.delete(
                f'{self.supabase_url}/rest/v1/banners?id=eq.{banner_id}',
                headers=self.headers
            )
            return response.status_code in [200, 204]
        except Exception as e:
            print(f"Error deleting banner: {e}")
            return False
