import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButto = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issueId}`}>
        <p className="flex justify-center items-center gap-2">
          <Pencil2Icon /> Edit Issue
        </p>
      </Link>
    </Button>
  );
};

export default EditIssueButto;
