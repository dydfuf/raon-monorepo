import Link from "next/link";

import { Button } from "@dydfuf/ui/components/button";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
