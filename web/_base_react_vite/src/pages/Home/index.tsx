import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { ListHome } from "../../components/Products/ListHome";
import { ListHomeSkeleton } from "../../components/Products/ListHomeSkeleton";

export function Home() {
    return (
        <div className="">
            <ToastContainer />

            <Suspense fallback={<ListHomeSkeleton />}>
                <ListHome />
            </Suspense>
        </div>
    );
}