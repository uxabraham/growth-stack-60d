export default function AdminAccountPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Panel administrativo
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Cuenta</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-base font-semibold">Credenciales de acceso</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          El usuario y la contraseña del panel se configuran con variables de
          entorno en el servidor:
        </p>
        <div className="mt-4 space-y-2 rounded-lg bg-black/40 p-4 font-mono text-xs text-white/70">
          <p>ADMIN_USER=admin</p>
          <p>ADMIN_PASSWORD=growthstack60d</p>
          <p>ADMIN_SESSION_SECRET=una-clave-larga-y-aleatoria</p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/40">
          Colócalas en un archivo <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code>{" "}
          en la raíz del proyecto y reinicia el servidor. Si no defines estas
          variables, se usan valores por defecto — cámbialos antes de publicar
          el sitio en producción.
        </p>
      </div>
    </div>
  );
}
