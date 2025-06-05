import { LoaderProvider } from "../_context/LoaderContext";
import Loader from "./Loader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoaderProvider>
      <Loader />
      {children}
    </LoaderProvider>
  );
}
