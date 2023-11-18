import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/migrations/client";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <div className="flex space-x-3 my-2 ">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Link href={`/issues/${issue.id}/edit`}>
            <p className="flex justify-center items-center gap-2">
              <Pencil2Icon /> Edit Issue
            </p>
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
