#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Webhooks de Square para Cubalink23
Maneja notificaciones automáticas de Square sobre cambios en pagos
"""

from flask import Blueprint, request, jsonify
import json
import hmac
import hashlib
import os
from datetime import datetime

webhook_bp = Blueprint('webhook', __name__, url_prefix='/webhooks')

# Clave secreta del webhook (configurar en Square Dashboard)
WEBHOOK_SECRET = os.environ.get('SQUARE_WEBHOOK_SECRET', '')

@webhook_bp.route('/square', methods=['POST'])
def handle_square_webhook():
    """Manejar webhooks de Square"""
    try:
        # Verificar la firma del webhook
        if not verify_webhook_signature(request):
            return jsonify({'error': 'Signature verification failed'}), 401
        
        # Obtener datos del webhook
        webhook_data = request.get_json()
        event_type = webhook_data.get('type')
        
        print(f"🔔 Webhook recibido: {event_type}")
        print(f"📝 Datos: {webhook_data}")
        
        # Procesar según el tipo de evento
        if event_type == 'payment.created':
            return handle_payment_created(webhook_data)
        elif event_type == 'payment.updated':
            return handle_payment_updated(webhook_data)
        elif event_type == 'refund.created':
            return handle_refund_created(webhook_data)
        elif event_type == 'refund.updated':
            return handle_refund_updated(webhook_data)
        else:
            print(f"⚠️ Evento no manejado: {event_type}")
            return jsonify({'status': 'ignored'}), 200
            
    except Exception as e:
        print(f"❌ Error procesando webhook: {e}")
        return jsonify({'error': str(e)}), 500

def verify_webhook_signature(request):
    """Verificar la firma del webhook de Square"""
    if not WEBHOOK_SECRET:
        print("⚠️ SQUARE_WEBHOOK_SECRET no configurado, saltando verificación")
        return True
    
    try:
        # Obtener la firma del header
        signature = request.headers.get('X-Square-Signature')
        if not signature:
            return False
        
        # Construir el payload para verificación
        body = request.get_data()
        url = request.url
        
        # Crear el string a verificar
        string_to_sign = url + body.decode('utf-8')
        
        # Calcular la firma esperada
        expected_signature = hmac.new(
            WEBHOOK_SECRET.encode('utf-8'),
            string_to_sign.encode('utf-8'),
            hashlib.sha256
        ).digest()
        
        # Comparar firmas
        return hmac.compare_digest(signature.encode('utf-8'), expected_signature)
        
    except Exception as e:
        print(f"❌ Error verificando firma: {e}")
        return False

def handle_payment_created(webhook_data):
    """Manejar evento de pago creado"""
    try:
        payment = webhook_data.get('data', {}).get('object', {}).get('payment', {})
        payment_id = payment.get('id')
        amount = payment.get('amount_money', {}).get('amount', 0) / 100
        status = payment.get('status')
        
        print(f"💰 Pago creado: {payment_id} - ${amount} - {status}")
        
        # Aquí podrías actualizar tu base de datos local
        # update_payment_status(payment_id, status, amount)
        
        return jsonify({'status': 'processed'}), 200
        
    except Exception as e:
        print(f"❌ Error procesando payment.created: {e}")
        return jsonify({'error': str(e)}), 500

def handle_payment_updated(webhook_data):
    """Manejar evento de pago actualizado"""
    try:
        payment = webhook_data.get('data', {}).get('object', {}).get('payment', {})
        payment_id = payment.get('id')
        status = payment.get('status')
        
        print(f"🔄 Pago actualizado: {payment_id} - {status}")
        
        # Actualizar estado en base de datos
        # update_payment_status(payment_id, status)
        
        # Si el pago fue completado, procesar lógica de negocio
        if status == 'COMPLETED':
            print(f"✅ Pago completado: {payment_id}")
            # process_completed_payment(payment_id)
        elif status == 'FAILED':
            print(f"❌ Pago falló: {payment_id}")
            # process_failed_payment(payment_id)
        
        return jsonify({'status': 'processed'}), 200
        
    except Exception as e:
        print(f"❌ Error procesando payment.updated: {e}")
        return jsonify({'error': str(e)}), 500

def handle_refund_created(webhook_data):
    """Manejar evento de reembolso creado"""
    try:
        refund = webhook_data.get('data', {}).get('object', {}).get('refund', {})
        refund_id = refund.get('id')
        payment_id = refund.get('payment_id')
        amount = refund.get('amount_money', {}).get('amount', 0) / 100
        
        print(f"💸 Reembolso creado: {refund_id} para pago {payment_id} - ${amount}")
        
        # Actualizar base de datos con información del reembolso
        # create_refund_record(refund_id, payment_id, amount)
        
        return jsonify({'status': 'processed'}), 200
        
    except Exception as e:
        print(f"❌ Error procesando refund.created: {e}")
        return jsonify({'error': str(e)}), 500

def handle_refund_updated(webhook_data):
    """Manejar evento de reembolso actualizado"""
    try:
        refund = webhook_data.get('data', {}).get('object', {}).get('refund', {})
        refund_id = refund.get('id')
        status = refund.get('status')
        
        print(f"🔄 Reembolso actualizado: {refund_id} - {status}")
        
        # Actualizar estado del reembolso
        # update_refund_status(refund_id, status)
        
        return jsonify({'status': 'processed'}), 200
        
    except Exception as e:
        print(f"❌ Error procesando refund.updated: {e}")
        return jsonify({'error': str(e)}), 500

# Funciones helper para base de datos (implementar según tu sistema)
def update_payment_status(payment_id, status, amount=None):
    """Actualizar estado de pago en base de datos"""
    # TODO: Implementar según tu sistema de base de datos
    pass

def process_completed_payment(payment_id):
    """Procesar lógica cuando un pago se completa"""
    # TODO: Implementar lógica de negocio
    # - Actualizar saldo del usuario
    # - Enviar notificación
    # - Generar recibo
    pass

def process_failed_payment(payment_id):
    """Procesar lógica cuando un pago falla"""
    # TODO: Implementar lógica de negocio
    # - Notificar al usuario
    # - Revertir cambios si es necesario
    pass

def create_refund_record(refund_id, payment_id, amount):
    """Crear registro de reembolso en base de datos"""
    # TODO: Implementar según tu sistema
    pass

def update_refund_status(refund_id, status):
    """Actualizar estado de reembolso"""
    # TODO: Implementar según tu sistema
    pass




