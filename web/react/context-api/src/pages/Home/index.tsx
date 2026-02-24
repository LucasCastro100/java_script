import { Alunos } from "../../components/Alunos";
import { Footer } from "../../components/Footer";
import { UserProvider } from "../../context/user";

export function Home() {
    return (
        <UserProvider>
            <h1 className="font-5xl text-center">
                Escola Dev

                <br />
                <hr />

                <Alunos />

                <br />
                <hr />

                <Footer />
            </h1>
        </UserProvider>
    );
}