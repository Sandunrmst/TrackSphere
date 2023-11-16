import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Card, Box } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <div className="flex space-x-3 my-2 ">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default loading;
