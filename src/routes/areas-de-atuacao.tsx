import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/areas-de-atuacao")({
  component: () => <Outlet />,
});
