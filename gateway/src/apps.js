import {
  Users,
  FileSignature,
  Wallet,
  Calculator,
  HardHat,
  BriefcaseBusiness,
  Building2,
} from 'lucide-react';

// Orden = el de los proyectos de Coolify (sin el numero). Para conectar una app: estado 'disponible' y su href
// (ver README.md). `bloqueada: true` deja la tarjeta en Disponibles pero sin enlace: la app sigue accesible por URL.
export const APPS = [
  {
    id: 'solicitudes',
    nombre: 'Solicitudes de Contratación',
    area: 'Contratación',
    descripcion: 'Contratación directa e indirecta con flujo de aprobación.',
    icono: FileSignature,
    estado: 'disponible',
    href: '/solicitudes/',
    bloqueada: true, // sigue disponible (la ruta funciona entrando por URL), pero la tarjeta no abre la app
  },
  {
    id: 'cartera',
    nombre: 'Cartera',
    area: 'Finanzas',
    descripcion: 'Seguimiento de cartera, cobros y estados de cuenta.',
    icono: Wallet,
    estado: 'disponible',
    href: '/cartera/',
  },
  {
    id: 'hrsm',
    nombre: 'Recursos Humanos',
    area: 'Gestión humana',
    descripcion: 'Gestión del talento, personal y procesos de RR.HH.',
    icono: Users,
    estado: 'disponible',
    href: '/hrsm/',
  },
  {
    id: 'bases',
    nombre: 'Bases Presupuestales',
    area: 'Finanzas',
    descripcion: 'Construcción y control de bases de presupuesto de obra.',
    icono: Calculator,
    estado: 'disponible',
    href: '/bases/',
    bloqueada: true, // sigue disponible (la ruta funciona entrando por URL), pero la tarjeta no abre la app
  },
  {
    id: 'bitacora',
    nombre: 'Bitácora de Obra',
    area: 'Obra',
    descripcion: 'Registro diario de avances, novedades y eventos en obra.',
    icono: HardHat,
    estado: 'proximamente',
  },
  {
    id: 'comerciales',
    nombre: 'Centro de Aplicaciones Comerciales',
    area: 'Comercial',
    descripcion: 'Herramientas para la gestión comercial y de ventas.',
    icono: BriefcaseBusiness,
    estado: 'proximamente',
  },
  {
    id: 'oliv',
    nombre: 'OLIV',
    area: 'Proyectos',
    descripcion: 'Gestión del proyecto OLIV.',
    icono: Building2,
    estado: 'proximamente',
  },
];
