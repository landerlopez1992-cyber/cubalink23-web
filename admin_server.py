#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🌐 CUBALINK23 WEB - PANEL DE ADMINISTRACIÓN
🔒 Panel de administración independiente para el sitio web
🚀 Sin afectar el backend de Duffel (vuelos)
"""

import os
import json
import requests
from flask import Flask, request, jsonify, session, render_template
from flask_cors import CORS
from datetime import datetime
import time

app = Flask(__name__)
CORS(app)

# Configuración de sesión para autenticación
app.secret_key = os.environ.get('SECRET_KEY', 'cubalink23-admin-secret-key-2024')

# Importar servicios necesarios
try:
    from supabase_service import SupabaseService
    supabase_service = SupabaseService()
    print("✅ Servicio de Supabase importado correctamente")
except ImportError as e:
    print("⚠️ No se pudo importar Supabase service: {}".format(e))
    supabase_service = None

# Importar el panel de administración
from admin_routes import admin
from auth_routes import auth
app.register_blueprint(admin)
app.register_blueprint(auth)

# Configuración
PORT = int(os.environ.get('PORT', 3000))

print("🌐 CUBALINK23 WEB - PANEL DE ADMINISTRACIÓN")
print("🔧 Puerto: {}".format(PORT))
print("🔒 Panel de administración: ✅ Activado")
print("✈️ Backend Duffel: ✅ Separado (no afectado)")

@app.route('/')
def home():
    """🏠 Página principal del sitio web"""
    return render_template('index.html')

@app.route('/admin')
def admin_dashboard():
    """🔒 Dashboard de administración"""
    return render_template('admin/dashboard.html')

@app.route('/admin/login')
def admin_login():
    """🔐 Login de administración"""
    return render_template('auth/login.html')

@app.route('/api/health')
def health_check():
    """💚 Health check"""
    return jsonify({
        "status": "healthy",
        "message": "Cubalink23 Web - Panel Admin funcionando",
        "timestamp": datetime.now().isoformat(),
        "admin_panel": "✅ Available",
        "backend_duffel": "✅ Separado (no afectado)"
    })

if __name__ == '__main__':
    print("🌐 INICIANDO CUBALINK23 WEB - PANEL ADMIN")
    print("🔒 Panel de administración disponible en: /admin")
    print("🔐 Login admin en: /admin/login")
    print("✈️ Backend Duffel: Separado y protegido")
    
    try:
        app.run(
            host='0.0.0.0',
            port=PORT,
            debug=False,
            threaded=True
        )
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"⚠️ Puerto {PORT} en uso, esperando 2 segundos...")
            time.sleep(2)
            app.run(
                host='0.0.0.0',
                port=PORT,
                debug=False,
                threaded=True
            )
        else:
            raise e
