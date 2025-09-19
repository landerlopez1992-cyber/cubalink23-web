#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rutas de pagos para Cubalink23 con integración Square
"""

from flask import Blueprint, request, jsonify
from square_service import square_service
import uuid
from datetime import datetime
import json

payment_bp = Blueprint('payment', __name__, url_prefix='/api/payments')

@payment_bp.route('/process', methods=['POST'])
def process_payment():
    """Procesar pago con Square API - Soporta tanto Payment Links como Nonce"""
    try:
        data = request.get_json()
        
        # Verificar si es un pago con nonce (SDK oficial) o Payment Link (método anterior)
        if 'nonce' in data:
            # NUEVO: Procesar pago con nonce del SDK oficial de Square
            return _process_payment_with_nonce(data)
        else:
            # MÉTODO ANTERIOR: Procesar pago con Payment Links
            return _process_payment_with_links(data)
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

def _process_payment_with_nonce(data):
    """Procesar pago usando nonce del SDK oficial de Square"""
    try:
        # Validar datos requeridos para nonce
        required_fields = ['nonce', 'amount', 'location_id']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Campo requerido faltante: {field}'
                }), 400
        
        # Procesar pago real con Square API usando nonce
        payment_data = {
            'nonce': data['nonce'],
            'amount': float(data['amount']),
            'description': data.get('description', 'Recarga Cubalink23'),
            'location_id': data['location_id']
        }
        
        result = square_service.process_payment_with_nonce(payment_data)
        
        if result['success']:
            return jsonify({
                'success': True,
                'transaction_id': result['transaction_id'],
                'status': result['status'],
                'message': result['message']
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error procesando pago con nonce',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error procesando pago con nonce',
            'details': str(e)
        }), 500

def _process_payment_with_links(data):
    """Procesar pago usando Payment Links (método anterior)"""
    try:
        # Validar datos requeridos para Payment Links
        required_fields = ['amount', 'email']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Campo requerido faltante: {field}'
                }), 400
        
        # Procesar pago real con Square API usando Payment Links
        payment_data = {
            'amount': float(data['amount']),
            'description': f'Recarga Cubalink23 - ${data["amount"]}',
            'email': data['email']
        }
        
        result = square_service.process_real_payment(payment_data)
        
        if result['success']:
            return jsonify({
                'success': True,
                'transaction_id': result['transaction_id'],
                'checkout_url': result['checkout_url'],
                'status': result['status'],
                'message': result['message']
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error creando enlace de pago',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error procesando pago con Payment Links',
            'details': str(e)
        }), 500

@payment_bp.route('/status/<payment_id>', methods=['GET'])
def get_payment_status(payment_id):
    """Obtener estado de un pago"""
    try:
        result = square_service.get_payment_status(payment_id)
        
        if result['success']:
            return jsonify({
                'success': True,
                'payment_id': result['payment_id'],
                'status': result['status'],
                'amount': result['amount'],
                'currency': result['currency'],
                'created_at': result['created_at'],
                'updated_at': result['updated_at']
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error obteniendo estado del pago',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

@payment_bp.route('/refund', methods=['POST'])
def refund_payment():
    """Reembolsar un pago"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        if 'payment_id' not in data:
            return jsonify({
                'success': False,
                'error': 'payment_id es requerido'
            }), 400
        
        payment_id = data['payment_id']
        amount = data.get('amount')  # Opcional, si no se especifica es reembolso completo
        reason = data.get('reason', 'Customer request')
        
        # Procesar reembolso con Square
        result = square_service.refund_payment(payment_id, amount, reason)
        
        if result['success']:
            return jsonify({
                'success': True,
                'refund_id': result['refund_id'],
                'status': result['status'],
                'amount': result['amount'],
                'currency': result['currency'],
                'reason': result['reason'],
                'message': 'Reembolso procesado exitosamente'
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error procesando reembolso',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

@payment_bp.route('/history', methods=['GET'])
def get_payment_history():
    """Obtener historial de pagos"""
    try:
        user_id = request.args.get('user_id')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # Obtener historial de transacciones
        result = square_service.get_transaction_history(start_date, end_date)
        
        if result['success']:
            # Filtrar por usuario si se especifica
            transactions = result['transactions']
            if user_id:
                # En un sistema real, filtrarías por user_id desde la base de datos
                pass
            
            return jsonify({
                'success': True,
                'transactions': transactions,
                'total_count': result['total_count']
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error obteniendo historial',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

@payment_bp.route('/methods', methods=['GET'])
def get_payment_methods():
    """Obtener métodos de pago disponibles"""
    try:
        methods = square_service.get_payment_methods()
        
        return jsonify({
            'success': True,
            'payment_methods': methods
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

@payment_bp.route('/square-status', methods=['GET'])
def get_square_status():
    """Obtener estado de la conexión con Square"""
    try:
        is_available = square_service.is_available()
        
        return jsonify({
            'success': True,
            'square_available': is_available,
            'environment': square_service.environment,
            'location_id': square_service.location_id
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error verificando estado de Square',
            'details': str(e)
        }), 500

@payment_bp.route('/test-connection', methods=['GET'])
def test_square_connection():
    """Probar conexión con Square"""
    try:
        # Probar conexión básica
        result = square_service.get_transaction_history()
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Conexión con Square exitosa',
                'environment': square_service.environment
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error de conexión con Square',
                'details': result.get('error', 'Error desconocido')
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error probando conexión',
            'details': str(e)
        }), 500



