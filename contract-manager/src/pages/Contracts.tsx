import { useCallback, useEffect, useState } from "react";
import DocumentsLayout from "../Layout/DocumentsLayout";
import { useAxios } from "../components/Context/AuthContext/SimpleAxiosContextWithAuth";

//import { useSimpleAuth } from "../components/Context/AuthContext/useSimpleAuthHook";
import { PdfDocument } from "../components/PdfDocumentModel";

interface ApiResponse {
  PDF_IDs: string[];
}

function Contracts() {
  //TODO: GET the documents from backend and pass them to the layout in a usable format
  //(get documents list then get all documents details and create a new list)

  const { axiosApi } = useAxios();
  const [pdfDocuments, setPdfDocuments] = useState<PdfDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfIds, setPdfIds] = useState<string[]>();

  const createDocumentList = useCallback(
    async (pdfIdsArray: string[]) => {
      const documentList: PdfDocument[] = [];
      for (let id in pdfIdsArray) {
        await axiosApi
          .get<PdfDocument>(`pdf/${pdfIdsArray[id]}`)
          .then((res) => {
            documentList.push(res.data);
          })
          .catch((error) => console.log(error));
      }
      setPdfDocuments(documentList);
    },
    [axiosApi]
  );

  useEffect(() => {
    setLoading(true);
    axiosApi
      .get<ApiResponse>(`/pdf`)
      .then((res) => {
        setPdfIds(res.data.PDF_IDs);
        createDocumentList(res.data.PDF_IDs);
      })
      .catch((error) => {
        setError("Error fetching PDF documents: " + error.message);
      });
    setLoading(false);
  }, [axiosApi, createDocumentList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <DocumentsLayout
        pdfDocuments={pdfDocuments}
        isLoading={loading}
        // userRole={userData?.role || ""}
      ></DocumentsLayout>
    </>
  );
}

export default Contracts;
