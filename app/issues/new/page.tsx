import dynamic from "next/dynamic";
import IssueFormSkeletion from "../_components/IssueFormSkeletion";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeletion />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
