import Link from "next/link";

import { Button } from "@raonc/ui/components/button";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
