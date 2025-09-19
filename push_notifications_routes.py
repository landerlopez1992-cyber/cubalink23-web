from flask import Blueprint, request, jsonify
from datetime import datetime
import requests

# Crear blueprint para notificaciones push
push_bp = Blueprint('push_notifications', __name__)

@push_bp.route('/api/push-notifications', methods=['POST'])
def send_push_notification():
    """Enviar notificación push a usuarios"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No se recibieron datos'}), 400
        
        title = data.get('title', '').strip()
        message = data.get('message', '').strip()
        notification_type = data.get('type', 'all')
        is_urgent = data.get('is_urgent', False)
        
        if not title or not message:
            return jsonify({'success': False, 'error': 'Título y mensaje son requeridos'}), 400
        
        # Crear notificación en Supabase
        notification_data = {
            'title': title,
            'message': message,
            'type': notification_type,
            'is_urgent': is_urgent,
            'sent_at': datetime.utcnow().isoformat(),
            'status': 'sent'
        }
        
        # Guardar en Supabase
        try:
            SUPABASE_URL = 'https://zgqrhzuhrwudckwesybg.supabase.co'
            SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncXJoenVocnd1ZGNrd2VzeWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTI3OTgsImV4cCI6MjA3MTM2ODc5OH0.lUVK99zmOYD7bNTxilJZWHTmYPfZF5YeMJDVUaJ-FsQ'
            headers = {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer {}'.format(SUPABASE_KEY),
                'Content-Type': 'application/json'
            }
            
            # Insertar notificación en la tabla notifications
            response = requests.post(
                f'{SUPABASE_URL}/rest/v1/notifications',
                headers=headers,
                json=notification_data
            )
            
            if response.status_code in [200, 201]:
                print(f"✅ Notificación push guardada en Supabase: {title}")
            else:
                print(f"⚠️ Error guardando notificación en Supabase: {response.status_code}")
                
        except Exception as e:
            print(f"⚠️ Error conectando con Supabase: {e}")
        
        # Aquí podrías integrar con servicios de push notifications como Firebase, OneSignal, etc.
        # Por ahora, solo guardamos en la base de datos
        
        return jsonify({
            'success': True,
            'message': 'Notificación push enviada exitosamente',
            'notification': {
                'title': title,
                'message': message,
                'type': notification_type,
                'is_urgent': is_urgent,
                'sent_at': notification_data['sent_at']
            }
        })
        
    except Exception as e:
        print(f"❌ Error enviando notificación push: {e}")
        return jsonify({'success': False, 'error': f'Error interno: {str(e)}'}), 500


@push_bp.route('/api/push-notifications', methods=['GET'])
def get_push_notifications():
    """Obtener historial de notificaciones push"""
    try:
        SUPABASE_URL = 'https://zgqrhzuhrwudckwesybg.supabase.co'
        SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncXJoenVocnd1ZGNrd2VzeWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTI3OTgsImV4cCI6MjA3MTM2ODc5OH0.lUVK99zmOYD7bNTxilJZWHTmYPfZF5YeMJDVUaJ-FsQ'
        headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer {}'.format(SUPABASE_KEY),
            'Content-Type': 'application/json'
        }
        
        # Obtener notificaciones ordenadas por fecha descendente
        response = requests.get(
            f'{SUPABASE_URL}/rest/v1/notifications?order=sent_at.desc&limit=50',
            headers=headers
        )
        
        if response.status_code == 200:
            notifications = response.json()
            return jsonify({
                'success': True,
                'notifications': notifications
            })
        else:
            print(f"⚠️ Error obteniendo notificaciones: {response.status_code}")
            return jsonify({
                'success': True,
                'notifications': []
            })
            
    except Exception as e:
        print(f"❌ Error obteniendo notificaciones: {e}")
        return jsonify({
            'success': True,
            'notifications': []
        })


@push_bp.route('/api/push-notifications/<notification_id>', methods=['DELETE'])
def delete_push_notification(notification_id):
    """Eliminar notificación push"""
    try:
        SUPABASE_URL = 'https://zgqrhzuhrwudckwesybg.supabase.co'
        SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncXJoenVocnd1ZGNrd2VzeWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTI3OTgsImV4cCI6MjA3MTM2ODc5OH0.lUVK99zmOYD7bNTxilJZWHTmYPfZF5YeMJDVUaJ-FsQ'
        headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer {}'.format(SUPABASE_KEY),
            'Content-Type': 'application/json'
        }
        
        # Eliminar notificación
        response = requests.delete(
            f'{SUPABASE_URL}/rest/v1/notifications?id=eq.{notification_id}',
            headers=headers
        )
        
        if response.status_code in [200, 204]:
            return jsonify({
                'success': True,
                'message': 'Notificación eliminada exitosamente'
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error eliminando notificación'
            }), 500
            
    except Exception as e:
        print(f"❌ Error eliminando notificación: {e}")
        return jsonify({'success': False, 'error': f'Error interno: {str(e)}'}), 500


