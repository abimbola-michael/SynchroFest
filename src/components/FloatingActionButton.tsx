import { ReactNode } from "react";

export default function FloatingActionButton({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="absolute bottom-6 right-6">{children}</div>;
}
