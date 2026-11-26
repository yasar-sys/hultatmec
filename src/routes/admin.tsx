import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Download, LockKeyhole, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminData } from "@/lib/admin.functions";

type AdminData = Extract<Awaited<ReturnType<typeof getAdminData>>, { ok: true }>;

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Submission Review | Hult Prize at MEC" },
      { name: "description", content: "Password-protected review of Hult Prize at MEC registrations and inquiries." },
      { property: "og:title", content: "Submission Review | Hult Prize at MEC" },
      { property: "og:description", content: "Password-protected review of Hult Prize at MEC registrations and inquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function csvCell(value: string) {
  const safe = /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

function downloadCsv(data: AdminData) {
  const rows: string[][] = [
    ["Registrations"],
    ["Team name", "Team leader", "Department", "Semester", "Phone", "Email", "Team members", "Idea", "Submitted"],
    ...data.registrations.map((row) => [row.team_name, row.leader_name, row.department, row.semester, row.phone, row.email, row.team_members, row.idea, row.created_at]),
    [],
    ["Partner inquiries"],
    ["Organization", "Contact name", "Email", "Phone", "Message", "Submitted"],
    ...data.partners.map((row) => [row.organization, row.contact_name, row.email, row.phone ?? "", row.message, row.created_at]),
    [],
    ["Contact messages"],
    ["Name", "Email", "Message", "Submitted"],
    ...data.contacts.map((row) => [row.name, row.email, row.message, row.created_at]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "hult-prize-mec-submissions.csv";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function SubmissionsTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <section className="border-t border-border py-7">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{rows.length}</span>
      </div>
      {rows.length === 0 ? (
        <p className="py-5 text-sm text-muted-foreground">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>{headers.map((header) => <th key={header} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-border align-top">
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="max-w-xs whitespace-pre-wrap break-words px-4 py-3 text-foreground">{cell || "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Dashboard({ data, onLock }: { data: AdminData; onLock: () => void }) {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Private dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Submissions</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => downloadCsv(data)}><Download aria-hidden="true" />Download CSV</Button>
          <Button type="button" variant="ghost" onClick={onLock}><LogOut aria-hidden="true" />Lock</Button>
        </div>
      </div>
      <div className="mt-2">
        <SubmissionsTable
          title="Team registrations"
          headers={["Team", "Leader", "Department", "Semester", "Phone", "Email", "Team members", "Idea", "Submitted"]}
          rows={data.registrations.map((row) => [row.team_name, row.leader_name, row.department, row.semester, row.phone, row.email, row.team_members, row.idea, row.created_at])}
        />
        <SubmissionsTable
          title="Partner inquiries"
          headers={["Organization", "Contact", "Email", "Phone", "Message", "Submitted"]}
          rows={data.partners.map((row) => [row.organization, row.contact_name, row.email, row.phone ?? "", row.message, row.created_at])}
        />
        <SubmissionsTable
          title="Contact messages"
          headers={["Name", "Email", "Message", "Submitted"]}
          rows={data.contacts.map((row) => [row.name, row.email, row.message, row.created_at])}
        />
      </div>
    </>
  );
}

function AdminPage() {
  const loadAdminData = useServerFn(getAdminData);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await loadAdminData({ data: { password } });
      if (!result.ok) {
        setError("That password didn’t match. Try again.");
        return;
      }
      setData(result);
      setPassword("");
    } catch {
      setError("Couldn’t load submissions right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function lock() {
    setData(null);
    setPassword("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="font-display text-sm font-bold text-foreground">Hult Prize <span className="text-primary">at MEC</span></Link>
          <Button asChild variant="outline" size="sm"><Link to="/">Back to website</Link></Button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {data ? (
          <Dashboard data={data} onLock={lock} />
        ) : (
          <div className="mx-auto max-w-md py-10">
            <div className="mb-6 grid size-12 place-items-center rounded-full bg-primary/10 text-primary"><LockKeyhole aria-hidden="true" /></div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Hult Prize at MEC</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Admin access</h1>
            <p className="mt-3 text-muted-foreground">Enter the admin password to review registrations and messages.</p>
            <form onSubmit={unlock} className="mt-6 grid gap-4 rounded-lg border border-border bg-card p-6 shadow-card">
              <div className="grid gap-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required maxLength={200} />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" variant="hero" disabled={busy || !password}>
                {busy ? "Checking…" : "Unlock submissions"}<LockKeyhole aria-hidden="true" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}