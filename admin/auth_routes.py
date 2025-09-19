# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
import hashlib
import os

auth = Blueprint('auth', __name__, url_prefix='/auth')

# Credenciales del administrador (en producción usar variables de entorno)
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'landerlopez1992@gmail.com')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'Maquina.2055')

def hash_password(password):
    """Hashear contraseña"""
    return hashlib.sha256(password.encode()).hexdigest()

@auth.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            session['username'] = username
            return redirect(url_for('admin.dashboard'))
        else:
            return render_template('auth/login.html', error='Credenciales incorrectas')
    
    return render_template('auth/login.html')

@auth.route('/logout')
def logout():
    """Cerrar sesión"""
    session.clear()
    return redirect(url_for('auth.login'))

def require_auth(f):
    """Decorador para requerir autenticación"""
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function
