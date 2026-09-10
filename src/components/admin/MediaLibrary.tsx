"use client";

import { useEffect, useRef, useState } from "react";

type MediaAsset = {
  id: string;
  url: string;
  pathname: string;
  altText: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [altDrafts, setAltDrafts] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadAssets() {
    const res = await fetch("/api/admin/media");
    const json = await res.json();
    if (json.ok) {
      setAssets(json.assets);
      setAltDrafts(
        Object.fromEntries(json.assets.map((a: MediaAsset) => [a.id, a.altText]))
      );
    }
  }

  useEffect(() => {
    (async () => {
      await loadAssets();
    })();
  }, []);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      form.append("slot", "library");
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error ?? "Error al subir un archivo.");
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await loadAssets();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este archivo? Esta acción no se puede deshacer.")) return;
    setAssets((prev) => prev?.filter((a) => a.id !== id) ?? null);
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
  }

  async function handleAltSave(id: string) {
    const altText = altDrafts[id] ?? "";
    await fetch("/api/admin/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, altText }),
    });
    setAssets(
      (prev) => prev?.map((a) => (a.id === id ? { ...a, altText } : a)) ?? null
    );
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-white">Media Library</h1>
        <p className="text-sm text-white/50">
          Sube imágenes y videos para usar en cualquier parte del sitio. Copia la
          URL pública y pégala en el campo correspondiente de Contenido.
        </p>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
        className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-10 text-center"
      >
        <p className="text-sm text-white/60">
          Arrastra archivos aquí, o
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-full bg-empirika-orange px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? "Subiendo…" : "Elegir archivos"}
        </button>
        <p className="text-xs text-white/30">PNG, JPG, SVG, WebP, MP4, WebM — máx. 20MB</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/svg+xml,image/webp,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}

      <div className="mt-8">
        {assets === null ? (
          <p className="text-sm text-white/40">Cargando…</p>
        ) : assets.length === 0 ? (
          <p className="text-sm text-white/40">Todavía no subiste ningún archivo.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                <div className="flex aspect-video items-center justify-center bg-black/40">
                  {asset.mimeType.startsWith("video/") ? (
                    <video src={asset.url} className="h-full w-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset.url}
                      alt={asset.altText}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <p className="truncate text-xs text-white/40">{asset.pathname}</p>
                  <p className="text-[11px] text-white/30">
                    {asset.mimeType} · {formatSize(asset.size)}
                  </p>
                  <input
                    type="text"
                    placeholder="Texto alternativo (SEO)"
                    value={altDrafts[asset.id] ?? ""}
                    onChange={(e) =>
                      setAltDrafts((prev) => ({ ...prev, [asset.id]: e.target.value }))
                    }
                    onBlur={() => handleAltSave(asset.id)}
                    className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-white placeholder:text-white/25 focus:border-empirika-orange focus:outline-none"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => copyUrl(asset.url)}
                      className="flex-1 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/5"
                    >
                      Copiar URL
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id)}
                      className="rounded-md border border-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
