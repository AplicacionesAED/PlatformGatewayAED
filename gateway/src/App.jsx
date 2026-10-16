import { useMemo, useState } from 'react';
import { ArrowUpRight, Clock, Lock, Search } from 'lucide-react';
import { APPS } from './apps.js';
import styles from './App.module.css';

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function AppCard({ app }) {
  const Icono = app.icono;
  const disponible = app.estado === 'disponible';
  // Bloqueada: figura como disponible pero la tarjeta no abre la app (se sigue pudiendo entrar por URL).
  const bloqueada = disponible && app.bloqueada;

  const contenido = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.icon}>
          <Icono size={22} strokeWidth={1.8} aria-hidden="true" />
        </span>
        {disponible ? (
          <span className={`${styles.badge} ${styles.badgeLive}`}>
            <span className={styles.dot} aria-hidden="true" /> Disponible
          </span>
        ) : (
          <span className={`${styles.badge} ${styles.badgeSoon}`}>
            <Clock size={12} strokeWidth={2.2} aria-hidden="true" /> Próximamente
          </span>
        )}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.area}>{app.area}</span>
        <h3 className={styles.cardTitle}>{app.nombre}</h3>
        <p className={styles.cardText}>{app.descripcion}</p>
      </div>
      <div className={styles.cardFoot}>
        {bloqueada ? (
          <>
            <span>Acceso bloqueado</span>
            <Lock size={15} strokeWidth={2.2} aria-hidden="true" />
          </>
        ) : disponible ? (
          <>
            <span>Abrir aplicación</span>
            <ArrowUpRight size={16} strokeWidth={2.2} className={styles.arrow} aria-hidden="true" />
          </>
        ) : (
          <span>En preparación</span>
        )}
      </div>
    </>
  );

  if (disponible && !bloqueada) {
    return (
      <a className={`${styles.card} ${styles.cardLive}`} href={app.href}>
        {contenido}
      </a>
    );
  }
  return (
    <div className={`${styles.card} ${styles.cardSoon}`} aria-disabled="true">
      {contenido}
    </div>
  );
}

function Seccion({ titulo, apps }) {
  if (apps.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{titulo}</h2>
        <span className={styles.count}>{apps.length}</span>
      </div>
      <div className={styles.grid}>
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [busqueda, setBusqueda] = useState('');

  const filtradas = useMemo(() => {
    const q = normalizar(busqueda.trim());
    if (!q) return APPS;
    return APPS.filter((a) => normalizar(`${a.nombre} ${a.area} ${a.descripcion}`).includes(q));
  }, [busqueda]);

  const disponibles = filtradas.filter((a) => a.estado === 'disponible');
  const proximamente = filtradas.filter((a) => a.estado !== 'disponible');
  const totalDisponibles = APPS.filter((a) => a.estado === 'disponible').length;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img className={styles.logo} src={`${import.meta.env.BASE_URL}aed-logo.png`} alt="AED" />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.product}>Plataforma</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Aplicaciones de AED</h1>
          <p className={styles.lead}>
            Un único punto de entrada a cada módulo. Las nuevas aplicaciones se irán habilitando aquí a medida que
            estén listas.
          </p>

          <div className={styles.toolbar}>
            <label className={styles.search}>
              <Search size={18} strokeWidth={2} aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar aplicación…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                aria-label="Buscar aplicación"
              />
            </label>
            <div className={styles.stats}>
              <span>
                <strong>{totalDisponibles}</strong> disponible{totalDisponibles === 1 ? '' : 's'}
              </span>
              <span className={styles.statsSep} aria-hidden="true" />
              <span>
                <strong>{APPS.length - totalDisponibles}</strong> próximamente
              </span>
            </div>
          </div>
        </section>

        {filtradas.length === 0 ? (
          <p className={styles.empty}>No hay aplicaciones que coincidan con “{busqueda}”.</p>
        ) : (
          <>
            <Seccion titulo="Disponibles" apps={disponibles} />
            <Seccion titulo="Próximamente" apps={proximamente} />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} AED</span>
        <span>Plataforma AED</span>
      </footer>
    </>
  );
}
