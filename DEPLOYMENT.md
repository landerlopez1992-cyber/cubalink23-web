# 🚀 Despliegue en Render.com

## Pasos para desplegar Cubalink23 Web en Render.com:

### 1. Crear repositorio en GitHub
```bash
# Crear un nuevo repositorio en GitHub llamado: cubalink23-web
# URL: https://github.com/tu-usuario/cubalink23-web
```

### 2. Conectar con GitHub
```bash
git remote add origin https://github.com/tu-usuario/cubalink23-web.git
git push -u origin main
```

### 3. Desplegar en Render.com

1. **Ir a Render.com** y crear una cuenta
2. **Crear nuevo Web Service**
3. **Conectar con GitHub** y seleccionar el repositorio `cubalink23-web`
4. **Configuración:**
   - **Name:** cubalink23-web
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 4. Variables de Entorno (Opcional)
- `NODE_ENV`: production
- `PORT`: 3000 (automático)

### 5. Dominio Personalizado
Una vez desplegado, configurar:
- **Custom Domain:** www.cubalink23.com
- **SSL:** Automático

## 🎯 URLs de la aplicación:
- **Principal:** https://cubalink23-web.onrender.com
- **Login:** https://cubalink23-web.onrender.com/login
- **Mi Cuenta:** https://cubalink23-web.onrender.com/account

## 📱 Funcionalidades incluidas:
- ✅ Página principal con servicios de la agencia
- ✅ Sistema de login y registro
- ✅ Página "Mi Cuenta" con todas las funciones
- ✅ Formularios de búsqueda de vuelos y hoteles
- ✅ Tienda online con 5 tiendas
- ✅ Diseño responsivo y profesional
- ✅ Integración preparada con backend existente

## 🔧 Tecnologías:
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js + Express
- **Hosting:** Render.com
- **Integración:** APIs del backend existente

---
*Desplegado automáticamente desde GitHub*
