import { site } from "@/lib/site";

export function Credentials() {
  return (
    <ul className="mt-6 space-y-2 border-l-2 border-green-bright/60 pl-4 text-sm leading-relaxed text-muted-foreground">
      {site.credentials.map((c) => (
        <li key={c}>{c}</li>
      ))}
      <li className="text-foreground/70">{site.oabEscritorio}</li>
    </ul>
  );
}
