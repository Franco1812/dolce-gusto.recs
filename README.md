# Cápsulas Dolce Gusto - App de Recomendaciones

App para trackear, reseñar y recomendar cápsulas de Dolce Gusto. Hecha con Next.js + Supabase.

## Características

- **Catálogo de cápsulas** con imágenes y descripciones
- **Sistema de usuarios** con login y registro
- **Lista personal** de cápsulas por probar y probadas
- **Reseñas** con calificación de 1-5 estrellas y comentarios
- **Modo Admin** para ver todas las reseñas de todos los usuarios
- **Temas** claro (tonos café) y oscuro (blanco y negro)
- **Responsive** - funciona en móvil y desktop

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Estilos**: Tailwind CSS 4, shadcn/ui
- **Backend**: Supabase (Auth + Database)
- **Deploy**: Vercel

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

Crear un proyecto en [supabase.com](https://supabase.com) y obtener las credenciales.

Crear archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Crear tablas en Supabase

Ejecutar los scripts SQL en orden en el SQL Editor de Supabase:

1. `scripts/001_create_tables.sql` - Tablas base
2. `scripts/004_add_user_id.sql` - Agregar user_id y RLS
3. `scripts/005_new_capsules.sql` - Insertar cápsulas
4. `scripts/006_admin_policies.sql` - Políticas de admin
5. `scripts/007_profiles_table.sql` - Tabla de perfiles

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
├── app/
│   ├── globals.css      # Temas y estilos globales
│   ├── layout.tsx       # Layout con ThemeProvider
│   └── page.tsx         # Página principal con auth
├── components/
│   ├── auth-form.tsx    # Login y registro
│   ├── capsule-card.tsx # Card de cada cápsula
│   ├── dolce-gusto-app.tsx # App principal
│   ├── filter-tabs.tsx  # Tabs de filtrado
│   ├── review-dialog.tsx # Modal de reseñas
│   └── ui/              # Componentes shadcn/ui
├── lib/
│   ├── supabase/client.ts # Cliente Supabase
│   └── types.ts         # Tipos TypeScript
├── public/
│   └── capsules/        # Imágenes de cápsulas
└── scripts/             # Scripts SQL para Supabase
```

---

Hecho con ☕ para Mailu Caminos
